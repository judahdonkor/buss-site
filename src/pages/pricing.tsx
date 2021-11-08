import * as tsx from 'vue-tsx-support'
import { AppCard, DataTableColumnProps, Strip } from '~/components'
import numeral from 'numeral'

const Total = tsx.component({
  props: {
    value: {
      type: Array as () => { label: string, value: number }[],
      required: true
    }
  },
  render() {
    return (
      <div>
        <b-table
          data={this.value}
          striped
          hoverable
          mobile-cards={false}>
          <b-table-column
            scopedSlots={{
              default: ({ row }: DataTableColumnProps) => row?.label,
            }} />
          <b-table-column
            numeric
            scopedSlots={{
              default: ({ row }: DataTableColumnProps) => (
                <div><span>{numeral(row?.value).format('0,0.00')} </span>USD<span></span></div>
              )
            }} />
        </b-table>
        <b-button
          class='tw-mt-5'
          type='is-primary'
          expanded
          tag="nuxt-link"
          to='/sign-up'>
          {this.$t('cta')}
        </b-button>
      </div>
    )
  }
})

const App = tsx.componentFactoryOf<{
  onInput: (val: boolean) => void
}>().create({
  props: {
    value: Boolean,
    label: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  render() {
    return (
      <div class='tw-flex tw-items-center tw-justify-between tw-gap-6' onClick={() => this.$emit('click')}>
        <div class='' >
          <img
            class='tw-w-12 tw-h-12'
            src={this.thumbnail}
            alt="image" />
        </div>
        <div class='tw-flex-1'>
          <p class='tw-text-light-onSurfacePrimary tw-font-black tw-text-lg'>{this.label}</p>
          <p class='tw-text-light-onSurfaceSecondary'>{numeral(this.rate).format('0,0.00')} USD / month</p>
        </div>
        <b-field>
          <b-checkbox
            value={this.value}
            nativeOnClick={(e: Event) => e.preventDefault()} />
        </b-field>
      </div>
    )
  }
})

const ratePerUser = 8

export default tsx.component({
  data() {
    return {
      users: 1,
      apps: [] as string[]
    }
  },
  computed: {
    computedApps(): any[] {
      return Object
        .entries(this.$t('apps'))
        .filter(([key]) => this.apps.includes(key));
    }
  },
  render() {
    return (
      <div>
        <div class="tw-container tw-py-6">
          <h1 class='tw-text-light-onSurfacePrimary tw-text-3xl tw-font-black sm:tw-text-5xl has-text-centered-mobile'>
            {this.$t('pages.pricing.title')}
          </h1>
        </div>
        <div class='tw-container tw-flex tw-flex-col tw-gap-6 md:tw-flex-row'>
          <div class='tw-flex-1'>
            <div>
              <h2 class='title tw-text-light-onSurfacePrimary tw-font-black tw-text-2xl sm:tw-text-4xl'>
                {this.$t('pages.pricing.users')}
              </h2>
              <h2 class='subtitle tw-text-light-onSurfaceSecondary sm:tw-text-xl lg:tw-text-2xl'>
                {`${numeral(ratePerUser).format('0,0.00')} USD/user/month`}
              </h2>
              <b-numberinput
                controls-position="compact"
                class='tw-w-40'
                value={this.users}
                onInput={(val: number) => this.users = val} />
            </div>
            <div class="tw-my-16">
              <h2 class='tw-text-light-onSurfacePrimary tw-font-black tw-text-2xl sm:tw-text-4xl'>
                {this.$t('pages.pricing.apps')}
              </h2>
              <div class='pt-6 tw-grid tw-gap-6 tw-grid-cols-1 sm:tw-grid-cols-2 xl:tw-grid-cols-3'>
                {Object.entries(this.$t('apps')).map(([key, { label, description, thumbnail, ratePerMonth }], idx) => (
                  <App
                    class={`tw-bg-light-elevatedSurface tw-p-2 tw-rounded-md tw-shadow-sm hover:tw-shadow-md tw-transition tw-duration-150 tw-ease-in-out tw-cursor-pointer`}
                    label={label}
                    rate={ratePerMonth}
                    thumbnail={thumbnail}
                    value={this.apps.includes(key)}
                    onClick={() => {
                      if (this.apps.includes(key))
                        this.$delete(this.apps, this.apps.findIndex(e => e === key))
                      else
                        this.apps.push(key)
                    }} />
                ))}
              </div>
            </div>
          </div>
          <Total
            class='tw-pb-16'
            slot='end'
            value={[
              {
                label: `${this.users} Users`,
                value: this.users * ratePerUser
              },
              {
                label: `${this.computedApps.length} Apps`,
                value: this.computedApps
                  .map(([key, { ratePerMonth }]) => Number(ratePerMonth))
                  .reduce((prev, curr) => prev + curr, 0)
              },
              {
                label: 'Total / month',
                value: (this.users * ratePerUser) + this.computedApps
                  .map(([key, { ratePerMonth }]) => Number(ratePerMonth))
                  .reduce((prev, curr) => prev + curr, 0)
              }
            ]} />
        </div>
      </div>
    )
  }
})
