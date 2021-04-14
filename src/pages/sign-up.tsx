import Abstract from '@/assets/logo/abstract.svg?inline'
import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { assoc } from 'ramda'
import { ValidationObserver } from 'vee-validate'
import * as tsx from 'vue-tsx-support'
import { Card, Hero, Loading } from '~/components'
import { Input } from '~/components/form-control'
import { mdlClient, mdlPerson } from '~/rs'

export default tsx.component({
  layout: 'plain',
  components: { ValidationObserver },
  data() {
    return {
      person: {} as Entity,
      loading: false
    }
  },
  methods: {
    async signUp() {
      this.loading = true
      try {
        const person = await this.$chassis.repos.find(mdlPerson, {
          type: 'EQUAL',
          params: {
            x: 'email',
            y: this.person.email
          }
        }) || await this.$chassis.repos.merge(mdlPerson, this.person)
        let client = await this.$chassis.repos.find(mdlClient, {
          type: 'EQUAL',
          params: {
            x: 'person.id',
            y: person.id
          }
        })
        if (client) {
          this.$confirm({
            context: 'Sign Up',
            message: `Hi ${client.person.firstName}, you already have a Buss Account. If you have difficulties with sign in, we can help with that.`,
            state: 'info',
            confirmText: 'Yes, help me sign in'
          })
            .then(() => window.open(`${this.$accessor.appUrl}/sign-in?email=${String(this.$route.query.email || '')}&otp`, '_blank'))
            .catch(error => this.$router.push('/'))
        } else {
          client = await this.$chassis.repos.merge(mdlClient, {
            person
          })
          this.$router.push(`/welcome?email=${client.person.email}&firstName=${client.person.firstName}`)
        }
      } catch (error) {
        this.$notifyError(error)
      }
      this.loading = false
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
          <section class="section">
            <Loading
              active={this.loading}
              message='Creating your Buss Account' />
            <validation-observer
              slim
              scopedSlots={{
                default: ({ handleSubmit }: any) => (
                  <form
                    onSubmit={(e: Event) => {
                      e.preventDefault()
                      handleSubmit(() => this.signUp())
                    }}>
                    <div class="has-text-centered">
                      <div class='tw-inline-tw-flex tw-items-center tw-gap-1'>
                        <Abstract class='tw-h-24 tw-w-24' />
                        {/* <span class='has-text-space-removed title'>Buss</span> */}
                      </div>
                    </div>
                    <div class='mt-2 has-text-centered'>
                      <h1 class='title is-4'>Create your Buss Account</h1>
                      {/* <h2 class='subtitle is-6'>You get access to all buss features free for 3 months</h2> */}
                    </div>
                    <Input
                      class='has-width-large mt-6'
                      rules='required|email'
                      label='Email'
                      cleaveOptions={{
                        blocks: [9999, 0],
                        lowercase: true,
                      }}
                      value={this.person.email}
                      onInput={(val: string) => this.person = assoc('email', val, this.person)} />
                    <Input
                      class='has-width-large'
                      rules='required'
                      label='First name'
                      value={this.person.firstName}
                      onInput={(val: string) => this.person = assoc('firstName', val, this.person)} />
                    <Input
                      class='has-width-large'
                      rules='required'
                      label='Last name'
                      value={this.person.lastName}
                      onInput={(val: string) => this.person = assoc('lastName', val, this.person)} />
                    <b-button
                      expanded
                      class='mt-6'
                      size='is-medium'
                      native-type='submit'
                      type='is-primary' >
                      Create my account
                    </b-button>
                    <nuxt-link
                      class='has-text-centered tw-block mt-2'
                      to='/sign-in'
                    >
                      Already have a Buss Account?
                    </nuxt-link>
                  </form>
                ),
              }}
            />
          </section>
        </Card>
      </Hero>
    )
  },
})
