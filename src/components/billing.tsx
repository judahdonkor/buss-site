import * as tsx from 'vue-tsx-support'
import { merge } from '@/commitment'




export const Billing = tsx.component({
  data() {
    return {
      value: "" as String,

      databaseDummy: [
        { id: 101, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 102, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 103, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 104, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 105, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 106, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },

      ],
      tableHeadings: ['ID', 'Date', 'Customer', 'Account', 'Bill due on', 'Proccessing', 'Explanation'],
      rows: [5, 10, 15, 20, 25, 50, 100, 500, 1000, 5000, 0]
    }
  },
  render() {
    return (
      <section class="tw-container box mt-5 tw-overflow-scroll">
        <div class="is-flex is-justify-content-space-between p-4">
          <h2 class="title is-sizee-2 ">Billing</h2>
          <b-button
            class="is-medium"
            onClick={() => merge({
              ctx: this,
              client: this.cl!,
              fullScreen: true
            })}
          >
            <i class="fa fa-handshake mr-2 is-medium"></i>
            Commitment
          </b-button>
        </div>
        <div class="control is-flex  p-3 pb-5">
          <b-radio-button name="settled" native-value="settled" class="is-medium">
            Settled
          </b-radio-button>
          <b-radio-button name="outstanding" native-value="outstanding" class="is-medium">
            Outstanding
          </b-radio-button>
        </div>
        <div class="is-flex is-justify-content-space-between p-4">
          <div>
            <b-field label="Rows: " horizontal>
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
          <div class="pagination">
            <b-pagination class="is-medium"></b-pagination>
          </div>
        </div>
        <table class='table is-fullwidth has-text-centered'>
          <tr>
            {
              this.tableHeadings.map(item => <th>{item}</th>)
            }
          </tr>
          {
            this.databaseDummy.map(item => (
              <tr>
              <td >{item.id}</td>
              <td >{item.date}</td>
              <td >{item.customer}</td>
              <td >{item.Account}</td>
              <td>{item.billDue}</td>
              <td >{item.processing}</td>
              <td >{item.explanation}</td>
              <td><button class='button'>Deactivate</button></td>
              <td><button class='button'>Invoice</button></td>
            </tr>
            ))
          }

        </table>
        <div class="is-flex is-justify-content-space-between p-4">
          <b-field label="Rows: " horizontal>
            <b-select
              value={this.value}
              onInput={(val: String) => this.$emit('input', val)}
            >
              {this.rows.map(r => (
                <option value={r}>{r === 0 ? 'All' : r}</option>
              ))}
            </b-select>
          </b-field>

          <div class="pagination">
            <b-pagination class="is-medium"></b-pagination>
          </div>
        </div>
      </section>
    )
  }
})


