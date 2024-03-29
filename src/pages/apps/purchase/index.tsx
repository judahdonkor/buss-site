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
            The <b>Purchase</b> app provides a seamless way to make purchases from suppliers. Suppliers could be indidviduals or institutions.
            </p>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Orders
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You may begin a purchase with a <b>Purchase Order</b>. By providing all the neccessary information regarding the puchase, the <b>Purchase</b> app shall be apt to process it accordingly. Thus:
            </p>
          <ul class='mt-5 pl-5 tw-text-light-onSurfaceSecondary tw-text-xl'>
            <li><p>Receiving the items to the receiving stockroom </p></li>
            <li class='mt-2'><p>Temporarily updating the pipeline until items arrive</p></li>
            <li class='mt-2'><p>Including bill to payables so that it may be settled in time</p></li>
          </ul>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Reporting
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You also have access to reports that provide insight about your purchases and payables in real time.
            </p>
        </section>
      </div>
    )
  },
})
