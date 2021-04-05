import { EventHub } from './event-hub'
import { random } from './random'
import { StateIndicator } from './types'

interface Toolkit {
    eventHub: EventHub
    random: typeof random
}

export {
    EventHub,
    Toolkit,
    random
}
export * from './types'
