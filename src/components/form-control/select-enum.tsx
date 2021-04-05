import { Enum } from '@judahdonkor/chassis-client-es'
import * as tsx from 'vue-tsx-support'
import v from 'voca'
import { Mixin } from './mixin'
import { ValidationProvider } from 'vee-validate'
import { ValidationContext } from 'vee-validate/dist/types/components/common'
import { omit } from 'ramda'
import { Type } from '../bulma/types'

interface EventsWithOn {
  onInput: (val: string) => void
}

const SelectEnum = tsx
  .componentFactoryOf<EventsWithOn>()
  .mixin(Mixin)
  .create({
    inheritAttrs: false,
    components: { ValidationProvider },
    props: {
      value: {
        type: String,
      },
      placeholder: {
        type: String
      },
      rules: {
        type: [String, Object],
        default: '' as string | { [key in string]: boolean },
      },
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      vid: {
        type: String,
      },
      successType: {
        type: String as () => Type,
        default: '' as Type,
      },
      message: [String, Array]
    },
    data() {
      return {
        loading: false,
        enums: [] as Enum[],
      }
    },
    watch: {
      mdl: {
        async handler(val) {
          try {
            this.loading = true
            this.enums = await this.$chassis.enum(val)
          } catch (error) { }
          this.loading = false
        },
        immediate: true,
      },
    },
    render() {
      return (
        <validation-provider
          vid={this.vid}
          rules={this.rules}
          name={this.name || this.label}
          class="control"
          scopedSlots={{
            default: ({ errors, valid }: ValidationContext) => (
              <b-field
                label={this.label}
                type={(() => {
                  if (errors[0]) return 'is-danger'
                  if (valid) return this.successType
                })()}
                message={errors.length === 0
                  ? this.message
                  : errors}
                {...{
                  props: omit(['type'], this.$attrs),
                }}
              >
                {this.$slots.start}
                <b-select
                  placeholder={this.placeholder}
                  value={this.value}
                  onInput={(val: string) => this.$emit('input', val)}
                  loading={this.loading}
                  expanded={this.expanded}
                  icon={this.icon}
                  icon-pack={this.iconPack}
                  {...{
                    props: this.$attrs,
                    attrs: this.$attrs,
                    style: this.$el?.getAttribute('style'),
                  }}
                >
                  {this.enums.map((enm) => (
                    <option value={enm.name}>
                      {enm.display || v.titleCase(enm.name)}
                    </option>
                  ))}
                </b-select>
                {this.$slots.end}
              </b-field>
            ),
          }}
        />
      )
    },
  })

export { SelectEnum }
