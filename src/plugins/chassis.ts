import { Plugin } from '@nuxt/types'
import { Chassis } from '@judahdonkor/chassis-client-es'
import { EventHub } from '~/toolkit'

declare module 'vue/types/vue' {
  interface Vue {
    $chassis: Chassis
    $eventhub: EventHub
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $chassis: Chassis
    $eventhub: EventHub
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $chassis: Chassis
    $eventhub: EventHub
  }
}

const myPlugin: Plugin = (ctx, inject) => {
  inject('chassis', new Chassis(ctx.$axios))
  inject('eventhub', new EventHub())
}

export default myPlugin
