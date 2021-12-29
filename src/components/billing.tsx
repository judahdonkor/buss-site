import * as tsx from 'vue-tsx-support'

export const Billing = tsx.component({
  data() {
    return {
      databaseDummy: [
        { id: 101, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 102, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 103, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 104, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 105, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },
        { id: 106, date: 'Aug 21,2021', customer: 'Shadrack mensah', Account: 'Cash', billDue: 'Aug 21,2021', processing: 'fetch for customer', explanation: 'Clean up  -Stock sold-final Batch(21-Aug-2021' },

      ],
      tableHeadings: [
        { title: 'ID' },
        { title: 'Date' },
        { title: 'Customer' },
        { title: 'Account' },
        { title: 'Bill due on' },
        { title: 'Proccessing' },
        { title: 'Explanation' }

      ]
    }
  },
  render() {
    return (
      <section class="tw-container box mt-5 tw-overflow-scroll">
        <h2 class="title is-size-2 p-4"> Billing</h2>
        <div class="is-flex is-justify-content-space-between p-4">
          <div class="control is-flex  p-3">
            <b-radio name="settled" native-value="settled" class="is-medium mr-3">
              Settled
            </b-radio>
            <b-radio name="outstanding" native-value="outstanding" class="is-medium">
              Outstanding
            </b-radio>
          </div>
          <div class="pagination">
            <nav class="pagination is-right" role="navigation" aria-label="pagination">
              <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Page 5" aria-current="page">5</a></li>
                <li><a class="pagination-link is-current" aria-label="Goto page 86">{this.databaseDummy.length}</a></li>
              </ul>
              <a class="pagination-previous"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
              <a class="pagination-next"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
            </nav>
          </div>
        </div>
        <b-field label="Row" class="pl-4 pb-4">
          <b-select placeholder="Select a row">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </b-select>
        </b-field>

        <table class='table is-fullwidth has-text-centered'>
          <tr>
            {
              this.tableHeadings.map(item => <th>{item.title}</th>)
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
          <b-field label="Row" class="pl-4">
            <b-select placeholder="Select a row">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="15">15 per page</option>
              <option value="20">20 per page</option>
            </b-select>
          </b-field>

          <div class="pagination">
            <nav class="pagination is-right" role="navigation" aria-label="pagination">
              <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Page 5" aria-current="page">5</a></li>
                <li><a class="pagination-link is-current" aria-label="Goto page 86">{this.databaseDummy.length}</a></li>
              </ul>
              <a class="pagination-previous"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
              <a class="pagination-next"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
            </nav>
          </div>
        </div>

      </section>
    )
  }
})


