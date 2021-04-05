import * as tsx from 'vue-tsx-support'

const Loading = tsx.component({
    props: {
        isFullPage: Boolean,
        active: Boolean,
        message: String
    },
    render() {
        return (
            <b-loading is-full-page={this.isFullPage} active={this.active}>
                <div class='has-text-centered'>
                    <b-icon
                        icon="spinner"
                        size="is-large"
                        type='is-primary'
                        custom-class="fa-pulse" />
                    {this.message && (<p>{this.message}</p>)}
                </div>
            </b-loading>
        )
    }
})

export {
    Loading
}