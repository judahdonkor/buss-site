import { IContentDocument } from '@nuxt/content/types/content'
import * as tsx from 'vue-tsx-support'

const Toc = tsx.component({
  props: {
    toc: {
      type: Array as () => any[],
      required: true
    }
  },
  render() {
    return (
      <div class="lg:inset-0 z-90 lg:mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-1/4 lg:block">
        <div class="lg:overflow-y-auto lg:scrolling-touch lg:h-auto lg:block lg:sticky lg:top-0">
          <div class="flex flex-col sm:flex-row px-4 pt-8 justify-between lg:justify-start lg:flex-col lg:overflow-y-auto overflow-x-hidden lg:pr-0 lg:pl-8 sticky?lg:max-h-(screen-24)">
            <div class="mb-8 block">
              <h6 class="mb-3 lg:mb-2 text-gray-500 dark:text-gray-600 uppercase tracking-wide font-bold text-sm lg:text-xs">
                {this.$t('pages.docs.toc_title')}
              </h6>
              <nav>
                <scrollactive
                  highlight-first-item
                  active-class="text-cornflower-blue"
                  tag="ul"
                  offset={100}>
                  {this.toc.map(link => (
                    <li
                      class={`text-gray-600 ${link.depth === 2 ? 'border-t border-dashed dark:border-gray-800 first:border-t-0 font-semibold' : ''}`}>
                      <nuxt-link
                        to={`#${link.id}`}
                        data-cy="toc"
                        class={`block text-sm scrollactive-item transition-transform ease-in-out duration-300 transform hover:translate-x-1 ${link.depth === 2 ? 'py-2' : ''} ${link.depth === 3 ? 'ml-2 pb-2' : ''}`}>
                        {link.text}
                      </nuxt-link>
                    </li>
                  ))}
                </scrollactive>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default tsx.component({
  data() {
    return {
      page: {} as IContentDocument,
      prev: null as IContentDocument | null,
      next: null as IContentDocument | null,
      langFallback: false,
      path: '',
      collection: '',
      book: ''
    }
  },
  async asyncData({ $content, params, store, error, app }) {
    let path = `/${app.i18n.defaultLocale}/docs/${params.collection}/${params.book}`
    let page, prev, next, langFallback
    try {
      page = await $content(path, params.slug).fetch()
    } catch (err) {
      if (!err.response || err.response.status !== 404) {
        return error({
          statusCode: 500,
          message: app.i18n.t('common.an_error_occurred').toString()
        })
      }

      return error({
        statusCode: 404,
        message: app.i18n.t('common.page_not_found').toString()
      })
    }

    if (
      app.i18n.locale !== app.i18n.defaultLocale &&
      (['pt', 'es'].includes(app.i18n.locale) ||
        process.env.NODE_ENV !== 'production')
    ) {
      try {
        path = `/${app.i18n.locale}/docs/${params.collection}/${params.book}`
        page = await $content(path, params.slug).fetch()
      } catch (err) {
        langFallback = true
        path = `/${app.i18n.defaultLocale}/docs/${params.collection}/${params.book}`
      }
    }

    try {
      [prev, next] = await $content(
        ['pt', 'es'].includes(app.i18n.locale)
          ? path
          : `/${app.i18n.defaultLocale}/docs/${params.collection}/${params.book}`
      )
        .only(['title', 'slug', 'dir', 'menu'])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .surround(params.slug, { before: 1, after: 1 })
        .fetch()
    } catch (e) { }

    return {
      path,
      langFallback,
      collection: params.collection,
      book: params.book,
      page,
      prev,
      next
    }
  },
  render() {
    return (
      <div class="-mx-4 lg:mx-0 flex flex-col-reverse lg:flex-row">
        <div class="lg:min-h-screen w-full py-8 px-4 lg:static lg:overflow-visible lg:max-h-full lg:w-3/4">
          {/* <LangFallback :doc-link="docLink" :lang-fallback="langFallback" /> */}

          <article>
            <h1 class="text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary transition-colors duration-300 ease-linear docs-content-title">
              {this.page.title}
            </h1>
            <nuxt-content document={this.page} />
            <div class='flex justify-between'>
              <div class='p-2 pl-0'>
                {this.prev && (
                  <nuxt-link class='flex items-center text-cornflower-blue font-bold hover:underline' to={`/docs/${this.collection}/${this.book}/${this.prev.slug}`}>
                    <svg class='h-5 w-5 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {this.prev.menu || this.prev.title}
                  </nuxt-link>
                )}
              </div>
              <div class='p-2 pr-0'>
                {this.next && (
                  <nuxt-link class='flex items-center text-cornflower-blue font-bold hover:underline text-right' to={`/docs/${this.collection}/${this.book}/${this.next.slug}`}>
                    {this.next.menu || this.next.title}
                    <svg class='h-5 w-5 ml-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </nuxt-link>
                )}
              </div>
            </div>
          </article>
        </div>
        <Toc toc={this.page.toc} />
      </div>
    )
  }
})