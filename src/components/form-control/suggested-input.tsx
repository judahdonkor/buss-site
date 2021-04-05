import * as tsx from 'vue-tsx-support'

type Option = Record<'display' | 'value', string>

interface EventsWithOn {
  onInput: (val: string) => void
}

const SuggestedInput = tsx.componentFactoryOf<EventsWithOn>().create({
  props: {
    value: {
      type: String,
    },
    options: {
      required: true,
      type: Array as () => Option[],
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
  },
  computed: {
    suggestions(): Option[] {
      return this.value
        ? this.options.filter(({ display }) => {
          return display
            .toString()
            .toLowerCase()
            .includes(this.value.toLowerCase())
        })
        : this.options
    },
  },
  render() {
    return (
      <b-autocomplete
        open-on-focus
        keep-first
        clearable
        value={
          this.options.find((o) => o.value === this.value)?.display ||
          this.value
        }
        onInput={(val: string) =>
          this.$emit(
            'input',
            this.options.find((o) => o.display === val)?.value || val
          )
        }
        data={this.suggestions}
        icon={this.icon}
        field="display"
        icon-pack={this.iconPack}
        expanded={this.expanded}
        onSelect={(val: Option) => this.$emit('input', val.value)}
        append-to-body
      >
        <template slot="empty">No results found</template>
      </b-autocomplete>
    )
  },
})

export { SuggestedInput, Option }
