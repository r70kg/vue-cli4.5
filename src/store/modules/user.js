/**
 * @name:user
 * @author:kk
 * @date:2020/12/25
 * @desc:登陆权限和用户信息相关
 */


import msv from '@/api/index'

const state = {
    userId: null,
    userInfo: {},
    access_token: '',
    refresh_token: ''
}

const actions = {
    // 登陆
    login({commit}, userInfo) {

        msv.login.logIn({
            type: 'post',
            data: userInfo,
            success: (res, defaultFn) => {

                commit('SET_USERINIFO', res.data.userInfo);
                commit('SET_ACCESS_TOKEN', res.data.access_token);
                commit('SET_REFRESH_TOKEN', res.data.refresh_token);
                // localStorage.setItem('access_token',res.data.access_token)
                // localStorage.setItem('refresh_token',res.data.refresh_token)
                defaultFn(res)

                /*this.$router.push({
                    name:'home',
                    params:{userId:1}
                })*/
            }
        });
    },
    // 刷新token
    refreshToken({commit, state}) {

        let refreshToken = state.refresh_token;

        return new Promise((resolve, reject) => {
            msv.login.refreshToken({
                type: 'post',
                data: {
                    refreshToken: refreshToken
                },
                success: (res, defaultFn) => {
                    commit('SET_ACCESS_TOKEN', res.data.access_token);
                    commit('SET_REFRESH_TOKEN', res.data.refresh_token);
                    resolve(res)
                    // localStorage.setItem('access_token',res.data.access_token)
                    // localStorage.setItem('refresh_token',res.data.refresh_token)
                }
            })
        })
    },
    // 清空token
    resetToken({commit}) {
        commit('SET_ACCESS_TOKEN', '');
        commit('SET_REFRESH_TOKEN', '');
    },
    // 用户信息
    getUserInfo({commit}, userId) {
        msv.user.userInfo({
            type: 'post',
            data: {
                userId
            },
            success: (res) => {
                commit('SET_USERINIFO', res.data.userInfo);
            }
        });
    }
}

const getters = {}

const mutations = {
    SET_USERINIFO(state, userInfo) {
        state.userInfo = userInfo
    },
    SET_ACCESS_TOKEN(state, access_token) {
        state.access_token = access_token
    },
    SET_REFRESH_TOKEN(state, refresh_token) {
        state.refresh_token = refresh_token
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
