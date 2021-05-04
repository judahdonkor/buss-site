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
          class='tw-bg-cover tw-bg-right tw-transition-all tw-duration-1000 tw-ease-in-out'
          style={{
            'background-image': `url(${(this.$t('pages.index.hero.images') as unknown as string[])[this.idx]})`
          }}>
          <section class='tw-container tw-pb-10 tw-pt-40 lg:tw-py-40'>
            <h1 class='tw-text-dark-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl sm:tw-w-9/12 lg:tw-w-7/12  tw-font-display'>
              {this.$t('pages.index.hero.slogan')}
            </h1>
            <h2
              class='tw-text-dark-onSurfacePrimary tw-mt-3 tw-w-11/12 sm:tw-text-xl  sm:tw-w-9/12 lg:tw-w-7/12 lg:tw-text-2xl'
              domPropsInnerHTML={this.$t('pages.index.hero.description') as any} />
            <b-button
              class='tw-mt-5'
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
          <section class='tw-container tw-py-16'>
            <h1 class='tw-text-light-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl '>
              {this.$t('pages.index.start.slogan')}
            </h1>
            <h2 class='tw-text-light-onSurfaceSecondary tw-mt-3 tw-text-base  sm:tw-text-xl lg:tw-text-2xl'>
              {this.$t('pages.index.start.description')}
            </h2>
            <div class='tw-py-8 tw-grid tw-gap-4 tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-3'>
              {Object.entries(this.$t('pages.index.start.selectedApps')).map(([key, { label, description, thumbnail }], idx) => (
                <nuxt-link to={`/apps/${key}`}>
                  <AppCard
                    class={`${idx === Object.entries(this.$t('pages.index.start.selectedApps')).length - 1
                      ? 'tw-hidden sm:tw-flex xl:tw-hidden'
                      : ''} tw-bg-light-elevatedSurface tw-p-6 tw-rounded-md tw-tw-shadow-xl hover:tw-tw-shadow-2xl tw-transition tw-duration-150 tw-ease-in-out`}
                    label={label}
                    description={description}
                    thumbnail={thumbnail} />
                </nuxt-link>
              ))}
            </div>
            <div class='tw-flex tw-justify-center'>
              <b-button
                to='/apps'
                type='is-primary'
                tag="nuxt-link"
                class='tw-w-auto sm:tw-text-xl lg:tw-text-2xl tw-px-10'>
                {this.$t('pages.index.start.moreApps')}
              </b-button>
            </div>
          </section>
        </div>
        {/* user cases */}
        <div class='tw-bg-light-elevatedSurface'>
          <section class='tw-container tw-flex tw-flex-col tw-gap-6 tw-py-16 tw-items-center md:tw-flex-row-reverse'>
            <div class='tw-flex-1'>
              <img
                src="/images/undraw_apps_m7mh.svg"
                alt=""
                class='tw-border-8 tw-border-white tw-w-full' />
            </div>
            <div class='tw-flex-1'>
              <h1 class='tw-text-light-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl '>
                {this.$t('pages.index.useCases.slogan')}
              </h1>
              <h2 class='tw-text-light-onSurfaceSecondary tw-mt-3  sm:tw-text-xl lg:tw-text-2xl'>
                {this.$t('pages.index.useCases.description')}
              </h2>
              <b-button
                class='tw-w-auto sm:tw-text-xl lg:tw-text-2xl tw-px-10 tw-mt-8'
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
        {/* <div class='tw-bg-light-elevatedSurface tw-py-8'>
          <section class='tw-container tw-pt-16 tw-bg-light-surface tw-text-center'>
            <h1 class='tw-text-light-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl  tw-font-script'>
              {this.$t('pages.index.integrate.slogan')}
            </h1>
            <h2
              class='tw-text-light-onSurfaceSecondary tw-mt-3 sm:tw-text-xl lg:tw-text-2xl'
              domPropsInnerHTML={this.$t('pages.index.integrate.description') as any} />
          </section>
          <section class='tw-container tw-bg-light-surface tw-text-center tw-px-0'>
            <div class='tw-flex tw-py-12 tw-gap-8 tw-overflow-tw-hidden tw-justify-center'>
              {(this.$t('pages.index.integrate.featuredApps') as unknown as string[]).map(app => (
                <div
                  class='tw-bg-light-elevatedSurface tw-tw-shadow-xl tw-p-0 tw-w-auto tw-rounded-xl tw-flex-shrink-0'>
                  <img
                    class='tw-w-32 tw-h-32'
                    src={app} />
                </div>
              ))}
            </div>
          </section>
          <section class='tw-container tw-pb-16 tw-bg-light-surface tw-text-center'>
            <b-button
              class='tw-w-auto sm:tw-text-xl lg:tw-text-2xl tw-px-10'
              type='is-primary'
              onClick={async () => {
                alert('CTA')
              }}>
              {this.$t('pages.index.integrate.exploreIntegration')}
            </b-button>
          </section>
        </div> */}
      </div>
    )
  }
})
