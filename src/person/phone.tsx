import { Input } from '@/components/form-control'
import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil,
} from 'google-libphonenumber'
import * as tsx from 'vue-tsx-support'
import { MediaObject } from '~/components'

interface EventsWithOn {
  onInput(val: string): void
}
const phoneUtil = PhoneNumberUtil.getInstance()

type Country = Record<'name' | 'code' | 'flag', string>

const Phone = tsx.componentFactoryOf<EventsWithOn>().create({
  props: {
    value: {
      type: String,
    },
    defaultCountry: {
      type: String,
      default: 'GH',
    },
    required: {
      type: Boolean,
    },
  },
  data() {
    return {
      idx: -1,
      keyword: '',
    }
  },
  async created() {
    try {
      if (this.value) {
        const phone = phoneUtil.parse(this.value)
        const code = phoneUtil.getRegionCodeForNumber(phone)
        if (code)
          this.setCountry(
            this.$accessor.countries.findIndex(
              (e) => e.code.toUpperCase() === code.toUpperCase()
            )
          )
      } else {
        const idx = this.$accessor.countries.findIndex(
          (e) => e.code.toUpperCase() === this.defaultCountry.toUpperCase()
        )
        if (idx !== -1) this.setCountry(idx)
      }
    } catch (error) {

    }
  },
  methods: {
    async setCountry(idx: number) {
      await import(
        'cleave.js/dist/addons/cleave-phone.' +
        String(this.$accessor.countries[idx]?.code).toLowerCase()
      )
      this.idx = idx
    },
  },
  render() {
    return (
      <Input
        rules={this.required ? 'required' : ''}

        cleaveOptions={
          this.$accessor.countries[this.idx]
            ? {
              phone: true,
              phoneRegionCode: this.$accessor.countries[this.idx].code,
            }
            : {}
        }
        value={this.value}
        onInput={(val: string) => {
          if (val) {
            try {
              const phone = phoneUtil.parse(
                val,
                this.$accessor.countries[this.idx].code
              )
              if (phoneUtil.isValidNumber(phone)) {
                this.$emit('input', phoneUtil.format(phone, PNF.E164))
              }
            } catch { }
          }
        }}
      >
        <b-select
          slot="start"
          value={this.$accessor.countries[this.idx]?.code}
          onInput={(val: string) => this.setCountry(this.$accessor.countries.findIndex((e) => e.code === val))}>
          {this.$accessor.countries.map(({ code }) => (
            <option value={code}>
              {code}
            </option>
          ))}
        </b-select>
        {/* <b-autocomplete
          slot="start"
          value={this.keyword || this.$accessor.countries[this.idx]?.name}
          onInput={(val: string) => (this.keyword = val)}
          data={
            this.$accessor.countries
            // .filter(val => val.name?.toLowerCase().indexOf(this.keyword?.toLowerCase()) >= 0)
          }
          placeholder="Country"
          icon="globe"
          onSelect={(val: Country) =>
            this.setCountry(
              this.$accessor.countries.findIndex((e) => e.code === val.code)
            )
          }
          open-on-focus
          scopedSlots={{
            default: ({ option }: any) => (
              <MediaObject>
                <img slot="left" width="32" src={option.flag} />
                {option.name}
              </MediaObject>
            ),
          }}
        >
          <p slot="empty">No results found</p>
        </b-autocomplete> */}
      </Input>
    )
  },
})

export { Phone, Country }
