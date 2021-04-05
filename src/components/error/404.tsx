import * as tsx from 'vue-tsx-support'
import LostImageIllustration from '~/assets/illustration/404.svg?inline'
import { NuxtError } from '@nuxt/types'

const Error404 = tsx.component({
    props: {
        error: {
            type: Object as () => NuxtError,
            required: true
        }
    },
    render() {
        return (
            <div class="pt-20">
                <div class="flex flex-wrap items-center justify-between">
                    <h1 class="w-full text-3xl xl:text-4xl light:text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary text-center font-medium leading-normal -mb-6 z-10">
                        {this.error.message}
                    </h1>
                    <div class="w-full lg:w-2/3 mx-auto">
                        <LostImageIllustration />
                    </div>
                </div>
            </div>
        )
    }
})

export { Error404 }