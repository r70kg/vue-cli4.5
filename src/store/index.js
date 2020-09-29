import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    persistedState({
      storage: window.sessionStorage,
      // 储存指定的state
      reducer(val) {
        return {
          // 只储存state中的user
          user: val.user
        }
      }
    })
  ]
})
