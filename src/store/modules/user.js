import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, params) {
      state.token = params
    }
  },
  actions: {
    async getToken(context, params) {
      // console.log(params)
      const res = await login(params)
      console.log(res)
      context.commit('setToken', res)
    }
  }
}
