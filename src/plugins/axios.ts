import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = ({ $axios, app }) => {
  $axios.onRequest((cfg) => {
    const tk = app.$cookies.get('tk')
    if (tk) cfg.headers.common.Authorization = `Bearer ${tk}`
  })
}

export default myPlugin
