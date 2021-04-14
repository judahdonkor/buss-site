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
      <div class="lg:inset-0 z-90 lg:mb-0 lg:static lg:tw-h-auto lg:overflow-y-visible lg:tw-pt-0 lg:tw-w-1/4 lg:tw-block">
        <div class="lg:overflow-y-auto lg:scrolling-touch lg:tw-h-auto lg:tw-block lg:sticky lg:totw-p-0">
          <div class="tw-flex tw-flex-col sm:tw-flex-row tw-px-4 tw-pt-8 tw-justify-between lg:tw-justify-start lg:tw-flex-col lg:overflow-y-auto overflow-x-tw-hidden lg:pr-0 lg:pl-8 sticky?lg:max-tw-h-(screen-24)">
            <div class="mb-8 tw-block">
              <h6 class="mb-3 lg:mb-2 tw-text-gray-500 dark:tw-text-gray-600 uppercase tracking-wide tw-font-bold tw-text-sm lg:tw-text-xs">
                {this.$t('pages.docs.toc_title')}
              </h6>
              <nav>
                <scrollactive
                  highlight-first-item
                  active-class="tw-text-cornflower-blue"
                  tag="ul"
                  offset={100}>
                  {this.toc.map(link => (
                    <li
                      class={`tw-text-gray-600 ${link.depth === 2 ? 'tw-border-t tw-border-dashed dark:tw-border-gray-800 first:tw-border-t-0 tw-font-semibold' : ''}`}>
                      <nuxt-link
                        to={`#${link.id}`}
                        data-cy="toc"
                        class={`tw-block tw-text-sm scrollactive-item tw-transition-tw-transform tw-ease-in-out duration-300 tw-transform hover:translate-x-1 ${link.depth === 2 ? 'tw-py-2' : ''} ${link.depth === 3 ? 'tw-ml-2 tw-pb-2' : ''}`}>
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
      <div class="-mx-4 lg:mx-0 tw-flex tw-flex-col-reverse lg:tw-flex-row">
        <div class="lg:min-tw-h-screen tw-w-full tw-py-8 tw-px-4 lg:static lg:overflow-visible lg:max-tw-h-full lg:tw-w-3/4">
          {/* <LangFallback :doc-link="docLink" :lang-fallback="langFallback" /> */}

          <article>
            <h1 class="tw-text-light-onSurfacePrimary dark:tw-text-dark-onSurfacePrimary tw-transition-colors duration-300 ease-linear docs-content-title">
              {this.page.title}
            </h1>
            <nuxt-content document={this.page} />
            <div class='tw-flex tw-justify-between'>
              <div class='p-2 pl-0'>
                {this.prev && (
                  <nuxt-link class='tw-flex tw-items-center tw-text-cornflower-blue tw-font-bold hover:underline' to={`/docs/${this.collection}/${this.book}/${this.prev.slug}`}>
                    <svg class='tw-h-5 tw-w-5 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {this.prev.menu || this.prev.title}
                  </nuxt-link>
                )}
              </div>
              <div class='p-2 pr-0'>
                {this.next && (
                  <nuxt-link class='tw-flex tw-items-center tw-text-cornflower-blue tw-font-bold hover:underline tw-text-right' to={`/docs/${this.collection}/${this.book}/${this.next.slug}`}>
                    {this.next.menu || this.next.title}
                    <svg class='tw-h-5 tw-w-5 tw-ml-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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