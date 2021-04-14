import * as tsx from 'vue-tsx-support'

const AppCard = tsx.component({
    props: {
        label: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        }
    },
    render() {
        return (
            <div class='tw-flex tw-items-center tw-justify-between tw-gap-6'>
                <div class='tw-flex-1'>
                    <p class='tw-text-light-onSurfacePrimary tw-font-black tw-text-lg'>{this.label}</p>
                    <p class='tw-text-light-onSurfaceSecondary'>{this.description}</p>
                </div>
                <div class=''>
                    <img
                        class='tw-w-48 tw-h-32'
                        src={this.thumbnail}
                        alt="image" />
                </div>
            </div>
        )
    }
})

export { AppCard }
