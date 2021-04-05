import { omit } from 'ramda'
import { ValidationProvider } from 'vee-validate'
import { ValidationContext } from 'vee-validate/dist/types/components/common'
import * as tsx from 'vue-tsx-support'
import { Type } from '../bulma/types'

interface EventsWithOn {

}

const ValidatedField = tsx.componentFactoryOf<EventsWithOn>().create({
  inheritAttrs: false,
  components: { ValidationProvider },
  props: {
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
              {this.$slots.default}
              {this.$slots.end}
            </b-field>
          ),
        }}
      />
    )
  },
})

export { ValidatedField }
