import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { Database } from '@nuxt/content'
import { options } from 'numeral'
import { assoc } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { mdl as mdlDiscriminator } from '~/discriminator'
import { Input, Level, openForm, ValidatedField, SuggestedInput, SuggestedInputOption, SelectEntity } from '~/components'

const mdl = 'org.judahdonkor.buss.Commitment'

const db = ['Acounting', 'Sales', 'Inventory', 'HR & Payroll', 'Finance']
const monthOptions: SuggestedInputOption[] = [
  {
    value: '3',
    display: '3 months'
  },
  {
    value: '12',
    display: '1 year'
  }
]
const Discriminator = tsx
  .componentFactoryOf<{ onInput: (country: Entity) => void }>()
  .create({
    props: {
      value: {
        type: Object as () => Entity,
        default: () => ({} as Entity),
      },

    },

    render() {
      return (
        <div>
          {/* <section class='section'>*/}
          <div class="tw-container">
            <Level>
              <b-image
                rounded
                src={"images/commitment.svg"}
                ratio="192x192"
                class='tw-w-48 tw-h-48'
              />
              {/* <figure class="image is-128x128">
                  <img
                    class="is-rounded"
                    src={this.value.thumbnail || '@/assets/illustration/commitment.svg'}
                  />
                </figure> */}
            </Level>
            <ValidatedField label='Select Period' 
            // rules="required"
            >
              <SuggestedInput
                options={monthOptions}
                value={this.value.periodInmonth}
                onInput={val => {
                  this.$emit(
                    'input',
                    assoc(
                      'periodInMonth',
                      Number(val),
                      this.value
                    )
                  )
                }} />
            </ValidatedField>
            <ValidatedField
              label='Select Database' >
              <SelectEntity
                mdl={mdlDiscriminator}
                value={this.value.descriminator}
                onInput={val => this.$emit('input', assoc('discriminator', val, this.value))} />
            </ValidatedField>
            <Input
              label="Enter Amount"
              cleaveOptions={{
                numeral: true,
                numeralPositiveOnly: true,
              }}
              value={String(this.value.amount || '')}
              onInput={val =>
                this.$emit('input', assoc('amount', Number(val), this.value))
              }
            />
          </div>
          {/* </section> */}
        </div >
      )
    },
  })

interface Params {
  ctx: Vue
  client: Entity
  commitment?: Entity
  fullScreen?: boolean
}

const merge = ({
  ctx,
  client,
  commitment,
  fullScreen
}: Params) =>
  openForm<Entity>(ctx, {
    fullScreen,
    loadingMessage: commitment
      ? 'Updating ' + commitment.display
      : 'creating your commitment',
    component: Discriminator,
    title: commitment
      ? 'Update ' + commitment.display
      : 'Create Commitment',
    submitButtonLabel: commitment
      ? 'Save'
      : 'Submit',
    value: commitment,
    persist: async (val) => {
      alert(JSON.stringify(val))
      // ctx.$chassis.repos.merge(
      //   mdl,
      //   Object.assign({
      //     client
      //   }, val)
      // )
    }
  })

export { mdl, merge, Discriminator }
