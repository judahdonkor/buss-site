import { ValidationObserver } from 'vee-validate'
import * as tsx from 'vue-tsx-support'
import { Card, Hero } from '~/components'
import Abstract from '@/assets/logo/abstract.svg?inline'

export default tsx.component({
  layout: 'plain',
  components: { ValidationObserver },
  render() {
    return (
      <Hero
        class='tw-items-center'
        style={{
          'background-image': 'url(/images/adi-goldstein-Hli3R6LKibo-unsplash.jpg)',
          'background-size': 'cover'
        }}
        size='is-fullheight'>
        <div class="has-text-centered tw-bg-opacity-50 tw-bg-black section">
          <Abstract class='tw-h-40 tw-w-40 mb-6' />
          <h1 class='title is-spaced has-text-white'>Welcome!</h1>
          <p class='subtitle has-text-white'>Thanks for creating a Buss Account. With apps like Accounting, Inventory, and Sales; you can now run your enterprise the way you want.</p>
          <b-button
            size='is-medium'
            type='is-primary'
            tag='a'
            href={`/sign-in?email=${String(this.$route.query.email || '')}&otp`}
            target='_blank'
            onClick={() => this.$router.push('/')}>
            Continue to Buss
          </b-button>
        </div>
      </Hero>
    )
  },
})
