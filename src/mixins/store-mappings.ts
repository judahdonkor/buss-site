import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import * as tsx from 'vue-tsx-support'
import { mapState, mapGetters } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    cl: Entity | null
    bussDisc: Entity
    discs: Entity[]
    disc: Entity
  }
}

const StoreMappings = tsx.component({
  computed: {
    ...mapState(['cl', 'bussDisc', 'discs']),
    ...mapGetters(['disc']),
  },
})

export { StoreMappings }
