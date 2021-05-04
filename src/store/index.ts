import { Entity } from '@judahdonkor/chassis-client-es/types/repository'
import { Context } from '@nuxt/types'
import {
  actionTree,
  getAccessorType,
  getterTree,
  mutationTree,
} from 'typed-vuex'
import { mdlAdministrator, mdlClient } from '~/rs'
import { mdl as mdlDiscriminator } from '~/discriminator'
import { Country } from '~/person/phone'
import countries from '~/static/res/countries.json'

type Currency = Record<'code' | 'name', string>

const state = () => ({
  appUrl: process.env.APP_URL || '',
  bussDisc: {} as Entity,
  person: null as Entity | null,
  cl: null as Entity | null,
  admin: null as Entity | null,
  currencies: [{
    code: 'USD',
    name: 'United States Dollars'
  }, {
    code: 'GHS',
    name: 'Ghana Cedis'
  }] as Currency[],
  countries: [] as Country[],
  discs: [] as Entity[],
  idx: 0,

})

const getters = getterTree(state, {
  disc: (state) => state.discs[state.idx],
})

const mutations = mutationTree(state, {
  SET_COUNTRIES: (state, countries: Country[]) => (state.countries = countries),
  SET_PERSON: (state, person: Entity) => (state.person = person),
  REMOVE_PERSON: (state) => (state.person = null),
  SET_CL: (state, cl: Entity | null) => (state.cl = cl),
  SET_ADMIN: (state, admin: Entity | null) => (state.admin = admin),
  SET_BUSS_DISC: (state, disc: Entity) => (state.bussDisc = disc),
  SET_DISCS: (state, discs: Entity[]) => (state.discs = discs),
  SET_IDX: (state, disc: number) => (state.idx = disc),
})

const actions = actionTree(
  {
    state,
    getters,
    mutations,
  },
  {
    async nuxtServerInit({ commit, state }, { app }: Context) {
      commit('SET_COUNTRIES', countries)
      const tk = app.$cookies.get<string>('tk')
      if (tk) {
        try {
          await app.$accessor.setup(tk)
        } catch (error) {
          app.$cookies.remove('tk')
        }
      }
    },
    async setup({ state, commit }, tk: string) {
      this.app.$axios.setToken(tk, 'Bearer')
      commit('SET_PERSON', await this.app.$chassis.xchg.appuser())
      commit('SET_BUSS_DISC', await this.app.$chassis.creation.find(mdlDiscriminator, 'buss'))
      this.app.$cookies.set('tk', tk)
      // admin
      commit(
        'SET_ADMIN',
        await this.$chassis.repos.find(mdlAdministrator, {
          type: 'EQUAL',
          params: {
            x: 'person.id',
            y: state.person!.id,
          },
        })
      )
      // client
      commit(
        'SET_CL',
        await this.$chassis.repos.find(mdlClient, {
          type: 'EQUAL',
          params: {
            x: 'person.id',
            y: state.person!.id,
          },
        })
      )
      if (!state.cl)
        throw new Error("You don't have a valid client account")
      commit('SET_DISCS', (await this.$chassis.repos.list(mdlDiscriminator, {
        where: [{
          type: 'EQUAL',
          params: {
            x: 'client.id',
            y: state.cl.id
          }
        }]
      })).data)
      commit('SET_IDX', 0)
    },
    async teardown({ commit }) {
      commit('REMOVE_PERSON')
      this.app.$cookies.remove('tk')
      this.app.$axios.setToken('')
      commit('SET_ADMIN', null)
      commit('SET_CL', null)
    },
  }
)

const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
  },
})

export { state, getters, mutations, actions, accessorType }
