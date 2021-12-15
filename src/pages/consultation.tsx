import '@/assets/css/consult.css'
import * as tsx from 'vue-tsx-support'

export const Data_list = {

    m_heading: 'Drive a successfull implementation with our help',
    s_heading: "Fill in the pricing page to have a recommendation about the right pack according to your businesss needs",
    table_heading: {
        basic: 'Basic',
        standard: "Standard",
        custom: 'Custom',
        pro: 'Pro',
        Desc: [
            { title: 'Simple Apps' },
            { title: "Advanced Apps,Data Import" },
            { title: 'Advanced Apps,Data import, Customisation' },
            { title: 'Advanced Apps,Data import, Customisation' }],
    },
    table_content: {
        heading1: 'Dedicated Customer',
        heading2: '25 hours',
        heading3: '50 hours',
        heading4: '100 hours',
        heading5: '200 hours'
    },

    tabel_list: [
        { title: 'Project Management', icon: 'fa fa-check' },
        { title: 'Email + Phone Support', icon: 'fa fa-check' },
        { title: 'Training & Coaching', icon: 'fa fa-check' },
        { title: 'Configuration', icon: 'fa fa-check' },
        { title: 'Data Importation Assistance', icon: 'fa fa-check' },
        { title: 'Onsite consulting', icon: 'fa fa-check' }
    ],

    customisation: {
        heading: [
            { title: 'Application Customisation', icon: '' },
            { title: 'Customisations(Forms,Report,workflows)', icon: 'fa fa-check' },
            { title: 'Development', icon: 'fa fa-times' },

        ],
        icons: [
            { title: '' },
            { title: 'fa fa-check' },
            { title: 'fa fa-check' }],

        title: {
            title_list1: 'Returning Customers',
            title_list2: 'New Customers(15% off)'
        },
        pricing: {
            amount1: '$ 1,150.00 USD',
            amount2: '$ 2,240.00 USD ',
            amount3: '$ 3,400.00 USD',
            amount4: '$ 8,000.00 USD '
        },

        newCostumerPricing: {
            amount1: '$ 977.50 USD',
            amount2: '$ 1,904.00 USD',
            amount3: '$ 3,400.00 USD ',
            amount4: '$ 6,800.00 USD '
        }

    }
}

const Content = tsx.component({
    props: {
        heading: {
            type: String,
            required: true
        },
        sub_heading: {
            type: String,
            required: true
        },

    },


    render() {

        return (
            <div class='has-text-left'>

                <div class='hero'>
                    <div class='hero-body'>
                        <h1 class='title is-size-2 has-text-dark'>
                            {this.heading}
                        </h1>
                        <h2 class='subtitle is-size-5 pt-4 pb-4'>
                            {this.sub_heading}
                        </h2>
                    </div>
                </div>
            </div>
        )
    }


})


export default tsx.component({

    render() {
        return (
            <div class='container p-6 '>
                <Content
                    heading={Data_list.m_heading}
                    sub_heading={Data_list.s_heading}
                />
                <div class='tw-overflow-scroll'>
                    <table class=' table is-striped p-6 has-text-centered is-borederd '>
                        <thead>
                            <tr>
                                <th></th>
                                <th class='has-background-info has-text-white '>{Data_list.table_heading.basic}</th>
                                <th class='has-background-danger has-text-white'>{Data_list.table_heading.standard}</th>
                                <th class='has-background-dark has-text-white'>{Data_list.table_heading.custom}</th>
                                <th class='has-background-primary has-text-white'>{Data_list.table_heading.pro}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class='p-5 has-text-left'>Recommend for: </td>
                                {
                                    Data_list.table_heading.Desc.map((item) => <td class='p-5'>{item.title}</td>)
                                }

                            </tr>

                            <tr>
                                <td class='has-text-left i has-text-weight-bold'>{Data_list.table_content.heading1}</td>
                                <td class='has-background-info  has-text-white'>{Data_list.table_content.heading2}</td>
                                <td class='has-background-danger has-text-white'>{Data_list.table_content.heading3}</td>
                                <td class='has-background-dark has-text-white'>{Data_list.table_content.heading4}</td>
                                <td class='has-background-primary has-text-white'>{Data_list.table_content.heading5}</td>
                            </tr>
                            <tr>

                                <td> {
                                    Data_list.tabel_list.map((item) => <div class='list'>

                                        <ul>
                                            <div class='list-tem'>
                                                <p class='pt-4 pb-4 has-text-left'>{item.title}</p>
                                            </div>
                                        </ul>
                                    </div>)
                                }
                                </td>

                                <td>
                                    {
                                        Data_list.tabel_list.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 has-text-link'><i class={item.icon}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.tabel_list.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 p-4 has-text-danger'><i class={item.icon}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.tabel_list.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4'><i class={item.icon}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.tabel_list.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 p-4 has-text-info'><i class={item.icon}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    {
                                        Data_list.customisation.heading.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <p class='p-4 has-text-left'>{item.title}</p>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.customisation.heading.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 p-4 has-text-info'><i class={item.icon}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.customisation.icons.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 p-4 has-text-danger'><i class={item.title}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.customisation.icons.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 p-4 has-text-dark'><i class={item.title}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>

                                <td>
                                    {
                                        Data_list.customisation.icons.map((item) => <div class='list'>

                                            <ul>
                                                <div class='list-tem'>
                                                    <li class='p-4 p-4 has-text-info'><i class={item.title}></i></li>
                                                </div>
                                            </ul>
                                        </div>)
                                    }
                                </td>



                            </tr>

                            <tr>
                                <td class='has-text-left'>{Data_list.customisation.title.title_list1}</td>
                                <td class='has-text-info has-text-weight-bold '>{Data_list.customisation.pricing.amount1}</td>
                                <td class='has-text-danger has-text-weight-bold '>{Data_list.customisation.pricing.amount2}</td>
                                <td class='has-text-dark has-text-weight-bold '>{Data_list.customisation.pricing.amount3}</td>
                                <td class='has-text-link has-text-weight-bold '>{Data_list.customisation.pricing.amount4}</td>
                            </tr>

                            <tr >
                                <td class='has-text-left'>{Data_list.customisation.title.title_list2}</td>
                                <td class='has-background-info  has-text-weight-bold  has-text-white'>{Data_list.customisation.newCostumerPricing.amount1}</td>
                                <td class='has-background-danger  has-text-weight-bold has-text-white'>{Data_list.customisation.newCostumerPricing.amount2}</td>
                                <td class='has-background-dark  has-text-weight-bold has-text-white'>{Data_list.customisation.newCostumerPricing.amount3}</td>
                                <td class='has-background-primary has-text-weight-bold  has-text-white'>{Data_list.customisation.newCostumerPricing.amount4}</td>
                            </tr>





                        </tbody>




                    </table>
                </div>
            </div>)
    }
})


