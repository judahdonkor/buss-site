import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import moment from 'moment'
import { assoc } from 'ramda'
import { VueConstructor } from 'vue'
import * as tsx from 'vue-tsx-support'
import { Phone } from './phone'
import { Input, Level, openForm, SelectEnum, upload } from '~/components'

const mdl = 'org.judahdonkor.buss.Person'
const mdlGender = 'org.judahdonkor.buss.Person$Gender'

const Person = tsx
  .componentFactoryOf<{
    onInput: (person: Entity) => void
  }>()
  .create({
    props: {
      value: {
        type: Object as () => Entity,
        default: () => ({} as Entity),
      },
      doNotInferPerson: Boolean,
    },
    methods: {
      async updateContact(person: Entity) {
        this.$emit(
          'input',
          this.doNotInferPerson
            ? person
            : (await this.$chassis.repos.find(mdl, {
              type: 'OR',
              restrictions: [
                {
                  type: 'EQUAL',
                  params: {
                    x: 'email',
                    y: person.email || '',
                  },
                },
                {
                  type: 'EQUAL',
                  params: {
                    x: 'phone',
                    y: person.phone || '',
                  },
                },
              ],
            })) || person
        )
      },
    },
    render() {
      return (
        <section>
          <Level>
            <a
              onClick={async () => {
                try {
                  this.$emit(
                    'input',
                    assoc(
                      'photo',
                      await upload(
                        this,
                        this.$accessor.bussDisc!,
                        'pers-photo'
                      ),
                      this.value
                    )
                  )
                } catch (error) { }
              }}
            >
              <b-image
                rounded
                src={
                  this.value.photo ||
                  (this.value.gender === 'FEMALE'
                    ? '/images/female_avatar.svg'
                    : '/images/male_avatar.svg')
                }
                ratio="32x32"
                style={{
                  width: '128px',
                  height: '128px',
                }}
              />
            </a>
          </Level>
          <Input
            rules="email"
            label="Email address (optional)"
            message="We'll use it to identify you"
            cleaveOptions={{
              blocks: [9999, 0],
              lowercase: true,
            }}
            value={this.value.email}
            onInput={(val: string) => {
              if ((this.$options as any).timer) {
                clearTimeout((this.$options as any).timer)
                  ; (this.$options as any).timer = null
              }
              ; (this.$options as any).timer = setTimeout(
                () => this.updateContact(assoc('email', val, this.value)),
                800
              )
            }}
          />
          <b-field
            label="Phone number (optional)"
            message="We'll use it to identify you">
            <Phone
              value={this.value.phone}
              onInput={(val: string) => {
                if ((this.$options as any).timer) {
                  clearTimeout((this.$options as any).timer)
                    ; (this.$options as any).timer = null
                }
                ; (this.$options as any).timer = setTimeout(
                  () => this.updateContact(assoc('phone', val, this.value)),
                  800
                )
              }}
            />
          </b-field>
          <Input
            label="First name"
            rules="required"
            class="is-"
            value={this.value.firstName}
            onInput={(val: string) =>
              this.$emit('input', assoc('firstName', val, this.value))
            }
          />
          <Input
            label="Last name"
            rules="required"
            class="is-"
            value={this.value.lastName}
            onInput={(val: string) =>
              this.$emit('input', assoc('lastName', val, this.value))
            }
          />
          <b-field
            label="Your birthday (optional)"
            message="Some services require this" >
            <b-datepicker
              append-to-body
              value={
                this.value.dob ? moment(this.value.dob).toDate() : undefined
              }
              onInput={(val: Date) =>
                this.$emit(
                  'input',
                  assoc('dob', moment(val).format('YYYY-MM-DD'), this.value)
                )
              }
            />
          </b-field>
          <SelectEnum
            label="Gender (optional)"
            message="We'll use it to personalize your content"
            mdl={mdlGender}
            value={this.value.gender}
            onInput={(val: string) =>
              this.$emit('input', assoc('gender', val, this.value))
            }
          />
        </section>
      )
    },
  })

const merge = (
  ctx: VueConstructor extends VueConstructor<infer U> ? U : never,
  value: Entity = {}
) =>
  openForm<Entity>(ctx, {
    component: Person,
    title: value?.display || 'Person',
    submitButtonLabel: 'Save',
    value,
    persist: (val) => ctx.$chassis.repos.merge(mdl, val),
  })

export { mdl, mdlGender, Person, merge, Phone }
export { Data as Preferences, merge as mergePreferences } from './preferences'
