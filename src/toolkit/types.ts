import { VueConstructor } from 'vue'

type Unpacked<T> = T extends Array<infer E>
  ? E
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer P>
  ? P
  : T

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}

type UnpackVueComponent<T extends VueConstructor> = T extends VueConstructor<
  infer U
>
  ? U
  : never

type StateIndicator = 'success' | 'warning' | 'danger' | 'info'

export { Unpacked, DeepPartial, UnpackVueComponent, StateIndicator }
