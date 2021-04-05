import * as tsx from 'vue-tsx-support'

const ButtonAction = tsx.component({
    render() {
        return (
            <span>click {this.$slots.default}</span>
        )
    }
})

export { ButtonAction }