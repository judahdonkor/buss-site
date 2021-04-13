import * as tsx from 'vue-tsx-support'
import { StateIndicator } from '~/toolkit'

type ComfirmParams = {
  state: StateIndicator
  context: string
  message: string
} & Partial<Record<'confirmText' | 'cancelText', string>>

type PromptParams = ComfirmParams & {
  inputAttrs: { [key in string]: any }
} & Partial<Record<'confirmText' | 'cancelText', string>>

declare module 'vue/types/vue' {
  interface Vue {
    $confirm: ({ state, context, message }: ComfirmParams) => Promise<void>
    $prompt: ({ state, context, message, inputAttrs, confirmText, cancelText }: PromptParams) => Promise<any>
  }
}

const Dialog = tsx.component({
  methods: {
    $confirm({ state, context, message, confirmText, cancelText }: ComfirmParams) {
      return new Promise<void>((resolve, reject) =>
        this.$buefy.dialog.confirm({
          hasIcon: true,
          type: 'is-' + state,
          message,
          title: context,
          confirmText,
          cancelText,
          onConfirm: () => resolve(),
          onCancel: () => reject(Error('$cancelled')),
        })
      )
    },
    $prompt({ state, context, message, inputAttrs, confirmText, cancelText }: PromptParams) {
      return new Promise<any>((resolve, reject) =>
        this.$buefy.dialog.prompt({
          hasIcon: true,
          type: 'is-' + state,
          title: context,
          message,
          inputAttrs,
          trapFocus: true,
          confirmText,
          onConfirm: (val) => resolve(val),
          cancelText,
          onCancel: () => reject(Error('$cancelled'))
        })
      )
    }
  },
})

export { Dialog }
