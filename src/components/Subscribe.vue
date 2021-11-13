<template lang="">
<div>
    <p class ='title is-size-4 has-text-white pt-5 tw-text-dark-onSurfacePrimary tw-text-2xl tw-font-medium'>Subscribe to our news channel</p>
    <p class="subtitle has-text-white tw-text-xs pt-2 tw-text-dark-onSurfaceSecondary tw-text-base">
        Get notified when we release new solutions or we have exciting news for you.
    </p>
    <div class="field has-addons">
        <div class="control">
            <input class='input is-link is-medium is-fullwidth' type='email' placeholder='Enter your email' v-model ='email'></input>
        </div>
        <div class="field">
            <button @click ='Alert' class="button  is-link is-medium">Subscribe</button>
        </div>
    </div>
        </div>

</template>
<script>
export default {
    data(){
        return{

            email:""
        }
    },
    methods:{
        Alert(){

            
            if(this.email !==''){
                alert(`You have subscribed with ${this.email} successfully`)

            }
            this.email =''

               
        }
    }
}
</script>
<style lang="">
</style>