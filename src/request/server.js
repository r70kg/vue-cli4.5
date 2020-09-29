import axios from 'axios';


// 请求基本配置
let conf = {
    baseUrl:process.env.VUE_APP_BASE_API,
    timeout:5000
}

const server  = axios.create(conf);

export default server;