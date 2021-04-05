import * as tsx from 'vue-tsx-support'

interface EventsWithOn {
  onInput: (val: string) => void
}

const SuggestedTagInput = tsx.componentFactoryOf<EventsWithOn>().create({
  props: {
    value: {
      type: Array as () => string[],
      default: () => [],
    },
    options: {
      required: true,
      type: Array as () => string[],
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
  methods: {
    suggestions(input: string): string[] {
      return input
        ? this.options.filter((opt) => {
          return opt.toString().toLowerCase().includes(input.toLowerCase())
        })
        : this.options
    },
  },
  render() {
    return (
      <b-taginput
        open-on-focus
        keep-first
        clearable
        allow-new
        value={this.value}
        onInput={(val: string[]) => this.$emit('input', val)}
        data={this.options}
        autocomplete
        icon={this.icon}
        icon-pack={this.iconPack}
        expanded={this.expanded}
        onTyping={(val: string) => this.suggestions(val)}
      >
        <template slot="empty">No results found</template>
      </b-taginput>
    )
  },
})

export { SuggestedTagInput }
