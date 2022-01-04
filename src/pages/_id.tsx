import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import * as tsx from 'vue-tsx-support'
import {
  Breadcrumb,
  Level,
} from '~/components'
import { merge } from '~/commitment'
import { Dialog } from '~/mixins'
import { EventHub } from '~/toolkit'

export default tsx.componentFactory
  .mixin(Dialog)


  .create({
    layout: 'commitment',
    data() {
      return {
        tableEventHub: null as EventHub | null,
        active: true,
      }
    },
    render() {
      return (
        <div>
          <section class="section has-light-border-bottom has-default-padding-top-bottom">
            <Level>
              <Breadcrumb slot="left" size="is-large">
                <nuxt-link to='/'>Home</nuxt-link>
                <nuxt-link to={`/${this.disc.id}`}>Apps</nuxt-link>
                <nuxt-link to={`/inv/${this.disc.id}`}>Dashboard</nuxt-link>
              </Breadcrumb>
            </Level>
            <b-button class="is-info" onClick={() => merge({
              ctx: this,
              client: this.cl!,
              fullScreen: true
            })}>
              Create New Commitment
            </b-button>
          </section>
        </div>
      )
    },
  })
