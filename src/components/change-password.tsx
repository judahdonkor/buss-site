import { openForm } from '@/components'
import * as tsx from 'vue-tsx-support'
import { Input } from './form-control'

const ChangePassword = tsx
  .componentFactoryOf<{ onInput: (val: string) => void }>()
  .create({
    data() {
      return {
        password: '',
        confirm: '',
      }
    },
    watch: {
      password(val) {
        if (this.confirm === val)
          this.$emit('input', val)
        else
          this.$emit('input', null)
      },
      confirm(val) {
        if (this.password === val)
          this.$emit('input', val)
        else
          this.$emit('input', null)
      }
    },
    render() {
      return (
        <section class="section">
          <div class="container">
            <Input
              label='Password'
              rules='required'
              type="password"
              password-reveal
              value={this.password}
              onInput={(val: string) => (this.password = val)} />
            <Input
              label='Confirm Password'
              rules='required'
              type="password"
              password-reveal
              value={this.confirm}
              onInput={(val: string) => (this.confirm = val)} />
          </div>
        </section>
      )
    },
  })

interface Params {
  ctx: Vue
  fullScreen?: boolean
}

const changePassword = ({
  ctx,
  fullScreen
}: Params) =>
  openForm<void>(ctx, {
    component: ChangePassword,
    submitButtonLabel: 'Reset my password',
    title: 'Reset Password',
    fullScreen,
    persist: val => ctx.$chassis.xchg.resetPassword(val),
    validate: async val => {
      if (!val) throw new Error("Password is not valid");
    }
  })

interface Data {
  password: string
  confirm: string
  valid: boolean
}

export { changePassword, ChangePassword }
