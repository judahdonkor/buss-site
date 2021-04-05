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
            links.push(<span class='text-black'>{val}</span>)
            if (idx < (this.path.length - 1))
                links.push(<IconDot class='w-6 h-6' />)
        })
        return (
            <nav class='inline-flex'>
                {links}
            </nav>
        )
    }
})

export { GoTo }