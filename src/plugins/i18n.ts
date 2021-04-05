import { Plugin } from '@nuxt/types'

const myPlugin: Plugin = ({ app, $config: { nuxtLocale } }) => {
    app.i18n.setLocale(nuxtLocale)
}

export default myPlugin
