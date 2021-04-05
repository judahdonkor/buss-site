import { NuxtError } from '@nuxt/types'
import Error503 from './503.vue'
const comingSoon = (path?: string) => ({
    path,
    statusCode: 503,
    message: 'Coming Soon'
} as NuxtError)

export { comingSoon, Error503 }
export * from './404'