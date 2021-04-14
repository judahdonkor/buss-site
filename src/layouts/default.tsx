import * as tsx from 'vue-tsx-support'
import { Footer, Navbar } from '~/components'

export default tsx.component({
  render() {
    return (
      <div class='tw-flex tw-flex-col min-tw-h-screen'>
        <Navbar />
        <main class="tw-flex-1">
          <nuxt />
        </main>
        <Footer />
      </div>
    )
  },
})
