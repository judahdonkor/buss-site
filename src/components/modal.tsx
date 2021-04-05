import * as tsx from 'vue-tsx-support'
import { BModalConfig } from 'buefy/types/components'
import { VueConstructor } from 'vue'
import { mergeRight } from 'ramda'

type Config = Omit<BModalConfig, 'parent' | 'component' | 'props' | 'onCancel'>

const Mixin = tsx.component({
  props: {
    promise: {
      type: Object as () => {
        resolve: Parameters<ConstructorParameters<PromiseConstructor>[0]>[0]
        reject: Parameters<ConstructorParameters<PromiseConstructor>[0]>[1]
      },
      requred: true,
    },
  },
  methods: {
    resolve(value?: unknown) {
      this.$emit('close')
      this.promise.resolve(value)
    },
    reject(reason?: any) {
      this.$emit('close')
      this.promise.reject(reason)
    },
  },
})

const open: <T>(
  parent: VueConstructor extends VueConstructor<infer U> ? U : never,
  component: typeof Mixin,
  props?: BModalConfig['props'],
  modalConfig?: Config
) => Promise<T> = (parent, component, props = {}, modalConfig = {}) =>
    new Promise((resolve, reject) =>
      parent.$buefy.modal.open(
        Object.assign(
          {
            parent,
            component: component as any,
            props: Object.assign(props, {
              promise: { resolve, reject },
            }),
            onCancel: () => reject(Error('$cancelled')),
          },
          modalConfig
        )
      )
    )

export { Mixin, open, Config }
