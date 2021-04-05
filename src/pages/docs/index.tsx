import { IContentDocument } from '@nuxt/content/types/content'
import { comparator, gt, prop, sortBy } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { IconDot } from '~/components/icons'

type Collection = Record<'id' | 'title' | 'description' | 'to', string>
type Library = Record<'id' | 'title' | 'description', string> & {
  collections: Collection[]
}

export default tsx.component({
  data() {
    return {
      libraries: [] as Library[]
    }
  },
  async fetch() {
    const libraries: Library[] = []
    for (const [key, { title, description }] of Object.entries(this.$t('pages.docs.libraries'))) {
      const library: Library = {
        id: `library-${key}`,
        title,
        description,
        collections: []
      }
      for (const [collKey, { label: collTitle, description: collDescription }] of Object.entries(this.$t('pages.docs.collections')).filter(([, { library }]) => library === key)) {
        try {
          const locale = ['pt', 'es'].includes(this.$i18n.locale)
            ? this.$i18n.locale
            : this.$i18n.defaultLocale
          let { book, slug } = (await this.$content(locale!, 'docs', collKey, { deep: true })
            .only(['slug', 'book', 'position'])
            .fetch() as any[])[0]
          library.collections.push({
            id: `collection-${collKey}`,
            title: collTitle,
            description: collDescription,
            to: `/docs/${collKey}/${book}/${slug}`
          })
        } catch (e) { }
      }
      libraries.push(library)
    }
    this.libraries = libraries
  },
  render() {
    return (
      <div class="container">
        <div class='pt-6'>
          {this.libraries.map(({ title, description, id, collections }) => (
            <div id={id}>
              <h1 class='text-4xl'>{title}</h1>
              <h2 class='text-base'>{description}</h2>
              <nav class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 pb-12'>
                {collections.map(({ title: collTitle, description: collDescription, id: collId, to }) => (
                  <nuxt-link
                    to={to}
                    id={collId}
                    class='bg-light-elevatedSurface p-8 rounded-md shadow-sm hover:shadow-md group transition duration-150 ease-in-out'>
                    <p class='text-2xl text-light-onSurfacePrimary group-hover:text-cornflower-blue'>{collTitle}</p>
                    <p class='text-light-onSurfaceSecondary'>{collDescription}</p>
                  </nuxt-link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    )
  }
})