import { groupBy } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { AppCard } from '~/components'

const Hero = tsx.component({
  render() {
    return (
      <div class='tw-bg-light-elevatedSurface'>
        <section class='tw-container tw-flex tw-flex-col tw-gap-10 tw-py-10 tw-items-center lg:tw-flex-row'>
          <div class='tw-flex-1'>
            <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black tw-text-center sm:tw-text-5xl sm:tw-text-left'>
              {this.$t('pages.apps.hero.slogan')}
            </h1>
            <h2 class='tw-text-light-onSurfaceSecondary tw-my-5 tw-text-xl tw-text-center sm:tw-text-left sm:tw-text-2xl'>
              {this.$t('pages.apps.hero.description')}
            </h2>
          </div>
          <div class='tw-flex-1'>
            <img
              src="/vid.png"
              alt=""
              class='tw-border-8 tw-border-white tw-w-full' />
          </div>
        </section>
      </div>
    )
  }
})

export default tsx.component({
  render() {
    return (
      <div>
        <Hero />
        {Object.entries(groupBy(e => e[1].class, Object.entries(this.$t('apps')))).map((cls, idx) => (
          <div class={`${idx % 2 === 1 ? 'tw-bg-light-elevatedSurface' : ''}`}>
            <section class='tw-container tw-py-10'>
              <div class='tw-flex-1'>
                <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black tw-text-center sm:tw-text-5xl sm:tw-text-left'>
                  {this.$t(`app_classes.${cls[0]}.label`)}
                </h1>
                <h2 class='tw-text-light-onSurfaceSecondary tw-my-5 tw-text-xl tw-text-center sm:tw-text-left sm:tw-text-2xl'>
                  {this.$t(`app_classes.${cls[0]}.description`)}
                </h2>
              </div>
              <div class='tw-grid tw-gap-6 tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-3'>
                {cls[1].map(([key, { label, description, thumbnail }]) => (
                  <nuxt-link to={`/apps/${key}`}>
                    <AppCard
                      class={`${idx % 2 === 1 ? 'tw-bg-light-surface' : 'tw-bg-light-elevatedSurface'} tw-p-8 tw-rounded-md tw-shadow-sm hover:tw-shadow-md tw-transition tw-duration-150 tw-ease-in-out`}
                      label={label}
                      description={description}
                      thumbnail={thumbnail} />
                  </nuxt-link>
                ))}
              </div>
            </section>
          </div>
        ))}
      </div>
    )
  },
})
