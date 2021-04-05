import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { assoc } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { Input } from '~/components/form-control'
import { ValidationObserver } from 'vee-validate'
import Abstract from '@/assets/logo/abstract.svg?inline'
import { mdlClient, mdlPerson } from '~/rs'
import { Card, Hero, Level, Loading } from '~/components'

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
          // this.$notify({
          //   state: 'success',
          //   context: 'Creted your Buss account!',
          //   message: instructions
          // })
        } else {
          client = await this.$chassis.repos.merge(mdlClient, {
            person
          })
          const instructions = await this.$chassis.xchg.otp(this.person.email)
          this.$notify({
            state: 'success',
            context: 'Created your Buss account!',
            message: instructions
          })
        }
        this.$router.push({
          path: '/sign-in',
          query: {
            'return-path': '/',
            email: this.person.email,
            otp: '',
          },
        })
      } catch (error) {
        this.$notifyError(error)
      }
      this.loading = false
    }
  },
  render() {
    return (
      <Hero
        size='is-fullheight'>
        <div class="container">
          <div class="columns is-centered is-mobile">
            <div class="column is-narrow">
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
                          <div class='text-center mb-6 hidden sm:block'>
                            <div
                              class='inline-flex items-center gap-1'>
                              <Abstract class='h-10 w-auto' />
                              <span
                                class='text-4xl font-black'>buss</span>
                            </div>
                          </div>
                          <div class='has-text-centered mb-6'>
                            <h1 class='title is-4'>Create your Buss Account</h1>
                            <h2 class='subtitle is-6'>You get access to all buss features free for 3 months</h2>
                          </div>
                          <Input
                            expanded
                            rules='required'
                            label='First name'
                            value={this.person.firstName}
                            onInput={(val: string) => this.person = assoc('firstName', val, this.person)} />
                          <Input
                            expanded
                            rules='required'
                            label='Last name'
                            value={this.person.lastName}
                            onInput={(val: string) => this.person = assoc('lastName', val, this.person)} />
                          <Input
                            expanded
                            rules='required|email'
                            label='Email'
                            cleaveOptions={{
                              blocks: [9999, 0],
                              lowercase: true,
                            }}
                            value={this.person.email}
                            onInput={(val: string) => this.person = assoc('email', val, this.person)} />
                          <b-button
                            expanded
                            class='mt-5'
                            size='is-medium'
                            native-type='submit'
                            type='is-primary' >
                            Create my account
                          </b-button>
                        </form>
                      ),
                    }}
                  />
                </section>
              </Card>
            </div>
          </div>
        </div>
      </Hero>
    )
  },
})
