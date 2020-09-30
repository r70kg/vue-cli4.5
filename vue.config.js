/**
 * Created by Dell on 2020/9/24.
 */
const devProxy = [
    '/userInfomation',
    '/business'
] // 代理

let target = process.env.VUE_APP_BASE_API;

// 生成代理配置对象

let proxyObj = {}

devProxy.forEach((value) => {

    proxyObj[value] = {

        target: target,

        changeOrigin: true,

        pathRewrite: {
            [`^${value}`]: value
        }
    }
})


console.log(proxyObj)


module.exports = {
     devServer: {
         proxy: proxyObj,  // 配置代理
     },
     lintOnSave:false  // 关闭校验
 };