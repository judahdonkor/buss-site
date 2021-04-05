import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import moment from 'moment'
import { assoc } from 'ramda'
import { VueConstructor } from 'vue'
import * as tsx from 'vue-tsx-support'
import { Phone } from './phone'
import { Card, Input, Level, openForm, SelectEnum, upload } from '~/components'

type Data = Record<'modalFullScreen', boolean>

const Preferences = tsx
    .componentFactoryOf<{
        onInput: (preferences: Entity) => void
    }>()
    .create({
        props: {
            value: {
                type: Object,
                default: () => ({}),
            },
        },
        render() {
            return (
                <section>
                    <Card>
                        <p slot='title'>Modal</p>
                        <b-field grouped>
                            <div class="field is-">
                                <b-switch
                                    type="is-primary"
                                    value={this.value.modalFullScreen}
                                    onInput={(val: boolean) => this.$emit('input', assoc(
                                        'modalFullScreen',
                                        val,
                                        this.value
                                    ))}
                                >
                                    Full screen
                  </b-switch>
                            </div>
                        </b-field>
                    </Card>
                </section>
            )
        },
    })

const merge = (
    ctx: VueConstructor extends VueConstructor<infer U> ? U : never,
    value: Data = {
        modalFullScreen: false
    }
) =>
    openForm<Data>(ctx, {
        component: Preferences,
        title: 'Preferences',
        submitButtonLabel: 'Save',
        value,
        // persist: (val) => ctx.$accessor.setPersonPreference(val),
    })

export { Preferences, merge, Data }
