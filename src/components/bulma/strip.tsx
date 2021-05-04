import * as tsx from 'vue-tsx-support'

const Strip = tsx.component({
    render() {
        return (
            <div class="columns">
                <div class="column is-narrow">{this.$slots.start}</div>
                <div class="column">{this.$slots.default}</div>
                <div class="column is-narrow">{this.$slots.end}</div>
            </div>
        )
    }
})

export { Strip }