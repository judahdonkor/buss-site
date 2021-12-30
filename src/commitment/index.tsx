import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import * as tsx from 'vue-tsx-support'
import { Level, openForm } from '~/components'

const mdl = 'org.judahdonkor.buss.Discriminator'
const db = [
  { id: 101, title: 'Acounting' },
  { id: 102, title: 'Sales' },
  { id: 103, title: 'Inventory' },
  { id: 104, title: 'HR & Payroll' },
  { id: 105, title: 'Finance' }
]
const monthOptions = [
  { id: 1, numberOfMonths: '3 months' },
  { id: 1, numberOfMonths: '6 months' },
  { id: 1, numberOfMonths: '9 months' },
  { id: 1, numberOfMonths: 'year' }
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
            <b-field label="Select Database" class="p-4">
              <b-select placeholder="Select a Database">
                {
                  db.map(item => <option  value={item.id} onChange={(e)=>e.target.value}>{item.title}</option>)
                }
              </b-select>
            </b-field>
            <b-field label="Select Period" class="p-4">
              <b-select placeholder="Select a month">
                {
                  monthOptions.map(item => <option value={item.id} onChange={(e)=>e.target.value}>{item.numberOfMonths}</option>)
                }
              </b-select>
            </b-field>
          </div>
          {/* </section> */}
        </div >
      )
    },
  })

interface Params {
  ctx: Vue
  client: Entity
  discriminator?: Entity
  fullScreen?: boolean
}

const merge = ({
  ctx,
  client,
  discriminator,
  fullScreen
}: Params) =>
  openForm<Entity>(ctx, {
    fullScreen,
    loadingMessage: discriminator
      ? 'Updating ' + discriminator.display
      : 'creating your commitment',
    component: Discriminator,
    title: discriminator
      ? 'Update ' + discriminator.display
      : 'Create Commitment',
    submitButtonLabel: discriminator
      ? 'Save'
      : 'Submit',
    value: discriminator,
    persist: (val) =>
      ctx.$chassis.repos.merge(
        mdl,
        Object.assign({
          client
        }, val)
      ),
  })

export { mdl, merge, Discriminator }
