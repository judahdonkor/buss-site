import Collecting from '@/assets/illustration/collecting.svg?inline'
import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import * as tsx from 'vue-tsx-support'
import { Card } from '~/components'
import { merge as mergeDiscriminator } from '~/discriminator'

export default tsx.component({
  render() {
    return (
      <div>
        {/* profile */}
        <div class='tw-bg-light-elevatedSurface'>
          <section class='tw-container tw-flex tw-flex-col tw-gap-2 tw-py-16 tw-items-center md:tw-flex-row tw-justify-between'>
            <div
              class='tw-flex tw-flex-col tw-items-center tw-gap-4 md:tw-flex-row'>
              <div>
                <img
                  class='tw-w-48 tw-h-48 tw-rounded-full tw-border-light-surface tw-border-8 tw-tw-shadow-2xl'
                  src={
                    this.cl?.person?.photo ||
                    (this.cl?.person?.gender === 'FEMALE'
                      ? '/images/female_avatar.svg'
                      : '/images/male_avatar.svg')
                  }
                />
              </div>
              <div class='tw-flex-1 tw-text-center md:tw-text-left'>
                <h1 class='tw-text-light-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl '>
                  {this.cl!.person?.display}
                </h1>
                <h2 class='tw-text-light-onSurfaceSecondary sm:tw-text-xl lg:tw-text-2xl'>
                  {this.cl!.person?.email}
                </h2>
                {/* <p class='tw-text-light-onSurfaceSecondary sm:tw-text-xl lg:tw-text-2xl'>
                  Your 90 day trial period ends in 60 days
                  </p> */}
              </div>
            </div>
            {/* <div
              class='tw-text-center'>
              <nuxt-link
                to='/client/profile'>
                Profile
              </nuxt-link>

            </div> */}
          </section>
        </div>
        {/* discriminators */}
        <div class=''>
          <section class='tw-container tw-py-16'>
            <h1 class='tw-text-light-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl '>
              {this.discs.length === 0
                ? 'Start with a database'
                : 'Your databases'}
            </h1>
            <h2 class='tw-text-light-onSurfaceSecondary tw-mt-3 tw-text-base  sm:tw-text-xl lg:tw-text-2xl'>
              All buss services organize you information into databases. You may define apps for each database. You can also decide who and how your information is accessed.
            </h2>
            <div class='tw-py-8 tw-grid tw-gap-4 tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-3'>
              {this.discs.map(({ id, name, thumbnail }: Entity) => (
                <nuxt-link to={`/database/${id}`}>
                  <Card
                    class='has-text-centered cursor-pointer'>
                    <img
                      class='tw-w-32 tw-h-32 inline'
                      src={thumbnail || '/images/collecting.svg'} />
                    <p class='title is-5'>{name}</p>
                  </Card>
                </nuxt-link>
              ))}
              <Card
                class='has-text-centered cursor-pointer'
                onClick={async () => {
                  try {
                    const disc = await mergeDiscriminator({
                      ctx: this,
                      client: this.cl!,
                      fullScreen: true
                    })
                    await this.$axios.$get(`/con/init/${disc.id}`)
                    this.$accessor.discs.push(disc)
                    this.$notify({
                      context: 'Added database',
                      message: `Added ${disc.display}.`,
                      state: 'success'
                    })
                  } catch (error) {
                    this.$notifyError(error)
                  }
                }}>
                <Collecting
                  class='tw-w-32 tw-h-32 inline' />
                <p class='title is-5'>Create a database</p>
              </Card>
            </div>
          </section>
        </div>
      </div>
    )
  },
})

