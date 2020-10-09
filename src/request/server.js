/**
 * 请求时token失效时，重新拉取token;
 * 同时把并发的失效请求储存,待新token拉取成功后 用newToken继续之前的请求
 */
import axios from 'axios';
import store from '../store';


// 请求基本配置
let config = {
    baseUrl:process.env.VUE_APP_BASE_API,
    timeout:5000
}

const server  = axios.create(config);


const loginUrl = 'https://xxxxxxxx'  // 登录url
let isRefreshing = false  // 是否正在刷新token
let callbacks = [] // 失效后同时发送请求的容器 -- 缓存接口

// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken) {
    callbacks.forEach(callback => {
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
        /*
           do something before request is sent
           let each request carry token
           ['X-Token'] is a custom headers key
           please modify it according to the actual situation
        */
        //  根据项目需求确定参数
        config.headers = {
            accessToken:  store.state.token || '',
            imei: '',
            project: ''
        }
        if (store.getters.token) {

            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        // return Promise.reject(error)
    }
)

// response interceptor
server.interceptors.response.use(
    response => {
        const res = response.data
        console.log(res)

        if (res.statusCode === 200) {
            return res
        } else if (res.statusCode === 401 && !options.url.includes(loginUrl)) { // 如果当前状态码为401并且请求的不是登陆接口

            /**
             * 将未授权接口缓存起来 retryOriginalRequest 这个 Promise 函数很关键，它一直处于等待状态。
             * 只有当token刷新成功后，onAccessTokenFetched 这个函数执行了回调函数，返回了 resolve 状态
             * @type {Promise<any>}
             */

            const retryOriginalRequest = new Promise(resolve => {
                addCallbacks(newToken => {
                    // 表示用新的token去替换掉原来的token
                    options.header.Authorization = newToken
                    // 替换掉url -- 因为baseURL会扩展请求url
                    options.url = options.url.replace(process.env.VUE_APP_BASE_API, '')
                    resolve(service.request(options)) // 调用resolve请求队列里面接口
                })

                // 无感刷新Token
                if (!isRefreshing) {
                    isRefreshing = true
                    refreshToken().then(res => {  // 用rftoken获取新的token
                        const newToken = res.token
                        const newRefreshToken = res.refreshToken
                        // setToken()
                        // setRefreshToken()
                        onAccessTokenFetched(newToken)
                    }).catch(() => {
                        // 刷新token报错的话, 就需要跳转到登录页面
                        // setToken('')
                        // setRefreshToken('')

                        alert( res.message || 'Error')
                        // to re-login

                        // store.dispatch('user/resetToken').then(() => {
                        //     location.reload()
                        // })
                    }).finally(() => {
                        isRefreshing = false
                    })
                }
            })
            return retryOriginalRequest // 将token过期期间请求的接口包装成promise返回，等待刷新token后重新请求
        } else {
            return res || 'Error'
            // return Promise.reject(new Error(res || 'Error'))
        }
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
















export default server;