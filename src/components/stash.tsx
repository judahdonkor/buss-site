import { openForm } from '@/components'
import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { VueConstructor } from 'vue'
import * as tsx from 'vue-tsx-support'

const Stash = tsx
  .componentFactoryOf<{ onInput: (val: ArrayBuffer) => void }>()
  .create({
    data() {
      return {
        fileName: null as string | null,
      }
    },
    render() {
      return (
        <section>
          <b-field>
            <b-upload
              required
              onInput={async (file: File) => {
                console.log(await file.arrayBuffer())
                this.fileName = file?.name
                this.$emit('input', await file.arrayBuffer())
              }}
              drag-drop

            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your file here or click to upload</p>
                </div>
              </section>
              {this.fileName && (
                <b-tag type="is-primary">{this.fileName}</b-tag>
              )}
            </b-upload>
          </b-field>
        </section>
      )
    },
  })

const upload = (
  ctx: VueConstructor extends VueConstructor<infer U> ? U : never,
  discriminator: Entity,
  bucket?: string
) =>
  openForm<string>(ctx, {
    component: Stash,
    title: 'Stash',
    value: {},
    submitButtonLabel: 'Upload',
    persist: async (val) => {
      const dir = `${discriminator.id}/${bucket}`
      return `${window.location.origin
        }/rs/stash/${dir}/${await ctx.$axios.$post(`stash/${dir}`, val, {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        })}`
    },
  })

export { Stash, upload }
