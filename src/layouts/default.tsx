import * as tsx from 'vue-tsx-support'
import { Footer, Navbar } from '~/components'

export default tsx.component({
  render() {
    return (
      <div class='flex flex-col min-h-screen'>
        <Navbar />
        <main class="flex-1">
          <nuxt />
        </main>
        <Footer />
      </div>
    )
  },
})
