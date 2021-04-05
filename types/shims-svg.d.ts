declare module '*.svg' {
    import Vue, { VueConstructor } from 'vue';
    const content: VueConstructor<Vue>;
    export default content;
}

declare module '*.svg?inline' {
    const content: any
    export default content
}

declare module '*.svg?data' {
    const content: any
    export default content
}

declare module '*.svg?raw' {
    const content: any
    export default content
}