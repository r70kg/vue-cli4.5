/**
 * 请求时token失效，重新拉取token;
 * 同时把并发的失效请求储存,待新token拉取成功后 用newToken继续之前的请求
 */
import axios from 'axios';
import store from '@/store';
import router from '@/router';


// 请求基本配置
let config = {
    baseUrl: process.env.VUE_APP_BASE_API,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000
}

const server = axios.create(config);


const loginUrl = process.env.VUE_APP_LOGIN_URL  // 登录url
let isRefreshing = false  // 是否正在刷新token
let callbacks = [] // 失效后同时发送请求的容器 -- 缓存接口

// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken) {
    callbacks.forEach(callback => {
        console.log(callback)
        callback(newToken)
    })
    // 清空缓存接口
    callbacks = []
}

// 添加缓存接口
function addCallbacks(callback) {
    callbacks.push(callback)
}


/**
 * 拦截
 */

// request interceptor
server.interceptors.request.use(
    config => {

        //  根据项目需求确定参数
        config.headers['Authorization'] = 'Bearer ' + store.state.user.access_token
        return config
    },
    error => {

        console.log(error)
        return Promise.reject(error)
    }
)

// response interceptor
server.interceptors.response.use(
    response => {

        const res = response.data || ''
        const options = response.config

        // 当前请求url是否为登陆接口
        const _isLoginUrl = options.url.includes(loginUrl);

        // 后端返回的成功状态码
        if (res.code === 200) {
            return res

            // 如果当前状态码为401并且请求的不是登陆接口
        } else if (res.code === 401 && !_isLoginUrl) {

            /**
             * 将401状态接口缓存 retryOriginalRequest
             * 用 Promise 使其处于等待状态
             * 当token刷新成功，onAccessTokenFetched 这个函数执行了回调函数，返回 resolve 状态
             * @type {Promise<any>}
             */

            const retryOriginalRequest = new Promise(resolve => {
                addCallbacks(newToken => {

                    // 表示用新的token去替换掉原来的token
                    options.headers.Authorization = newToken
                    // 替换掉url -- 因为baseURL会扩展请求url
                    options.url = options.url.replace(process.env.VUE_APP_BASE_API, '')
                    // 调用resolve请求队列里面接口
                    resolve(server.request(options))
                })




                // 无感刷新Token
                if (!isRefreshing) {
                    isRefreshing = true
                    store.dispatch('refreshToken').then((res) => {
                        console.log(9999)
                        console.log(res)
                        if(res.code===4001){
                            // 清空缓存接口
                            callbacks = [];

                            store.dispatch('resetToken');
                            router.push({
                                path:'./'
                            })
                        }else{
                            const newToken = store.state.user.access_token;
                            onAccessTokenFetched(newToken)
                        }


                    }).catch((err) => {
                        // 跳转到登录页面并清空 token
                        alert(err.message || 'Error')

                    }).finally(() => {
                        console.log('finally')
                        isRefreshing = false
                    })
                }
            })
            // 将token过期期间请求的接口包装成promise返回，等待刷新token后重新请求
            // return retryOriginalRequest
            return res
        } else {
            return res || 'Error'
        }
    },
    error => {
        return Promise.reject(error)
    }
)


export default server;