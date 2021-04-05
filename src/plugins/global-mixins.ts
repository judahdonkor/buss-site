import Vue from "vue"
import { Notification, StoreMappings, Dialog } from '~/mixins'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!(Vue as any).__my_mixin__) {
    (Vue as any).__my_mixin__ = true
    Vue.mixin(Notification) // Set up your mixin then
    Vue.mixin(StoreMappings)
    Vue.mixin(Dialog)
}