import { ValidationObserver } from 'vee-validate'
import { Route } from 'vue-router'
import * as tsx from 'vue-tsx-support'
import { Card, Hero, Input, Level, Loading } from '~/components'
import { Notification } from '~/mixins'

export default tsx.componentFactory.create({
  layout: 'plain',
  components: { ValidationObserver },
  data() {
    return {
      email: '',
      returnPath: '',
      loading: false
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
    },
    async sendToken() {
      this.loading = true
      try {
        this.$buefy.notification.open({
          message: await this.$chassis.xchg.otp(this.email),
          type: 'is-info',
        })
        this.$router.push({
          path: '/sign-in',
          query: {
            'return-path': this.returnPath,
            email: this.email,
            otp: '',
          },
        })
      } catch (error) {
        this.$notifyError(error)
      }
      this.loading = false
    },
  },
  render() {
    return (
      <Hero
        size="is-fullheight">
        <div class="container">
          <Level>
            <Card>
              <Loading
                active={this.loading}
                message='Creating your token' />
              <validation-observer
                slim
                scopedSlots={{
                  default: ({ handleSubmit }: any) => (
                    <form
                      class='section'
                      onSubmit={(e: Event) => {
                        e.preventDefault()
                        handleSubmit(this.sendToken)
                      }}>
                      <Level>
                        <div>
                          <figure class="image is-128x128">
                            <img src="/logo/ico.svg" />
                          </figure>
                        </div>
                      </Level>
                      <p class="title has-text-centered is-spaced is-5 mb-5 mt-5">Recover account</p>
                      <Input
                        rules="required|email"
                        label="Email"

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
                        native-type="submit"
                        expanded>
                        Submit
                      </b-button>
                    </form>
                  ),
                }}
              />
            </Card>
          </Level>
        </div>
      </Hero>
    )
  },
})
