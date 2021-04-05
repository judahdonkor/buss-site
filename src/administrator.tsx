import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { VueConstructor } from 'vue'
import { merge as mergePerson } from './person'

const mdl = 'org.judahdonkor.buss.Administrator'

const merge = (
  ctx: VueConstructor extends VueConstructor<infer U> ? U : never,
  value: Entity = { person: {} }
) =>
  new Promise<Entity>(async (resolve, reject) => {
    try {
      resolve(
        await ctx.$chassis.repos.merge(
          mdl,
          Object.assign(value, {
            person: await mergePerson(ctx, value.person),
          })
        )
      )
    } catch (error) {
      reject(error)
    }
  })

export { mdl, merge }
