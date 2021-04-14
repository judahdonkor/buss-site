import * as tsx from 'vue-tsx-support'
import { NuxtError } from '@nuxt/types'
import { Error404, Error503 } from '~/components/error'
import MountainsGlobeIllustration from '~/components/animated-svg/montains-globe.vue'

const Default = tsx.component({
    components: {
        MountainsGlobeIllustration
    },
    props: {
        error: {
            type: Object as () => NuxtError,
            required: true
        }
    },
    render() {
        return (
            <div class="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-pt-20 lg:tw-pt-0">
                <div class="tw-w-full lg:tw-w-1/2 tw-text-center lg:tw-text-left pl-8">
                    <h1 class="tw-text-6xl tw-font-medium leading-normal tw-text-nuxt-lightgreen">
                        {this.error.statusCode}
                    </h1>
                    <h3
                        class="tw-text-4xl light:tw-text-light-onSurfacePrimary dark:tw-text-dark-onSurfacePrimary tw-font-medium leading-relaxed mb-6"
                    >
                        {this.error.message}
                    </h3>
                </div>
                <div class="tw-hidden lg:tw-block lg:tw-w-5/12 xl:tw-w-4/12">
                    <mountains-globe-illustration />
                </div>
            </div>
        )
    }
})

export default tsx.component({
    components: {
        Error503
    },
    props: {
        error: {
            type: Object as () => NuxtError,
            required: true
        }
    },
    methods: {
        renderError(error: NuxtError) {
            switch (error.statusCode) {
                case 404:
                    return (<Error404 error={this.error} />)
                case 503:
                    return (<error-503 error={this.error} />)
                default:
                    return (<Default error={this.error} />)
            }
        }
    },
    render() {
        return (
            <div class="relative tw-container tw-mx-auto tw-px-4 ">
                {this.renderError(this.error)}
            </div>
        )
    }
})