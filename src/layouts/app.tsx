import * as tsx from 'vue-tsx-support'
import { Footer, Navbar } from '~/components'
import { Error503, comingSoon } from '~/components/error'

export type App = Record<'label'
  | 'class'
  | 'description'
  | 'slogan'
  | 'thumbnail'
  | 'id', string> & {
    links: { [key in string]: string }
  }

const AppNavBar = tsx.component({
  props: {
    app: {
      type: Object as () => App,
      required: true
    }
  },
  render() {
    return (
      <div>
        <div
          class='tw-container tw-py-4 tw-flex tw-justify-between'>
          <p class='tw-font-bold'>
            {this.app.label}
          </p>
          {/* <div
            class='tw-flex tw-gap-2'>
            {[(['Overview', ''] as [string, string]), ...Object.entries(this.app.links)].map(e => (
              <nuxt-link
                to={`/apps/${this.app.id}/${e[1]}`}>
                {e[0]}
              </nuxt-link>
            ))}
          </div> */}
        </div>
      </div>
    )
  }
})

const Hero = tsx.component({
  props: {
    app: {
      type: Object as () => App,
      required: true
    }
  },
  render() {
    return (
      <div
        class='tw-bg-light-elevatedSurface'>
        <section
          class='tw-container tw-py-12 tw-flex tw-flex-col tw-justify-between md:tw-flex-row-reverse tw-items-center'>
          <div class=' tw-flex-1'>
            <img
              src={this.app.thumbnail}
              alt=""
              class='p-6' />
          </div>
          <div class='tw-text-center md:tw-text-left tw-flex-1'>
            <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black'>
              {this.app.label}
            </h1>
            <h2 class='tw-text-light-onSurfaceSecondary tw-text-xl'>
              {this.app.description}
            </h2>
            <b-button
              class='tw-mt-4 tw-w-full tw-px-12 sm:tw-w-auto'
              type='is-primary'
              onClick={async () => {
                alert('CTA')
              }}>
              {this.$t('cta')}
            </b-button>
          </div>
        </section>
      </div>
    )
  }
})

export default tsx.component({
  components: {
    Error503
  },
  computed: {
    app(): App {
      const id = this.$route.path.split('/')[2]
      return Object.assign({
        id
      }, this.$t(`apps.${id}`)) as any
    }
  },
  render() {
    return (
      <div class='tw-flex tw-flex-col min-tw-h-screen'>
        <Navbar />
        <AppNavBar
          app={this.app} />
        <Hero
          app={this.app} />
        <main class="tw-flex-1">
          <error-503
            error={comingSoon(this.$route.fullPath)} />
          <nuxt />
        </main>
        <Footer />
      </div>
    )
  },
})
