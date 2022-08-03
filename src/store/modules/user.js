import { login, getUserInfoApi, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    getUserInfo: {}
  },
  mutations: {
    setToken(state, params) {
      state.token = params
    },
    getUserInfo(state, payload) {
      state.getUserInfo = payload
    }
  },
  actions: {
    async getToken(context, params) {
      const res = await login(params)
      context.commit('setToken', res)
      setTokenTime()
    },

    async getUserInfo(context) {
      const userBat = await getUserInfoApi()
      // console.log(userBat);
      const userInfo = await getUserDetail(userBat.userId)
      // console.log(userInfo);
      context.commit('getUserInfo', {...userInfo, ...userBat})
    },

    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('getUserInfo', {})
    }
  }
}
