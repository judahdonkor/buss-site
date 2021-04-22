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
            The <b>Accounting</b> app lets you record your business transactions and view reports that can be used by descision makers. The principal intent of the app is to
            </p>
          <ul class='mt-5 pl-5 tw-text-light-onSurfaceSecondary tw-text-xl'>
            <li><p>Provide an intuitive way to record business transactions.</p></li>
            <li class='mt-2'><p>Aggregate the recorded transactions into financial statements in real time.</p></li>
            <li class='mt-2'><p>Integrate with other apps to collate other business transactions handled separatley.</p></li>
          </ul>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Reporting
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You can also view reports about your transactions in various formats which are great for analysis
            </p>
        </section>
      </div>
    )
  },
})
