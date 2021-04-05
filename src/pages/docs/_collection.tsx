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
        class={`docs header_mobile_aside shadow-nuxt fixed left-0 z-20 w-full sm:w-1/2 ${this.show ? 'header_mobile_aside--open' : ''}`}

      >
        <div class="mx-auto h-full bg-light-surface transition-colors duration-300 ease-linear">
          <div class="content-wrapper h-full relative">
            <div class="overflow-y-auto h-full pt-4">
              {Object.entries(this.sortedLinks).map(link => {
                const CatTag = this.$route.params.book === link[0] ? 'h3' : 'nuxt-link'
                return (
                  <div class="header_mobile_aside_group">
                    <CatTag
                      to={`/docs/${this.$route.params.collection}/${link[1][0].book}/${link[1][0].slug}`}
                      class={`flex items-center uppercase text-gray-600 pb-2 ${this.$route.params.book === link[0] ? 'font-bold' : 'hover:text-cornflower-blue mb-4 block'}`}
                    // nativeOnClick={() => this.show = false}
                    >
                      {this.$route.params.book === link[0] && (
                        <IconChevronDownSolid class="w-4 h-4 mr-2" />
                      )}
                      {this.$route.params.book !== link[0] && (
                        <IconChevronRightSolid class="w-4 h-4 mr-2" />
                      )}
                      <span>{this.$t(`content.docs.${this.$route.params.collection}.${link[0]}`)}</span>
                    </CatTag>
                    {this.$route.params.book === link[0] && (
                      <ul class="pb-6 pl-6">
                        {link[1].map(article => (
                          <li class="py-2">
                            <nuxt-link
                              class="block dark:text-dark-onSurfacePrimary hover:text-cornflower-blue transition-colors duration-300 ease-linear"
                              exact-active-class="text-cornflower-blue"
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
              class="inner-button sm:hidden absolute h-10 w-10 flex items-center justify-center text-nuxt-gray bg-gray-200 dark:bg-dark-elevatedSurface dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
              onClick={() => this.show = false}>
              <IconTimesSolid class="block h-5 fill-current transition-colors duration-300 ease-linear" />
            </button>
          </div>

          <button
            class="bookmark-button absolute h-10 w-10 flex items-center justify-center text-nuxt-gray bg-gray-200 dark:bg-dark-surface dark:text-dark-onSurfaceSecondary transition-colors duration-300 ease-linear"
            onClick={() => this.show = !this.show}>
            {!this.show && (
              <IconListUlSolid class="block h-5 fill-current stroke-current transition-colors duration-300 ease-linear" />
            )}
            {this.show && (
              <IconTimesSolid class="block h-5 fill-current transition-colors duration-300 ease-linear" />
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
      <aside class="opacity-transition block bg-gray-100 mt-8 -mx-4 lg:bg-transparent lg:mt-0 lg:mx-0 lg:inset-0 z-90 lg:mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-1/4 lg:block">
        <div class="h-full overflow-y-auto scrolling-touch text-center lg:text-left lg:h-auto lg:block lg:sticky lg:top-0">
          <nav
            class="pt-8 lg:overflow-y-auto lg:block lg:pl-0 lg:pr-8 sticky?lg:max-h-(screen-24)" >
            {Object.entries(this.sortedLinks).map(link => {
              const CatTag = this.$route.params.book === link[0] ? 'h3' : 'nuxt-link'
              return (
                <div>
                  <CatTag
                    to={`/docs/${this.$route.params.collection}/${link[1][0].book}/${link[1][0].slug}`}
                    class={`flex items-center uppercase font-medium text-light-onSurfaceSecondary pb-2 transition-colors duration-300 ease-linear ${this.$route.params.book === link[0] ? 'font-bold' : 'hover:text-cornflower-blue mb-4 block'}`}
                  // nativeOnClick={() => this.show = false}
                  >
                    {this.$route.params.book === link[0] && (
                      <IconChevronDownSolid class="w-4 h-4 mr-2" />
                    )}
                    {this.$route.params.book !== link[0] && (
                      <IconChevronRightSolid class="w-4 h-4 mr-2" />
                    )}
                    <span>{this.$t(`content.docs.${this.$route.params.collection}.${link[0]}`)}</span>
                  </CatTag>
                  {this.$route.params.book === link[0] && (
                    <ul class="pb-8 pl-2">
                      {link[1].map(article => (
                        <li class="text-light-onSurfacePrimary">
                          <nuxt-link
                            exact-active-class="text-cornflower-blue bg-blue-100"
                            class="p-2 pl-4 flex rounded hover:text-cornflower-blue transition-colors duration-300 ease-linear"
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
      <div class="shadow-nuxt">
        <div class="container mx-auto px-4 lg:flex pb-12">
          <AsideNavMobile links={this.links} class='block lg:hidden' />
          <AsideNav links={this.links} class="hidden lg:block" />
          <div class="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4">
            <nuxt-child />
          </div>
        </div>
      </div>
    )
  }
})