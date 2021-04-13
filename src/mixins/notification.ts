import * as tsx from 'vue-tsx-support'
import { StateIndicator } from '~/toolkit'
import { BNoticeComponent } from 'buefy/types/components'

type Params = {
  state: StateIndicator
  context: string
  message: string
  indefinite?: boolean
}

const parseErrorEntity: (data: any) => string = (data) => `
<p class='title'>${data.context || data.title || ''}</p>
<P class='subtitle'>${data.detail || ''}</p>`
// <ul>
//     ${Object.entries(data)
//     .filter((e) => !['title', 'detail'].includes(e[0]) && e[1])
//     .map(
//       (e) =>
//         `<li><strong>${e[0]}</strong> ${e[0] === 'cause' ? parseErrorEntity(e[1]) : e[1]
//         }</li>`
//     )
//     .join('')}
// </ul>
// `

const formatError: (error: any) => string = (error) => {
  if (error.response) {
    return parseErrorEntity(error.response.data)
  } else if (error.request) {
    return formatError(new Error('Service is unavailable'))
  } else {
    console.log(error)
    return `
        <p class='title'>${error.name}</p>
        <P class='subtitle'>${error.message}</p>
    `
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $notify: ({ state, context, message }: Params) => void
    $notifyError: (error: Error | any) => void
  }
}

const Notification = tsx.component({
  data() {
    return {
      $errors: [] as BNoticeComponent[]
    }
  },
  methods: {
    $notify({ state, context, message, indefinite }: Params) {
      this.$buefy.notification.open({
        hasIcon: true,
        type: 'is-' + state,
        indefinite,
        message: `
                <p class='title is-5'>${context}</p>
                <P class='subtitle is-6'>${message}</p>
            `,
      })
    },
    $notifyError(error: any) {
      if (error.message === '$cancelled') return
      this.$errors.push(this.$buefy.notification.open({
        message: formatError(error),
        hasIcon: true,
        type: 'is-danger',
        indefinite: true,
        queue: false
      }))
    },
  },
  beforeDestroy() {
    this.$errors?.forEach(n => n.close())
  }
})

export { Notification, parseErrorEntity, formatError }
