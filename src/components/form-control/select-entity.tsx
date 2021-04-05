import {
  Entity,
  ListParams,
  Meta,
  PagedResponse,
  Predicate,
} from '@judahdonkor/chassis-client-es/types/repository'
import * as tsx from 'vue-tsx-support'
import { Mixin } from './mixin'

interface EventsWithOn {
  onInput: (val: Entity) => void
}

interface Filter {
  debounceMilliseconds?: number
  onFiltersChange(keyword: string): NonNullable<ListParams['where']>
}

const SelectEntity = tsx
  .componentFactoryOf<
    EventsWithOn,
    { default: { entity: Entity; idx: number } }
  >()
  .mixin(Mixin)
  .create({
    props: {
      value: {
        type: Object as () => Entity,
      },
      where: {
        type: Array as () => Predicate[],
        default: () => [],
      },
      filter: {
        type: Object as () => Filter,
        default: () => ({
          onFiltersChange: keyword => ([])
        } as Filter)
      },
      pageSize: {
        type: Number,
        default: 5,
      },
    },
    data() {
      return {
        loading: false,
        search: '',
        entities: [] as Entity[],
        meta: {
          lastPageNumber: 1,
          pageNumber: 1,
          pageSize: this.pageSize,
          totalCount: 0,
        } as Meta,
        hovering: null as number | null
      }
    },
    computed: {
      computedWhere(): Predicate[] {
        const where = [...this.where, ...this.filter.onFiltersChange(this.search)]
        return where
      },
    },
    // watch: {
    //   search(val) {
    //     this.loadEntities()
    //   }
    // },
    methods: {
      updateValue(val: Entity | string) {
        this.$emit('input', val)
      },
      async loadEntities() {
        this.loading = true
        try {
          const promise = this.$chassis.repos.list(this.mdl, {
            where: this.computedWhere,
            pageSize: this.meta.pageSize,
            pageNumber: this.meta.pageNumber,
          })
          const pr = await promise
          this.meta = pr.meta
          this.entities = pr.data
        } catch (error) {
          console.log(error)
          // continue regardless of error
        }
        this.loading = false
      },
      advanceEntities() {
        this.meta = Object.assign({}, this.meta, {
          pageSize: this.meta.pageSize + this.pageSize,
        })
        this.loadEntities()
      },
    },
    render() {
      return (
        <b-autocomplete
          data={this.entities}
          open-on-focus
          keep-first
          clearable
          icon={this.icon}
          icon-pack={this.iconPack}
          loading={this.loading}
          check-infinite-scroll
          value={this.search || this.value?.display}
          onInput={(val: string) => {
            if ((this.$options as any).timer) {
              clearTimeout((this.$options as any).timer)
                ; (this.$options as any).timer = null
            }
            ; (this.$options as any).timer = setTimeout(() => {
              this.search = val
              this.loadEntities()
            }, this.filter.debounceMilliseconds || 500)
          }}
          onFocus={() => {
            if (this.entities.length === 0) this.loadEntities()
          }}
          onSelect={(val: Entity) => this.$emit('input', val)}
          {...{
            on: {
              'infinite-scroll': this.advanceEntities,
            },
          }}
          scopedSlots={{
            default: ({ option, index }: any) =>
              this.$scopedSlots.default
                ? this.$scopedSlots.default({
                  entity: option,
                  idx: index,
                })
                : (
                  <div
                    onMouseover={() => this.hovering = index}
                    onMouseleave={() => this.hovering = null}>
                    <b-tooltip label={option?.display} active={index === this.hovering} always class='fixed' />
                    <span>{option?.display}</span>
                  </div>
                ),
          }}
          max-height="150px"
          append-to-body
        >
          <template slot="empty">No options for {this.search}</template>
          {this.$slots.header && (
            <template slot="header">{this.$slots.header}</template>
          )}
          {this.$slots.footer && (
            <template slot="footer">{this.$slots.footer}</template>
          )}
        </b-autocomplete>
      )
    },
  })

export { SelectEntity }
