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
            <div class="flex flex-wrap items-center justify-between pt-20 lg:pt-0">
                <div class="w-full lg:w-1/2 text-center lg:text-left pl-8">
                    <h1 class="text-6xl font-medium leading-normal text-nuxt-lightgreen">
                        {this.error.statusCode}
                    </h1>
                    <h3
                        class="text-4xl light:text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary font-medium leading-relaxed mb-6"
                    >
                        {this.error.message}
                    </h3>
                </div>
                <div class="hidden lg:block lg:w-5/12 xl:w-4/12">
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
            <div class="relative container mx-auto px-4 ">
                {this.renderError(this.error)}
            </div>
        )
    }
})