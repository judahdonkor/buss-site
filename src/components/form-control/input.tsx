import Cleave from 'cleave.js'
import { CleaveOptions } from 'cleave.js/options'
import { equals, omit } from 'ramda'
import { ValidationProvider } from 'vee-validate'
import { ValidationContext } from 'vee-validate/dist/types/components/common'
import * as tsx from 'vue-tsx-support'
import { Type } from '../bulma/types'

interface EventsWithOn {
  onInput(val: string | number): void
  onFocus(): void
}

const Input = tsx.componentFactoryOf<EventsWithOn>().create({
  inheritAttrs: false,
  components: { ValidationProvider },
  props: {
    value: {
      type: [String, Number],
      default: '',
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
    cleaveOptions: {
      type: Object as () => CleaveOptions,
      default: () => ({} as CleaveOptions),
    },
    successType: {
      type: String as () => Type,
      default: '' as Type,
    },
    message: [String, Array],
    inputClass: String
  },
  data() {
    return {
      cleave: null as Cleave | null,
    }
  },
  mounted() {
    this.$watch('cleaveOptions', (newVal, oldVal) => {
      if (equals(newVal, oldVal)) return
      this.cleave?.destroy()
      if (Object.keys(newVal).length === 0) {
        this.cleave = null
      } else
        try {
          this.cleave = new Cleave(
            (this.$refs.inputControl as Vue).$refs.input as HTMLElement,
            newVal
          )
        } catch (error) {
          // console.log(error)
        }
    }, {
      immediate: true
    })
    this.$watch('value', (val) => {
      this.cleave?.setRawValue(val)
    }, { immediate: true })
  },
  render() {
    return (
      <validation-provider
        vid={this.vid}
        rules={this.rules}
        name={this.name || this.label}
        slim
        scopedSlots={{
          default: ({ errors, valid }: ValidationContext) => (
            <b-field
              class={`${this.cleaveOptions?.numeral
                ? 'numeral'
                : this.$attrs.type === 'textarea'
                  ? 'textarea'
                  : 'text'}`}
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
              <b-input
                ref="inputControl"
                custom-class={`${this.cleaveOptions?.numeral
                  ? 'numeral'
                  : ''} ${this.inputClass || ''}`}
                value={this.cleave?.getFormattedValue() || this.value}
                onInput={(val: string) => {
                  this.$emit('input', this.cleave
                    ? this.cleaveOptions.numeral
                      ? Number(this.cleave.getRawValue())
                      : this.cleave.getRawValue()
                    : val)
                }}
                onFocus={() => this.$emit('focus')}
                {...{
                  props: this.$attrs,
                  attrs: this.$attrs,
                  style: this.$el?.getAttribute('style'),
                }}
              />
              {this.$slots.end}
            </b-field>
          ),
        }}
      />
    )
  },
})

export { Input }
