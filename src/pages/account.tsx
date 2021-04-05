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
        <div class='bg-light-elevatedSurface'>
          <section class='container flex flex-col gap-2 py-16 items-center md:flex-row justify-between'>
            <div
              class='flex flex-col items-center gap-4 md:flex-row'>
              <div>
                <img
                  class='w-48 h-48 rounded-full border-light-surface border-8 shadow-2xl'
                  src={
                    this.cl?.person?.photo ||
                    (this.cl?.person?.gender === 'FEMALE'
                      ? '/images/female_avatar.svg'
                      : '/images/male_avatar.svg')
                  }
                />
              </div>
              <div class='flex-1 text-center md:text-left'>
                <h1 class='text-light-onSurfacePrimary text-3xl font-black sm:text-5xl '>
                  {this.cl!.person?.display}
                </h1>
                <h2 class='text-light-onSurfaceSecondary sm:text-xl lg:text-2xl'>
                  {this.cl!.person?.email}
                </h2>
                {/* <p class='text-light-onSurfaceSecondary sm:text-xl lg:text-2xl'>
                  Your 90 day trial period ends in 60 days
                  </p> */}
              </div>
            </div>
            {/* <div
              class='text-center'>
              <nuxt-link
                to='/client/profile'>
                Profile
              </nuxt-link>

            </div> */}
          </section>
        </div>
        {/* discriminators */}
        <div class=''>
          <section class='container py-16'>
            <h1 class='text-light-onSurfacePrimary text-3xl font-black sm:text-5xl '>
              {this.discs.length === 0
                ? 'Start with a database'
                : 'Your databases'}
            </h1>
            <h2 class='text-light-onSurfaceSecondary mt-3 text-base  sm:text-xl lg:text-2xl'>
              All buss services organize you information into databases. You may define apps for each database. You can also decide who and how your information is accessed.
            </h2>
            <div class='py-8 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
              {this.discs.map(({ id, name, thumbnail }: Entity) => (
                <nuxt-link to={`/database/${id}`}>
                  <Card
                    class='has-text-centered cursor-pointer'>
                    <img
                      class='w-32 h-32 inline'
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
                  class='w-32 h-32 inline' />
                <p class='title is-5'>Create a database</p>
              </Card>
            </div>
          </section>
        </div>
      </div>
    )
  },
})

