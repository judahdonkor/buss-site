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
            The <b>Sales</b> app records the sales you've made to your customers. Customers could be indidviduals or institutions.
            </p>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Orders
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You may begin a sale with a <b>Sales Order</b>. By providing all the neccessary information regarding the sales, the <b>Sales</b> app shall be apt to process it accordingly. Thus:
            </p>
          <ul class='mt-5 pl-5 tw-text-light-onSurfaceSecondary tw-text-xl'>
            <li><p>Pulling the items from the shop</p></li>
            <li class='mt-2'><p>Reserving the items until they're picked up or delivered</p></li>
            <li class='mt-2'><p>Including bill to receivables so that you may be paid on time</p></li>
          </ul>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Invoice
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You have various options communicating the generated invoice to your customer such as:
          </p>
          <ul class='mt-5 pl-5 tw-text-light-onSurfaceSecondary tw-text-xl'>
            <li><p>Email</p></li>
            <li class='mt-2'><p>SMS</p></li>
            <li class='mt-2'><p>You could also print them out</p></li>
          </ul>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Reporting
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You also have access to reports that provide insight about your sales and receivables in real time.
            </p>
        </section>
      </div>
    )
  },
})
