import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import * as tsx from 'vue-tsx-support'
import { ValidationProvider } from 'vee-validate'
import { ValidationContext } from 'vee-validate/dist/types/components/common'
import { omit } from 'ramda'
import { Type } from '../bulma/types'

interface EventsWithOn {
  onInput: (val: Entity) => void
}

const SelectFromEntities = tsx.componentFactoryOf<EventsWithOn>().create({
  inheritAttrs: false,
  components: { ValidationProvider },
  props: {
    value: {
      type: Object as () => Entity,
    },
    entities: {
      required: true,
      type: Array as () => Entity[],
    },
    expanded: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
    iconPack: {
      type: String,
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
                value={this.entities.findIndex((val) => val.id === this.value?.id)}
                onInput={(val: number) => this.$emit('input', this.entities[val])}
                expanded={this.expanded}
                icon={this.icon}
                icon-pack={this.iconPack}
                {...{
                  props: this.$attrs,
                  attrs: this.$attrs,
                  style: this.$el?.getAttribute('style'),
                }}
              >
                {this.entities.map((e, idx) => (
                  <option value={idx}>{e.display}</option>
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

export { SelectFromEntities }
