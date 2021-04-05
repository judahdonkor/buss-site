import * as tsx from 'vue-tsx-support'

const Mixin = tsx.component({
  props: {
    mdl: {
      type: String,
      required: true,
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
})

export { Mixin }
