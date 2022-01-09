import moment from 'moment'
import * as tsx from 'vue-tsx-support'
import { mdl, merge } from '~/commitment'
import {
  Breadcrumb,
  Card,
  DataTable,
  DataTableColumnProps,
  Level
} from '~/components'
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
          <section class="section has-default-padding-top">
            <Card class="has-table">
              {/* <b-switch
                type="is-primary"
                value={this.active}
                onInput={(val: boolean) => (this.active = val)}
              >
                Active
              </b-switch> */}
              <div class="control is-flex  p-3 pb-5">
                <b-radio-button 
                type 
                >
                  Current
                </b-radio-button>
                <b-radio-button name="outstanding" native-value="outstanding" class="is-medium">
                  Pending
                </b-radio-button>
              </div>
              <DataTable
                paginated
                mdl={mdl}
                where={[
                  {
                    type: 'EQUAL',
                    params: {
                      x: 'active',
                      y: this.active,
                    },
                  },
                ]}
                onEventHub={(eventhub) => (this.tableEventHub = eventhub)}
              >
                <b-table-column
                  label="ID"
                  numeric
                  scopedSlots={{
                    default: ({ row }: DataTableColumnProps) => row?.id,
                  }}
                />
                <b-table-column
                  label="Date"
                  scopedSlots={{
                    default: ({ row }: DataTableColumnProps) =>
                      moment(row.createdAt).format('ll'),
                  }}
                />
                <b-table-column
                  label="Database"
                  scopedSlots={{
                    default: ({ row }: DataTableColumnProps) => row.descriminator,
                  }}
                />
                <b-table-column
                  label="Period of Month"
                  numeric
                  scopedSlots={{
                    default: ({ row }: DataTableColumnProps) => row.periodInMonth,
                  }}
                />
                <b-table-column
                  label="Amount"
                  numeric
                  scopedSlots={{
                    default: ({ row }: DataTableColumnProps) => row.amount,
                  }}
                />


                {/* <b-table-column
                  numeric
                  scopedSlots={{
                    default: ({ row }: DataTableColumnProps) => (
                      <div class="buttons has-addons is-right">
                        {!row.active && (
                          <b-button
                            icon-left="edit"
                            onClick={() => this.merge(row)}
                          />
                        )}
                        <b-button
                          onClick={async () => {
                            try {
                              await confirmReceive({ ctx: this, receive: row, fullScreen: true })
                              this.$notify({
                                context: 'Receipt',
                                message: `${row.active ? 'Deactivated' : 'Activated'
                                  } ${row.display}`,
                                state: 'success',
                              })
                              this.tableEventHub?.refresh()
                            } catch (error) {
                              this.$notifyError(error)
                            }
                          }}
                        >
                          {row.active ? 'Deactivate' : 'Activate'}
                        </b-button>
                      </div>
                    ),
                  }}
                /> */}
              </DataTable>
            </Card>
          </section>
        </div>
      )
    },
  })
