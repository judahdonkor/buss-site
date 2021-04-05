import { Middleware } from '@nuxt/types'

const middleware: Middleware = async ({ app, route, redirect }) => {
  if (app.$accessor.person === null) {
    redirect('/sign-in', {
      'return-path': route.fullPath,
    })
    return
  }
}

export default middleware
