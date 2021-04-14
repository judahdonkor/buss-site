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
            <div class="tw-pt-20">
                <div class="tw-flex tw-flex-wrap tw-items-center tw-justify-between">
                    <h1 class="tw-w-full tw-text-3xl xl:tw-text-4xl light:tw-text-light-onSurfacePrimary dark:tw-text-dark-onSurfacePrimary tw-text-center tw-font-medium leading-normal -mb-6 z-10">
                        {this.error.message}
                    </h1>
                    <div class="tw-w-full lg:tw-w-2/3 tw-mx-auto">
                        <LostImageIllustration />
                    </div>
                </div>
            </div>
        )
    }
})

export { Error404 }