import { ValidationObserver } from 'vee-validate'
import { VueConstructor } from 'vue'
import * as tsx from 'vue-tsx-support'
import { Config as ModalConfig, Mixin, open as openModal } from './modal'
import { Notification } from '~/mixins'
import { Level } from './bulma'
import v from 'voca'
import { Loading } from './loading'

interface Config {
  value?: any
  title: string
  submitButtonLabel: string | ((step: number) => string)
  component: any
  props?: any
  validate?: (value: any) => Promise<void>
  persist?: (value: any, step?: number) => Promise<any>
  steps?: number
  nextLabel?: (step: number) => string
  sections?: { [key in string]: string }
  fullScreen?: boolean
  loadingMessage?: string
}

const Form = tsx.componentFactory
  .mixin(Mixin)
  .create({
    components: { ValidationObserver },
    props: {
      props: {
        type: Object as () => any,
      },
      value: {
        type: [Object as () => any, Array],
        required: true,
      },
      component: {
        type: Function as () => any,
        required: true,
      },
      submitButtonLabel: {
        type: [String, Function],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      validate: {
        type: Function,
        default: () => Promise.resolve(),
      },
      persist: {
        type: Function,
        default: (val: any, step?: number) => Promise.resolve(val),
      },
      steps: {
        type: Number
      },
      nextLabel: {
        type: Function,
        default: () => 'Next',
      },
      sections: {
        type: Object as () => { [key in string]: string }
      },
      fullScreen: Boolean,
      loadingMessage: {
        type: String,
        default: 'Submitting form'
      }
    },
    data() {
      return {
        newValue: this.value,
        step: 0,
        loading: false
      }
    },
    computed: {
      isComplex() {
        if (this.sections)
          return true
        if (this.steps)
          return true
        return false
      },
      computedSubmitButtonLabel() {
        let label: string
        if (typeof this.submitButtonLabel === 'string')
          label = this.submitButtonLabel as string
        else
          label = (this.submitButtonLabel as any)(this.step)
        return v.capitalize(label)
      }
    },
    methods: {
      async submit() {
        this.loading = true
        try {
          await (this.validate as any)(this.newValue)
          this.resolve(
            await (this.persist as any)(this.newValue, this.steps ? this.step : undefined)
          )
        } catch (error) {
          this.$notifyError(error)
        }
        this.loading = false
      },
      renderHead() {
        const sections = (
          <div class="tabs is-centered">
            <ul>
              {Object.keys(this.sections || {}).map(key => (
                <li class=""><a>{this.sections[key]}</a></li>
              ))}
            </ul>
          </div>
        )
        return (
          <header class='modal-card-head is-justify-content-center'>
            <div class={`w-full container px-5 ${this.fullScreen
              ? 'is-hidden-desktop'
              : ''}`}>
              <div class='columns is-mobile is-vcentered'>
                <div class='column is-narrow'>
                  <a
                    class='has-text-link is-5'
                    onClick={e => {
                      e.preventDefault()
                      this.reject(Error('$cancelled'))
                    }}>
                    Cancel
                    </a>
                </div>
                <div class='column'>
                  <h1 class='has-text-centered title is-5'>{this.title}</h1>
                </div>
                <div class='column is-narrow'>
                  <b-button
                    native-type="submit"
                    type="is-text"
                    class='has-text-weight-semibold has-text-link is-5 no-underline'>
                    {this.computedSubmitButtonLabel}
                  </b-button>
                </div>
              </div>
              {this.sections && sections}
            </div>
            {this.fullScreen && (
              <div class='w-full container is-fluid is-hidden-touch'>
                <div class='columns is-vcentered'>
                  <div class='column is-narrow'>
                    <a
                      class='has-text-link'
                      onClick={e => {
                        e.preventDefault()
                        this.reject(Error('$cancelled'))
                      }}>
                      <b-icon
                        icon='chevron-left' />
                    </a>
                  </div>
                  <div class="column">
                    <div class='columns is-vcentered'>
                      <div class='column is-narrow'>
                        <h1 class='has-text-centered title'>{this.title}</h1>
                      </div>
                      <div class="column">
                        <div class="columns">
                          <div class='column'>
                            {this.sections && sections}
                          </div>
                          <div class='column is-narrow is-align-self-center'>
                            <b-button
                              native-type="submit"
                              type='is-primary'>
                              {this.computedSubmitButtonLabel}
                            </b-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>
        )
      },
      renderFoot(handleSubmit: any) {
        if (this.steps)
          return (
            <div class="buttons has-addons">
              <b-button
                icon-left={this.step === 0 ? 'times' : 'chevron-left'}
                onClick={() => {
                  if (this.steps && this.step > 0)
                    this.step = this.step - 1
                  else
                    this.reject(Error('$cancelled'))
                }}
              >
                {(this.steps && this.step > 0) ? 'Go back' : 'Cancel'}
              </b-button>
              {this.steps && (
                <b-button
                  icon-right='chevron-right'
                  disabled={this.step === this.steps - 1}
                  onClick={() => {
                    if (this.steps && this.step < (this.steps - 1))
                      this.step = this.step + 1
                  }}
                >
                  {(this.nextLabel as any)(this.step + 1)}
                </b-button>
              )}
            </div>
          )
        else
          return (
            <footer
              class="modal-card-foot"
              style={{
                'justify-content': 'space-between',
              }}>
              <b-button
                onClick={() => this.reject(Error('$cancelled'))}>
                Cancel
              </b-button>
              <b-button
                slot='right'
                type="is-primary"
                onClick={() => this.submit()} >
                {this.computedSubmitButtonLabel}
              </b-button>
            </footer>
          )
      }
    },
    render() {
      const Component = this.component
      return (
        <validation-observer
          slim
          scopedSlots={{
            default: ({ handleSubmit }: any) => (
              <form
                class={`jd-form modal-card w-auto  ${this.sections ? 'jd-sectioned' : ''}`}
                onSubmit={(e: Event) => {
                  e.preventDefault()
                  handleSubmit(this.submit)
                }}>
                <Loading
                  active={this.loading}
                  message={this.loadingMessage} />
                {this.renderHead()}
                <Component
                  class={`modal-card-body ${!this.isComplex ? 'p-5' : ''}`}
                  value={this.newValue}
                  onInput={(val: any) => (this.newValue = val)}
                  step={this.step}
                  onStep={(val: number) => this.step = val}
                  {...{
                    props: { ...this.props },
                  }} />
                {/* {!this.sections && this.renderFoot(handleSubmit)} */}
              </form>
            ),
          }}
        />
      )
    },
  })

const open: <T>(
  ctx: VueConstructor extends VueConstructor<infer U> ? U : never,
  cfg: Config,
  modalConfig?: Omit<ModalConfig, 'hasModalCard' | 'fullScreen'>
) => Promise<T> = (ctx, cfg, modalConfig = {}) =>
    openModal(
      ctx,
      Form,
      cfg,
      Object.assign(
        {
          hasModalCard: true,
          // fullScreen: true,
          fullScreen: cfg.fullScreen
        },
        modalConfig
      )
    )

export { Form, open }
