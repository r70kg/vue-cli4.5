import server from "./server.js";
import qs from "qs";


/**
 * 请求封装为 myserver
 */
function myserver(){
    this.server = server;
    this.nowhandle = null;
}


/**
 * @param ob 各个组件传入的this  Vue实例
 * this.nowhandle == this
 * @returns {myserver}
 */
// !!! 利用全局混入Mixin绑定 Vue实例
// 组件中调用    由this.msv.v(this)改为this.msv.模块名.接口名;
myserver.prototype.v = function (ob){
    this.nowhandle = ob;
    return this;
}

/**
 * @param name  api模块名字
 * @param urlOb 模块内暴露的接口对象
 */

myserver.prototype.parseRouter = function (name,urlOb){
  var ob = this[name] = {};
  Object.keys(urlOb).forEach((item)=>{
     ob[item] = this.sendMes.bind(this,name,item,urlOb[item]);
     //  赋值每个请求属性 state 
     ob[item].state = 'ready';
  })
}

/**
 *
 * @param moduleName
 * @param name    模块内接口对象的key字段
 * @param url     模块内接口对象的value字段 (接口)
 * @param config  用户传入的默认配置
 */
myserver.prototype.sendMes = function (moduleName,name,url,config){
    // 默认配置
   var config = config || {};
   var type = config.type || 'get';
   var data = config.data || {};
   var bindName = config.bindName || name;

   var self = this;
    // 响应数据处理前==处理==响应数据处理后
   var before = function(mes){
       console.log(mes)
       self[moduleName][name].state = 'ready';
       // ！！return 后续才能获取到数据
       return mes;
   }

    /**
     * @param mes  数据
     * self.nowhandle == 各组件内 this
     *              ||
     * [通过myserver.prototype.v绑定this实现]
     *
     */
   var defaultFn = function(mes){
        console.log(mes)
        if(mes.data){
            self.nowhandle[bindName] = mes.data;
        }
   }
   //  传入数据处理函数，默认使用defaultFn 处理
   var success=  config.success || defaultFn;
   var callback = function(res){
       success(res,defaultFn);
   }

   // 请求调用
   var state = {
       get:function(){
           var urlqs = url + '?' + qs.stringify(data);
           server.get(urlqs).then(before).then(callback);
       },
       post:function(){
        server.post(url,data).then(before).then(callback);
    }
   }
   // 为每个请求绑定状态标识，防止阻碍并发请求 实现防止重复提交
   if(self[moduleName][name].state == 'ready'){
      self[moduleName][name].state = 'pending'
      state[type]();
   }
}


export default new myserver;

