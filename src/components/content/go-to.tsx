import * as tsx from 'vue-tsx-support'
import { IconDot } from '~/components/icons'
import { VNode } from 'vue'

const GoTo = tsx.component({
    props: {
        path: {
            type: Array as () => string[],
            required: true
        }
    },
    render() {
        const links: VNode[] = []
        this.path.forEach((val, idx) => {
            links.push(<span class='tw-text-black'>{val}</span>)
            if (idx < (this.path.length - 1))
                links.push(<IconDot class='tw-w-6 tw-h-6' />)
        })
        return (
            <nav class='inline-tw-flex'>
                {links}
            </nav>
        )
    }
})

export { GoTo }