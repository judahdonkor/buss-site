import * as tsx from 'vue-tsx-support'
import Illustration from '@/assets/illustration/undraw_contact_us_15o2.svg?inline'

const data = {

    listItem: [
        { id: "1", title: 'list one' },
        { id: "2", title: 'list two' },
        { id: "3", title: 'list three' },
        { id: "4", title: 'list four' },
        { id: "5", title: 'list five' },
        { id: "6", title: 'list six' },
    ],


    Product: {
        services: [
            { id: "APP", title: 'Application Development', icon: "fa fa-check" },
            { id: "WEBSITE", title: 'Website Development', icon: "fa fa-check" },
            { id: "SUPPORT", title: 'Application Maintenance & Support', icon: "fa fa-check" },
            { id: "CONSULT", title: 'IT Consulting', icon: "fa fa-check" }
        ],
        office: [
            { id: 'malilto:support@buss.solutions', title: 'support@buss.solutions', icon: "fa fa-envelope" },
            { id: 'mailto:sales@buss.solutions', title: 'sales@buss.solutions', icon: "fa fa-envelope" }
        ]
    },

    form: {
        formTitle: 'Get Intouch' as String,
        formSubtitle: "Software is what you depend on to get things done. Buss Solutions is who you depend on for software." as String,
        submit: "Submit" as String
    }

}

export default tsx.component({

    render() {
        return (
            <section class=''>
                <div class='tw-container'>
                    <div class="hero">
                        <div class="hero-body">
                            <div class="columns is-vcentered">
                                <Illustration class='column' />
                                <div class="column">
                                    <h1 class='title is-size-1-desktop  is-size-1-tablet is-size-2-mobile has-text-weight-bold'>We get to know you, your company and your people.</h1>
                                </div>
                            </div>
                        </div>


                    </div>


                    <div class="section">

                        <div class="columns is-vcentered is-gapless">

                            <div class="column">
                                <div class="block">
                                    <h1 class='title is-size-1 has-text-dark has-text-weight-bold'>Our Services</h1>
                                    <ul>
                                        <div class='list tags'>
                                            <ul>
                                                {
                                                    data.Product.services.map((item) => (
                                                        <div class='list-item'>

                                                            <li class='title is-size-5  has-text-dark py-2'>
                                                                <span class='tag is-large has-text-dark has-text-weight-bold'>
                                                                    <i class={item.icon}></i>
                                                                </span>
                                                                {item.title}

                                                            </li>
                                                        </div>

                                                    ))

                                                }
                                            </ul>
                                        </div>

                                    </ul>
                                    <div class='content dropdown-divider'>

                                    </div>
                                    <div class="block py-5">
                                        <h1 class='title is-size-1 has-text-dark has-text-weight-bold'>Our Office</h1>
                                        <div class='list tags'>
                                            <ul>
                                                {
                                                    data.Product.office.map((item) => (
                                                        <div class="list-item">
                                                            <li class='title is-size-5 has-text-dark py-2 '>
                                                                <span class='tag is-large has-text-link has-text-weight-bold'>
                                                                    <i class={item.icon}></i>
                                                                </span>
                                                                <a href={item.id} class='has-text-dark is-hoverable' > {item.title}</a>
                                                            </li>
                                                        </div>

                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class='column p-5'>
                                <form class='form p-6 box' style="border-radius:4px">
                                    <div class="block is-centered py-4">
                                        <h1 class="title is-size-1 has-text-weight-bold" style='text-align:center; font-weight:bold'>
                                            {`${data.form.formTitle}`}
                                        </h1>
                                        <h3 class="subtitle py-2 is-size-5 is-justify-content-center is-align-items-center" style='text-align:center'>
                                            {data.form.formSubtitle}
                                        </h3>
                                    </div>

                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input type="text" class="input is-medium" placeholder="Full name" />
                                            <span class='icon is-small is-left'><i class='fas fa-user'></i></span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input type="email" required class="input is-fullwidth is-medium" placeholder="eg@buss.solution.com" />
                                            <span class='icon is-small is-left'><i class='fas fa-envelope'></i></span>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input type="text" class="input is-fullwidth is-medium" placeholder="phone" />
                                            <span class='icon is-small is-left'><i class='fas fa-mobile'></i></span>
                                        </div>
                                    </div>
                                    <div class="field has-addons">
                                        {/* <div class="control is-left">
                                    <div class="select is-medium">
                                        <select>
                                            {
                                                this.listItem.map((item) => (<option>{item.title}</option>))
                                            }
                                        </select>
                                    </div>
                                </div> */}
                                        {/* <div class="control">
                                    <input type="text" class="input is-fullwidth is-medium" placeholder="phone" />
                                </div> */}
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <textarea class='textarea is-size-5' placeholder='Briefly describe your project or issue'>

                                            </textarea>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <div class="select is-fullwidth is-medium">
                                                <select>
                                                    {
                                                        data.Product.services.map((item) => (<option>{item.title}</option>))
                                                    }
                                                </select>
                                            </div>
                                            <span class='icon is-small is-left'><i class="fa fa-tasks" ></i></span>
                                        </div>
                                    </div>

                                    <div class="field py-5">
                                        <div class="control">
                                            <button class="button  is-fullwidth has-text-weight-bold is-medium is-link is-disabled">
                                                {data.form.submit}
                                            </button>
                                        </div>
                                    </div>



                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        )
    }

})