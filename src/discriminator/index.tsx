import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { assoc } from 'ramda'
import { VueConstructor } from 'vue'
import * as tsx from 'vue-tsx-support'
import { Input, Level, openForm, SelectFromEntities, SuggestedInput, ValidatedField, upload } from '~/components'
import { merge as mergePerson } from '~/person'

const mdl = 'org.judahdonkor.buss.Discriminator'

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
                  src={this.value.thumbnail || '/images/collecting.svg'}
                  ratio="192x192"
                  class='tw-w-48 tw-h-48'
                />
                {/* <figure class="image is-128x128">
                  <img
                    class="is-rounded"
                    src={this.value.thumbnail || '/images/collecting.svg'}
                  />
                </figure> */}
              </a>
            </Level>
            <Input
              rules="required"
              label="Name"
              value={this.value.name}
              onInput={(val: string) =>
                this.$emit('input', assoc('name', val, this.value))
              }
            />
            <ValidatedField label='Currency' rules='required' >
              <SuggestedInput
                options={this.$accessor.currencies.map(curr => ({
                  display: curr.name,
                  value: curr.code
                }))}
                value={this.value.currency}
                onInput={val => this.$emit('input', assoc('currency', val, this.value))} />
            </ValidatedField>
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
      : 'Adding database',
    component: Discriminator,
    title: discriminator
      ? 'Update ' + discriminator.display
      : 'Add Database',
    submitButtonLabel: discriminator
      ? 'Save'
      : 'Add',
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
export {
  mdl as mdlUser,
  merge as mergeUser
} from './user'
