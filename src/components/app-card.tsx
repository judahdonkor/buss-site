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
            <div class='flex items-center justify-between gap-6'>
                <div class='flex-1'>
                    <p class='text-light-onSurfacePrimary font-black text-lg'>{this.label}</p>
                    <p class='text-light-onSurfaceSecondary'>{this.description}</p>
                </div>
                <div class=''>
                    <img
                        class='w-48 h-32'
                        src={this.thumbnail}
                        alt="image" />
                </div>
            </div>
        )
    }
})

export { AppCard }
