import { ValidationObserver } from 'vee-validate'
import { Route } from 'vue-router'
import * as tsx from 'vue-tsx-support'
import { Card, changePassword, Hero, Input, Level, Loading } from '~/components'
import Abstract from '@/assets/logo/abstract.svg?inline'

export default tsx.componentFactory.create({
  layout: 'plain',
  components: { ValidationObserver },
  data() {
    return {
      email: '',
      password: '',
      returnPath: '/account',
      otp: false,
      loading: ''
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
      if (this.otp)
        this.sendToken()
    },
    async signIn() {
      this.loading = 'Creating your session'
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
      this.loading = ''
    },
    async sendToken() {
      this.loading = 'Creating your secure token'
      try {
        this.$notify({
          context: 'Sign in',
          message: await this.$chassis.xchg.otp(this.email),
          state: 'success',
          indefinite: true
        })
      } catch (error) {
        this.$notifyError(error)
      }
      this.loading = ''
    },
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
          <Loading
            active={!!this.loading}
            message={this.loading} />
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
                  <div class='has-text-centered'>
                    <Abstract class='tw-h-24 tw-w-24' />
                  </div>
                  <Input
                    class='has-width-large mt-6'
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
                    style='width: 20.5em'
                    class='has-width-large'
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
                    size='is-medium'
                    native-type="submit"
                    type="is-primary"
                    icon-left="sign-in-alt">
                    Sign in
                  </b-button>
                  <nuxt-link
                    class='has-text-centered tw-block mt-2'
                    to={`/password-recovery?email=${this.email || ''}&return-path=${this.returnPath}`}>
                    Forgot password?
                  </nuxt-link>
                </form>
              ),
            }}
          />
        </Card>
      </Hero>
    )
  },
})
