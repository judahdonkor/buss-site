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
          class='container py-4 flex justify-between'>
          <p class='font-bold'>
            {this.app.label}
          </p>
          {/* <div
            class='flex gap-2'>
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
        class='bg-light-elevatedSurface'>
        <section
          class='container py-12 flex flex-col justify-between md:flex-row-reverse items-center'>
          <div class=' flex-1'>
            <img
              src={this.app.thumbnail}
              alt=""
              class='p-6' />
          </div>
          <div class='text-center md:text-left flex-1'>
            <h1 class='text-light-onSurfacePrimary text-4xl font-black'>
              {this.app.label}
            </h1>
            <h2 class='text-light-onSurfaceSecondary text-xl'>
              {this.app.description}
            </h2>
            <b-button
              class='mt-4 w-full px-12 sm:w-auto'
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
      <div class='flex flex-col min-h-screen'>
        <Navbar />
        <AppNavBar
          app={this.app} />
        <Hero
          app={this.app} />
        <main class="flex-1">
          <error-503
            error={comingSoon(this.$route.fullPath)} />
          <nuxt />
        </main>
        <Footer />
      </div>
    )
  },
})
