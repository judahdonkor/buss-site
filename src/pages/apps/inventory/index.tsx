import { groupBy } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { AppCard } from '~/components'
import { App } from '~/layouts/app'

export default tsx.component({
  layout: 'app',
  render() {
    return (
      <div>
        <section
          class='tw-container tw-py-12'>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            The Inventory app lets you organize and track your inventory from the time you ordered them till you sell, return or dispose of the items. You may define stockrooms where your products shall be kept.
            </p>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Tracking
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            The Inventory app orgainzes and tracks your products automatically. All you need to do is provide information about your operations using the following actions.
            </p>
          <ul class='mt-5 pl-5 tw-text-light-onSurfaceSecondary tw-text-xl'>
            <li><p>The <b>Receive</b> action is used to record the receipt of products in your stockroom</p></li>
            <li class='mt-2'><p>The <b>Pull</b> action lets you take out or pull products from your stockroom.</p></li>
            <li class='mt-2'><p>The <b>Move</b> action is a compound action that lets you move products between two stockrooms by way of a <b>Pull</b> and <b>Receive</b> action.</p></li>
          </ul>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Reporting
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You also have access to reports that provide insight about your inventory in real time.
            </p>
        </section>
      </div>
    )
  },
})
