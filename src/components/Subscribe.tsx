import * as tsx from 'vue-tsx-support'
import { IconEnvelopeSolid} from '~/components/icons'


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
    methods:{

        handleSubscribe(e:any):void{
                e.preventDefault()

               const value =document.querySelector('.input') as HTMLInputElement

               if(value.value !==''){

                alert('Thank you for subscribing with us.')

                value.value =""

               
               }

               


        }
    },

    render(){
        return(<div class ='has-text-centered-mobile hast-text-centered-tablet'>
            <div>
                <div class="block">
                    <h3 class ='tw-w-full tw-text-dark-onSurfacePrimary tw-text-2xl tw-font-medium tw-text-center md:tw-text-left'>
                        {this.title}
                    </h3>
                    <h4 class="subtitle tw-w-full tw-text-dark-onSurfaceSecondary tw-text-base tw-text-center md:tw-text-left">
                        {this.subtitle}
                    </h4>
                </div>
                <div class="field is-flex has-text-centered-mobile has-text-centered-tablet">
                    <div class="control mr-3 ">
                        <input type="email" required class="input is-fullwidth is-medium is-focused" placeholder ={this.placeholder}/>
                        
                    </div>
                    <div class="control">
                        <button class="button is-medium is-link" onClick ={this.handleSubscribe}>
                            {this.buttonText}
                        </button>
                    </div>
                </div>

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