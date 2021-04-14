import { IContentDocument } from '@nuxt/content/types/content'
import { groupBy, sortBy } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { IconChevronDownSolid, IconChevronRightSolid, IconTimesSolid, IconListUlSolid } from '~/components/icons'

type Groupings = { [key in string]: IContentDocument[] }

const AsideNavMobile = tsx.component({
  props: {
    links: {
      type: Object as () => Groupings,
      requred: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    sortedLinks(): Groupings {
      const links = {} as Groupings
      sortBy(link => {
        return Object.keys(this.$i18n.t(`content.docs.${this.$route.params.collection}`)).indexOf(link)
      }, Object.keys(this.links)).forEach(key => {
        links[key] = this.links[key]
      })
      return links
    }
  },
  render() {
    return (
      <div
        v-click-outside={() => {
          if (this.show)
            this.show = false
        }}
        class={`docs header_mobile_aside tw-shadow-nuxt fixed tw-left-0 z-20 tw-w-full sm:tw-w-1/2 ${this.show ? 'header_mobile_aside--open' : ''}`}

      >
        <div class="mx-auto tw-h-full tw-bg-light-surface tw-transition-colors duration-300 ease-linear">
          <div class="content-wrapper tw-h-full relative">
            <div class="overflow-y-auto tw-h-full tw-pt-4">
              {Object.entries(this.sortedLinks).map(link => {
                const CatTag = this.$route.params.book === link[0] ? 'h3' : 'nuxt-link'
                return (
                  <div class="header_mobile_aside_group">
                    <CatTag
                      to={`/docs/${this.$route.params.collection}/${link[1][0].book}/${link[1][0].slug}`}
                      class={`tw-flex tw-items-center uppercase tw-text-gray-600 tw-pb-2 ${this.$route.params.book === link[0] ? 'tw-font-bold' : 'hover:tw-text-cornflower-blue mb-4 tw-block'}`}
                    // nativeOnClick={() => this.show = false}
                    >
                      {this.$route.params.book === link[0] && (
                        <IconChevronDownSolid class="tw-w-4 tw-h-4 mr-2" />
                      )}
                      {this.$route.params.book !== link[0] && (
                        <IconChevronRightSolid class="tw-w-4 tw-h-4 mr-2" />
                      )}
                      <span>{this.$t(`content.docs.${this.$route.params.collection}.${link[0]}`)}</span>
                    </CatTag>
                    {this.$route.params.book === link[0] && (
                      <ul class="tw-pb-6 pl-6">
                        {link[1].map(article => (
                          <li class="tw-py-2">
                            <nuxt-link
                              class="tw-block dark:tw-text-dark-onSurfacePrimary hover:tw-text-cornflower-blue tw-transition-colors duration-300 ease-linear"
                              exact-active-class="tw-text-cornflower-blue"
                              to={`/docs/${this.$route.params.collection}/${this.$route.params.book}/${article.slug}`}
                              nativeOnClick={() => this.show = false}>
                              {article.label || article.title}
                            </nuxt-link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
            <button
              class="inner-button sm:tw-hidden tw-absolute tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center tw-text-nuxt-gray tw-bg-gray-200 dark:bg-dark-elevatedSurface dark:tw-text-dark-onSurfaceSecondary tw-transition-colors duration-300 ease-linear"
              onClick={() => this.show = false}>
              <IconTimesSolid class="tw-block tw-h-5 tw-fill-current tw-transition-colors duration-300 ease-linear" />
            </button>
          </div>

          <button
            class="bookmark-button tw-absolute tw-h-10 tw-w-10 tw-flex tw-items-center tw-justify-center tw-text-nuxt-gray tw-bg-gray-200 dark:bg-dark-surface dark:tw-text-dark-onSurfaceSecondary tw-transition-colors duration-300 ease-linear"
            onClick={() => this.show = !this.show}>
            {!this.show && (
              <IconListUlSolid class="tw-block tw-h-5 tw-fill-current stroke-current tw-transition-colors duration-300 ease-linear" />
            )}
            {this.show && (
              <IconTimesSolid class="tw-block tw-h-5 tw-fill-current tw-transition-colors duration-300 ease-linear" />
            )}
          </button>
        </div>
      </div>
    )
  }
})

const AsideNav = tsx.component({
  props: {
    links: {
      type: Object as () => Groupings,
      requred: true
    }
  },
  computed: {
    sortedLinks(): Groupings {
      const links = {} as Groupings
      sortBy(link => {
        return Object.keys(this.$i18n.t(`content.docs.${this.$route.params.collection}`)).indexOf(link)
      }, Object.keys(this.links)).forEach(key => {
        links[key] = this.links[key]
      })
      return links
    }
  },
  render() {
    return (
      <aside class="opacity-tw-transition tw-block tw-bg-gray-100 tw-mt-8 -mx-4 lg:bg-transparent lg:tw-mt-0 lg:mx-0 lg:inset-0 z-90 lg:mb-0 lg:static lg:tw-h-auto lg:overflow-y-visible lg:tw-pt-0 lg:tw-w-1/4 lg:tw-block">
        <div class="tw-h-full overflow-y-auto scrolling-touch tw-text-center lg:tw-text-left lg:tw-h-auto lg:tw-block lg:sticky lg:totw-p-0">
          <nav
            class="tw-pt-8 lg:overflow-y-auto lg:tw-block lg:pl-0 lg:pr-8 sticky?lg:max-tw-h-(screen-24)" >
            {Object.entries(this.sortedLinks).map(link => {
              const CatTag = this.$route.params.book === link[0] ? 'h3' : 'nuxt-link'
              return (
                <div>
                  <CatTag
                    to={`/docs/${this.$route.params.collection}/${link[1][0].book}/${link[1][0].slug}`}
                    class={`tw-flex tw-items-center uppercase tw-font-medium tw-text-light-onSurfaceSecondary tw-pb-2 tw-transition-colors duration-300 ease-linear ${this.$route.params.book === link[0] ? 'tw-font-bold' : 'hover:tw-text-cornflower-blue mb-4 tw-block'}`}
                  // nativeOnClick={() => this.show = false}
                  >
                    {this.$route.params.book === link[0] && (
                      <IconChevronDownSolid class="tw-w-4 tw-h-4 mr-2" />
                    )}
                    {this.$route.params.book !== link[0] && (
                      <IconChevronRightSolid class="tw-w-4 tw-h-4 mr-2" />
                    )}
                    <span>{this.$t(`content.docs.${this.$route.params.collection}.${link[0]}`)}</span>
                  </CatTag>
                  {this.$route.params.book === link[0] && (
                    <ul class="tw-pb-8 pl-2">
                      {link[1].map(article => (
                        <li class="tw-text-light-onSurfacePrimary">
                          <nuxt-link
                            exact-active-class="tw-text-cornflower-blue bg-blue-100"
                            class="p-2 pl-4 tw-flex rounded hover:tw-text-cornflower-blue tw-transition-colors duration-300 ease-linear"
                            to={`/docs/${this.$route.params.collection}/${this.$route.params.book}/${article.slug}`}>
                            {article.label || article.title}
                          </nuxt-link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav >
        </div >
      </aside >
    )
  }
})

export default tsx.component({
  data() {
    return {
      links: {} as Groupings
    }
  },
  async asyncData({ $content, params, store, error, app }) {
    let pages = [] as IContentDocument[]
    try {
      const locale = ['pt', 'es'].includes(app.i18n.locale)
        ? app.i18n.locale
        : app.i18n.defaultLocale

      pages = (await $content(locale!, 'docs', params.collection, { deep: true })
        .only(['slug', 'title', 'menu', 'book', 'position', 'label'])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .fetch()) as any
    } catch (e) { }
    return {
      links: groupBy(page => page.book, pages)
    }
  },
  render() {
    return (
      <div class="tw-shadow-nuxt">
        <div class="tw-container tw-mx-auto tw-px-4 lg:tw-flex tw-pb-12">
          <AsideNavMobile links={this.links} class='tw-block lg:tw-hidden' />
          <AsideNav links={this.links} class="tw-hidden lg:tw-block" />
          <div class="min-tw-h-screen tw-w-full lg:static lg:max-tw-h-full lg:overflow-visible lg:tw-w-3/4">
            <nuxt-child />
          </div>
        </div>
      </div>
    )
  }
})