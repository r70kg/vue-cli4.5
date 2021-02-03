/**
 * Created by Dell on 2020/9/24.
 */
const devProxy = [
    '/user',
    '/wx'
] // 代理

let target = process.env.VUE_APP_BASE_API;

// 生成代理配置对象

let proxyObj = {}

devProxy.forEach((value) => {

    proxyObj[value] = {

        target: target,

        ws:false,

        changeOrigin: true,

        pathRewrite: {
            [`^${value}`]: value
        }
    }
})


console.log(proxyObj)


module.exports = {
     devServer: {
         host:'m.imooc.com',
         port:81,
         proxy: proxyObj,  // 配置代理
         disableHostCheck: true  // 跳过主机检查
     },
     chainWebpack: config => {
        config.module
            .rule('scss')
            .test(/\.scss$/)
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('postcss-loader') // this makes it work.
            .options({ remUnit: 75, remPrecision: 8 })
            .end()
     },
     lintOnSave:false  // 关闭校验
 };