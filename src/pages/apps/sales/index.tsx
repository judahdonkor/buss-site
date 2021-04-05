import { groupBy } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { AppCard } from '~/components'
import { App } from '~/layouts/app'

export default tsx.component({
  layout: 'app',
  render() {
    return (
      <div>
        {/* {Object.entries(groupBy(e => e[1].class, Object.entries(this.$t('apps')))).map((cls, idx) => (
          <div class={`${idx % 2 === 1 ? 'bg-light-elevatedSurface' : ''}`}>
            <section class='container py-10'>
              <div class='flex-1'>
                <h1 class='text-light-onSurfacePrimary text-4xl font-black text-center sm:text-5xl sm:text-left'>
                  {this.$t(`app_classes.${cls[0]}.label`)}
                </h1>
                <h2 class='text-light-onSurfaceSecondary my-5 text-xl text-center sm:text-left sm:text-2xl'>
                  {this.$t(`app_classes.${cls[0]}.description`)}
                </h2>
              </div>
              <div class='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
                {cls[1].map(([key, { label, description, thumbnail }]) => (
                  <AppCard
                    class={`${idx % 2 === 1 ? 'bg-light-surface' : 'bg-light-elevatedSurface'} p-8 rounded-md shadow-sm hover:shadow-md transition duration-150 ease-in-out`}
                    label={label}
                    description={description}
                    thumbnail={thumbnail} />
                ))}
              </div>
            </section>
          </div>
        ))} */}
      </div>
    )
  },
})
