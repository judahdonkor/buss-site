import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { options } from 'numeral'
import { assoc } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { Input, Level, openForm } from '~/components'

const mdl = 'org.judahdonkor.buss.Commitment'

const db = ['Acounting','Sales','Inventory','HR & Payroll','Finance']
const monthOptions = [3, 6, 9, 12]
const Discriminator = tsx
  .componentFactoryOf<{ onInput: (country: Entity) => void }>()
  .create({
    props: {
      value: {
        type: Object as () => Entity,
        default: () => ({} as Entity),
      },

    },
    data() {
      return {
        inputValue: ""
      }
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
                  db.map(item => <option value={item} onChange={(e) => e.target.value}>{item}</option>)
                }
              </b-select>
            </b-field>
            <b-field label="Select Period" class="p-4">
              <b-select placeholder="Select a month">
                {
                  monthOptions.map(item => (<option value={item} onChange={(e) => e.target.value}>{item === 0 ? 3 : item}</option>))
                }
              </b-select>
            </b-field>
            <b-field label="Enter Amount" class="p-4" style={{ width: "300px" }}>
              <b-input
                type='number'
                value={this.inputValue}
                onInput={(val: number) => this.$emit('input', val)}
              ></b-input>
            </b-field>
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
