import * as tsx from 'vue-tsx-support'
import { AppCard } from '~/components'

export default tsx.component({
  data() {
    return {
      idx: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.setNextImageIndex()
    }, 5000)
  },
  methods: {
    setNextImageIndex() {
      this.idx = Math.floor(Math.random() * (this.$t('pages.index.hero.images') as unknown as string[]).length)
      setTimeout(() => {
        this.setNextImageIndex()
      }, 10000)
    }
  },
  render() {
    return (
      <div>
        {/* hero */}
        <div
          class='bg-cover bg-right transition-all duration-1000 ease-in-out'
          style={{
            'background-image': `url(${(this.$t('pages.index.hero.images') as unknown as string[])[this.idx]})`
          }}>
          <section class='container pb-10 pt-40 lg:py-40'>
            <h1 class='text-dark-onSurfacePrimary text-3xl font-black sm:text-5xl sm:w-9/12 lg:w-7/12  font-display'>
              {this.$t('pages.index.hero.slogan')}
            </h1>
            <h2
              class='text-dark-onSurfacePrimary mt-3 w-11/12 sm:text-xl  sm:w-9/12 lg:w-7/12 lg:text-2xl'
              domPropsInnerHTML={this.$t('pages.index.hero.description') as any} />
            <b-button
              class='mt-5'
              size='is-medium'
              type='is-primary'
              tag="nuxt-link"
              to='/sign-up'>
              {this.$t('cta')}
            </b-button>
          </section>
        </div>
        {/* start */}
        <div class=''>
          <section class='container py-16'>
            <h1 class='text-light-onSurfacePrimary text-3xl font-black sm:text-5xl '>
              {this.$t('pages.index.start.slogan')}
            </h1>
            <h2 class='text-light-onSurfaceSecondary mt-3 text-base  sm:text-xl lg:text-2xl'>
              {this.$t('pages.index.start.description')}
            </h2>
            <div class='py-8 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
              {Object.entries(this.$t('pages.index.start.selectedApps')).map(([key, { label, description, thumbnail }], idx) => (
                <nuxt-link to={`/apps/${key}`}>
                  <AppCard
                    class={`${idx === Object.entries(this.$t('pages.index.start.selectedApps')).length - 1
                      ? 'hidden sm:flex xl:hidden'
                      : ''} bg-light-elevatedSurface p-6 rounded-md shadow-xl hover:shadow-2xl transition duration-150 ease-in-out`}
                    label={label}
                    description={description}
                    thumbnail={thumbnail} />
                </nuxt-link>
              ))}
            </div>
            <div class='flex justify-center'>
              <b-button
                to='/apps'
                type='is-primary'
                tag="nuxt-link"
                class='w-auto sm:text-xl lg:text-2xl px-10'>
                {this.$t('pages.index.start.moreApps')}
              </b-button>
            </div>
          </section>
        </div>
        {/* user cases */}
        <div class='bg-light-elevatedSurface'>
          <section class='container flex flex-col gap-6 py-16 items-center md:flex-row-reverse'>
            <div class='flex-1'>
              <img
                src="/vid.png"
                alt=""
                class='border-8 border-white w-full' />
            </div>
            <div class='flex-1'>
              <h1 class='text-light-onSurfacePrimary text-3xl font-black sm:text-5xl '>
                {this.$t('pages.index.useCases.slogan')}
              </h1>
              <h2 class='text-light-onSurfaceSecondary mt-3  sm:text-xl lg:text-2xl'>
                {this.$t('pages.index.useCases.description')}
              </h2>
              <b-button
                class='w-auto sm:text-xl lg:text-2xl px-10 mt-8'
                type='is-primary'
                onClick={async () => {
                  alert('CTA')
                }}>
                {this.$t('pages.index.useCases.useCases')}
              </b-button>
            </div>
          </section>
        </div>
        {/* integrate */}
        <div class='bg-light-elevatedSurface py-8'>
          <section class='container pt-16 bg-light-surface text-center'>
            <h1 class='text-light-onSurfacePrimary text-3xl font-black sm:text-5xl  font-script'>
              {this.$t('pages.index.integrate.slogan')}
            </h1>
            <h2
              class='text-light-onSurfaceSecondary mt-3 sm:text-xl lg:text-2xl'
              domPropsInnerHTML={this.$t('pages.index.integrate.description') as any} />
          </section>
          <section class='container bg-light-surface text-center px-0'>
            <div class='flex py-12 gap-8 overflow-hidden justify-center'>
              {(this.$t('pages.index.integrate.featuredApps') as unknown as string[]).map(app => (
                <div
                  class='bg-light-elevatedSurface shadow-xl p-0 w-auto rounded-xl flex-shrink-0'>
                  <img
                    class='w-32 h-32'
                    src={app} />
                </div>
              ))}
            </div>
          </section>
          <section class='container pb-16 bg-light-surface text-center'>
            <b-button
              class='w-auto sm:text-xl lg:text-2xl px-10'
              type='is-primary'
              onClick={async () => {
                alert('CTA')
              }}>
              {this.$t('pages.index.integrate.exploreIntegration')}
            </b-button>
          </section>
        </div>
      </div>
    )
  }
})
