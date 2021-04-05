import { ValidationObserver } from 'vee-validate'
import { Route } from 'vue-router'
import * as tsx from 'vue-tsx-support'
import { Card, changePassword, Hero, Input, Level, Loading } from '~/components'

export default tsx.componentFactory.create({
  layout: 'plain',
  components: { ValidationObserver },
  data() {
    return {
      email: '',
      password: '',
      returnPath: '/account',
      otp: false,
      loading: false
    }
  },
  async mounted() {
    this.init(this.$route.query)
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query)
    next()
  },
  methods: {
    init(query: Route['query']) {
      this.email = String(query.email || '')
      this.otp = Object.keys(query).includes('otp')
    },
    async signIn() {
      this.loading = true
      try {
        await this.$accessor.setup(
          await this.$chassis.xchg.signIn({
            email: this.email,
            password: this.otp ? `OTP${this.password}` : this.password,
          })
        )
        if (this.otp) changePassword({
          ctx: this,
          fullScreen: true
        })
        this.$router.push(this.returnPath)
        this.$buefy.toast.open({
          message: 'Welcome back',
          type: 'is-info',
          position: 'is-bottom'
        })
      } catch (error) {
        this.$notifyError(error)
      }
      this.loading = false
    },
  },
  render() {
    return (
      <Hero size="is-fullheight">
        <div class="container">
          <Level>
            <Card>
              {/* <Loading
                active={this.loading}
                message='Creating your session' /> */}
              <validation-observer
                slim
                scopedSlots={{
                  default: ({ handleSubmit }: any) => (
                    <form
                      class='section'
                      onSubmit={(e: Event) => {
                        e.preventDefault()
                        handleSubmit(this.signIn)
                      }}>
                      <Level
                        class='mb-6'>
                        <figure class="image is-128x128">
                          <img src="/ico.svg" />
                        </figure>
                      </Level>
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
                      <Input
                        rules="required|min:4"
                        label="Password"
                        password-reveal
                        type="password"
                        label-position="inside"
                        value={this.password}
                        onInput={(val: string) => (this.password = val)}
                      />
                      <b-button
                        class='mt-5'
                        expanded
                        native-type="submit"
                        type="is-primary"
                        icon-left="sign-in-alt">
                        Sign in
                        </b-button>
                      <b-button
                        expanded
                        type="is-text"
                        onClick={() =>
                          this.$router.push({
                            path: '/password-recovery',
                            query: {
                              email: this.email || '',
                              'return-path': this.returnPath,
                            },
                          })
                        }
                      >
                        Forgot password?
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
