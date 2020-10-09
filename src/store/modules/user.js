/**
 * Created by Dell on 2020/10/9.
 */
const state = {
    userInfo: {}
}

const actions = {}

const getters = {}

const mutations = {
    // 储存token
    changeToken(state,token){
        state.token = token
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
