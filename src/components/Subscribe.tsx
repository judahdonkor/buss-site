import * as tsx from 'vue-tsx-support'



const SubscribeView = tsx.component({

    props:{
        title:{
            type:String,
            required:true
        },
        subtitle:{
            type:String,
            required:true
        },
        buttonText:{
            type:String,
            required:true
        },
        placeholder:{
            type:String,
            required:false
        },
 
    },
    // methods:{

    //     handleSubscribe(e:any):void{
    //             e.preventDefault()

    //            const value =document.querySelector('.input') as HTMLInputElement

    //            if(value.value !==''){

    //             alert('Thank you for subscribing with us.')

    //             value.value =""

               
    //            }

               


    //     }
    // },

    render(){
        return(<div class ='has-text-centered-mobile hast-text-centered-tablet pt-5'>
            <div>
                <div class="block">
                    <h3 class ='tw-w-full tw-text-dark-onSurfacePrimary tw-text-2xl tw-font-medium tw-text-center md:tw-text-left'>
                        {this.title}
                    </h3>
                    <h4 class="subtitle tw-w-full tw-text-dark-onSurfaceSecondary tw-text-base tw-text-center md:tw-text-left">
                        {this.subtitle}
                    </h4>
                </div>
                <form class ='form' onSubmit ={()=>alert('CTA')}>
                <div class="field is-flex has-text-centered-mobile has-text-centered-tablet">
                    <div class="control mr-3 has-icons-left">
                        <input type="email" required class="input is-fullwidth is-medium" placeholder ={this.placeholder}/>
                        <span class ='icon is-small is-left'> <i class ='fas fa-envelope'></i></span>
                    </div>
                    <div class="control">
                        <button class="button is-medium is-link">
                            {this.buttonText}
                        </button>
                    </div>
                </div>
                </form>

            </div>
        </div>)
    }
})

 export const Subscribe = tsx.component({
    render(){
        return(<div>
               <SubscribeView 
               title ="Subscribe to our newsletters"
               subtitle =' Get notified when we release new solutions or we have exciting news for you.'
               placeholder ='Enter your email'
               buttonText ='Subscribe'
               />
           
        </div>)
    }
})