import {
  Entity,
  ListParams,
  PagedResponse
} from '@judahdonkor/chassis-client-es/types/repository'
import { assoc, mergeLeft, remove, update } from 'ramda'
import * as tsx from 'vue-tsx-support'
import { Notification } from '~/mixins'
import { EventHub, Unpacked } from '~/toolkit'

interface ColumnProps {
  row: Entity
  index: number
}

type Filters = { [key in string]: string }

interface Search {
  debounceMilliseconds?: number
  onFiltersChange?(filters: Filters): NonNullable<ListParams['where']>
}

interface Ordering {
  defaultOrder?: Unpacked<NonNullable<ListParams['orderBy']>>
  onOrderChange?(orderBy: NonNullable<ListParams['orderBy']>): NonNullable<ListParams['orderBy']>
}

interface EventsWithOn {
  onEventHub(eventhub: EventHub): void
  onRowsChecked(checkedRows: { [key: string]: any }[]): void
  onList(params: ListParams): void
}

const Actions = tsx.componentFactoryOf<{
  onInput(val: number): void
}>().create({
  props: {
    value: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      rows: [5, 10, 15, 20, 25, 50, 100, 500, 1000, 5000, 0]
    }
  },
  render() {
    return (
      <div class='tw-px-6'>
        <b-field label="Rows:" horizontal>
          <b-select
            value={this.value}
            onInput={(val: number) => this.$emit('input', val)}
          >
            {this.rows.map(r => (
              <option value={r}>{r === 0 ? 'All' : r}</option>
            ))}
          </b-select>
        </b-field>

      </div>
    )
  }
})

const DataTable = tsx.componentFactoryOf<EventsWithOn>()
  .create({
    props: {
      mdl: {
        type: String,
        required: true,
      },
      initialPageSize: {
        type: Number,
        default: 5,
      },
      paginated: {
        type: Boolean,
        default: false,
      },
      where: {
        type: Array as () => NonNullable<ListParams['where']>,
        default: () => ([]),
      },
      search: {
        type: Object as () => Search,
        default: () => ({} as Search),
      },
      orderBy: {
        type: Array as () => NonNullable<ListParams['orderBy']>,
        default: () => ([]),
      },
      ordering: {
        type: Object as () => Ordering,
        default: () => ({
          defaultOrder: {
            column: 'id',
            desc: true
          }
        } as Ordering)
      },
      checkable: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        eventhub: new EventHub(),
        pagedResponse: {
          data: [],
          links: {
            first: '',
            last: '',
            next: '',
            prev: '',
            self: '',
          },
          meta: {
            pageNumber: 1,
            pageSize: this.initialPageSize,
            totalCount: this.initialPageSize,
            lastPageNumber: 1,
          },
        } as PagedResponse,
        checkedRows: [] as { [key: string]: any }[],
        pageSize: this.initialPageSize,
        filter: {} as Filters,
        loading: false,
        order: [this.ordering.defaultOrder] as NonNullable<ListParams['orderBy']>
      }
    },
    computed: {
      computedPageSize(): number | undefined {
        if (this.paginated)
          if (this.pageSize !== 0)
            return this.pageSize
        return undefined
      }
    },
    watch: {
      orderBy() {
        this.list()
      },
      where() {
        this.list()
      },
      mdl() {
        this.list()
      },
      pageSize() {
        this.list()
      },
      paginated() {
        this.list()
      },
    },
    created() {
      this.$emit('eventHub', this.eventhub)
      this.list()
    },
    mounted() {
      this.eventhub.onRefresh(this.list)
    },
    beforeDestroy() {
      this.eventhub.offRefresh(this.list)
    },
    methods: {
      async list(val: ListParams = {}) {
        // defaults
        const params = mergeLeft<ListParams, ListParams>(val, {
          pageNumber: 1,
          pageSize: this.computedPageSize,
        })
        // where
        params.where = [...(params.where || []), ...this.where, ...(this.search.onFiltersChange
          ? this.search.onFiltersChange(this.filter)
          : [])]
        // orderBy
        params.orderBy = [...(params.orderBy || []), ...this.orderBy, ...(this.ordering.onOrderChange
          ? this.ordering.onOrderChange(this.order)
          : this.order)]
        this.loading = true
        this.pagedResponse = assoc('data', [], this.pagedResponse)
        try {
          this.pagedResponse = await this.$chassis.repos.list(this.mdl, params)
        } catch (error) {
          this.$notifyError(error)
        }
        this.loading = false
        // emit
        this.$emit('list', params)
      },
      onSortingPriorityRemoved(column: string) {
        const idx = this.order.findIndex(({ column: col }) => col === column)
        if (idx !== -1)
          this.order = remove(idx, 1, this.order)
        this.list()
      },
      onSort({ column, desc }: Unpacked<NonNullable<ListParams['orderBy']>>) {
        const idx = this.order.findIndex(({ column: col }) => column === col)
        if (idx === -1)
          this.order.push({
            column,
            desc
          })
        else
          this.order = update(idx, {
            column,
            desc: !this.order[idx].desc
          }, this.order)
        this.list()
      },
    },
    render() {
      return (
        <b-table
          class='data-table'
          scrollable
          striped
          hoverable
          data={this.pagedResponse.data}
          paginated={this.paginated}
          total={this.pagedResponse.meta.totalCount}
          per-page={this.computedPageSize || this.pagedResponse.meta.totalCount}
          backend-pagination
          backend-filtering={this.search.onFiltersChange !== undefined}
          debounce-search={this.search.debounceMilliseconds || 500}
          backend-sorting
          sort-multiple
          sort-multiple-data={this.order.map(({ column: field, desc }) => ({
            field,
            order: desc
              ? 'desc'
              : 'asc'
          }))}
          onSort={(column: string, order: string) => this.onSort({
            column,
            desc: order === 'desc'
          })}
          default-sort={[this.ordering.defaultOrder?.column, this.ordering.defaultOrder?.desc
            ? 'desc'
            : 'asc']}
          default-sort-direction='desc'
          pagination-position='both'
          checkable={this.checkable}
          checked-rows={this.checkedRows}
          // loading={this.loading}
          onCheck={(cl: any) => {
            this.checkedRows = cl;
            this.$emit("rowsChecked", this.checkedRows);
          }}
          {...{
            on: {
              'page-change': (pageNumber: number) => this.list({ pageNumber }),
              'filters-change': (filter: any) => {
                this.filter = filter
                this.list()
              },
              'sorting-priority-removed': (column: string) => this.onSortingPriorityRemoved(column)
            },
          }}
        >
          {this.$slots.default}
          <div slot='empty' class='has-text-centered tw-py-6'>
            <b-icon
              icon={this.loading ? 'spinner' : 'frown'}
              type='is-primary'
              size="is-large"
              custom-class={this.loading ? 'fa-pulse' : ''}
            />
            <p>{this.loading
              ? 'Fetching data'
              : 'No data found'}</p>
          </div>
          <Actions
            slot='bottom-left'
            value={this.pageSize}
            onInput={val => this.pageSize = val}
          />
          <Actions
            slot='top-left'
            value={this.pageSize}
            onInput={val => this.pageSize = val} />
        </b-table>
      )
    },
  })

export { DataTable, ColumnProps }
