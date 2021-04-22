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
            The <b>HR & Payroll</b> app provides a seamless way to manage your employees and run payroll.
            </p>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Payroll
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            The app provides an easy way to do the following when running payrolls
          </p>
          <ul class='mt-5 pl-5 tw-text-light-onSurfaceSecondary tw-text-xl'>
            <li><p>Widthhold all applicable deductions from employees</p></li>
            <li class='mt-2'><p>Compute contributions and benefit expenses</p></li>
            <li class='mt-2'><p>Track payables to employees, tax agencies and other institutions</p></li>
          </ul>
          <h1 class='tw-text-light-onSurfacePrimary tw-text-4xl tw-font-black mt-6'>
            Reporting
            </h1>
          <p class='tw-text-light-onSurfaceSecondary tw-text-xl'>
            You also have access to reports that provide insight about your employees and related expenses.
            </p>
        </section>
      </div>
    )
  },
})
