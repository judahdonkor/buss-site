import { ValidationObserver } from 'vee-validate'
import { Route } from 'vue-router'
import * as tsx from 'vue-tsx-support'
import { Card, Hero, Input, Level, Loading } from '~/components'
import { Notification } from '~/mixins'
import Abstract from '@/assets/logo/abstract.svg?inline'

export default tsx.componentFactory.create({
  layout: 'plain',
  components: { ValidationObserver },
  data() {
    return {
      email: '',
      returnPath: ''
    }
  },
  mounted() {
    this.init(this.$route.query)
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query)
    next()
  },
  methods: {
    init(query: Route['query']) {
      this.returnPath = String(query['return-path'] || '/')
      this.email = String(query.email || '')
    }
  },
  render() {
    return (
      <Hero
        class='tw-items-center lg:tw-items-start lg:tw-pl-40'
        size='is-fullheight'
        style={{
          'background-image': 'linear-gradient(135deg, transparent 0%, transparent 17%,rgba(87, 146, 234,0.6) 17%, rgba(87, 146, 234,0.6) 59%,transparent 59%, transparent 64%,rgba(34, 81, 222,0.6) 64%, rgba(34, 81, 222,0.6) 100%),linear-gradient(45deg, transparent 0%, transparent 2%,rgb(87, 146, 234) 2%, rgb(87, 146, 234) 46%,rgb(114, 178, 239) 46%, rgb(114, 178, 239) 54%,transparent 54%, transparent 63%,rgb(7, 48, 216) 63%, rgb(7, 48, 216) 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))'
        }}>
        <Card>
          <validation-observer
            slim
            scopedSlots={{
              default: ({ handleSubmit }: any) => (
                <form
                  class='section'
                  onSubmit={(e: Event) => {
                    e.preventDefault()
                    handleSubmit(() => this.$router.push(`/sign-in?email=${String(this.$route.query.email || '')}&otp`))
                  }}>
                  <div class='has-text-centered'>
                    <Abstract class='tw-h-24 tw-w-24' />
                  </div>
                  {/* <p class="title has-text-centered is-spaced is-5 mb-5 tw-mt-5">Recover account</p> */}
                  <Input
                    rules="required|email"
                    label="Email"
                    class='has-width-large mt-6'
                    style='width: 20.5em'
                    cleaveOptions={{
                      blocks: [9999, 0],
                      lowercase: true,
                    }}
                    label-position="inside"
                    value={this.email}
                    onInput={(val: string) => (this.email = val)}
                  />
                  <b-button
                    class='mt-5'
                    type="is-primary"
                    size='is-medium'
                    native-type="submit"
                    expanded>
                    Recover account
                  </b-button>
                </form>
              ),
            }}
          />
        </Card>
      </Hero>
    )
  },
})
