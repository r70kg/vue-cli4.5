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
    // 注册
    register({commit},userInfo) {
        msv.login.register({
            type: 'post',
            data: userInfo,
            success: ({code, msg}) => {
                alert(msg)
            }
        });
    },
    // 登陆
    login({commit}, userInfo) {

        return new Promise((resolve) => {
            msv.login.logIn({
                type: 'post',
                data: userInfo,
                success: (res) => {
                    resolve(res)
                    commit('SET_USERINIFO', res.data.userInfo);
                    commit('SET_ACCESS_TOKEN', res.data.access_token);
                    commit('SET_REFRESH_TOKEN', res.data.refresh_token);
                }
            });
        })

    },
    // 退出
    logout({commit}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                    commit('SET_ACCESS_TOKEN', '');
                    commit('SET_REFRESH_TOKEN', '');
                }, 0
            )
            resolve();
        })
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
                success: (res) => {
                    commit('SET_ACCESS_TOKEN', res.data.access_token);
                    commit('SET_REFRESH_TOKEN', res.data.refresh_token);
                    resolve(res)
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
    getUserInfo({commit, state}) {
        msv.user.userInfo({
            type: 'post',
            data: {
                userId: state.userInfo.userId
            },
            success: (res) => {
                commit('SET_USERINIFO', res.data.userInfo);
            }
        });
    },
    // 更新密码
    updatePassword({commit, state},payload) {
        return new Promise((resolve)=>{
            msv.login.updatePassword({
                type: 'post',
                data: payload,
                success: (res) => {
                    resolve(res)
                }
            });
        })
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
