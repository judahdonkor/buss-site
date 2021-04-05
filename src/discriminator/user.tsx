import { Entity } from "@judahdonkor/chassis-client-es/types/repository"
import { openForm } from "~/components"
import { Person } from "~/person"
import { mdlPerson } from "~/rs"

const mdl = 'org.judahdonkor.buss.DiscriminatorUser'

interface Params {
    ctx: Vue
    discriminator: Entity
    user?: Entity
    fullScreen?: boolean
}

const merge = ({
    ctx,
    discriminator,
    fullScreen,
    user
}: Params) =>
    openForm<Entity>(ctx, {
        component: Person,
        submitButtonLabel: user
            ? 'Save'
            : 'Add',
        title: user
            ? 'Update ' + user.display
            : 'Add User',
        fullScreen,
        loadingMessage: 'Adding user',
        persist: async val => ctx.$chassis.repos.merge(mdl, Object.assign({
            discriminator
        }, user, {
            person: val.id
                ? val
                : await ctx.$chassis.repos.merge(mdlPerson, val)
        })),
        value: user?.person
    })

export { mdl, merge }
