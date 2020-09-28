import mserver from "../api/index.js";
import server from "./serve.js";
import qs from "qs";
import axios from "axios";
// 并行请求
// 阻止同一个并行请求  或者是  改变单一请求的状态 ==== 赋值每个请求属性 state 
function myserver(){
    this.server = server;
    this.nowhandle = {};
}

mserver.prototype.v = function (ob){
    this.nowhandle = ob;
    return this;
}



myserver.prototype.parseRouter = function (name,urlOb){
  var ob = this[name] = {};
  Object.keys(urlOb).forEach((item)=>{
     ob[item] = this.sendMes.bind(this,name,item,urlOb[item]);
     //  赋值每个请求属性 state 
     ob[item].state = 'ready';
  })
}


mserver.prototype.sendMes = function (moduleName,name,url,config){
   var config = config || {};
   var type = config.type || 'get';
   var data = config.data || {};
   var self = this;
   var bindName = config.bindName || name;
   // 响应数据处理前==处理==响应数据处理后
   var before = function(mes){

   }

   var defaultFn = function(mes){
       self.nowhandle[bindName] = mes.data;

   }

   var success=  config.success || defaultFn;
   var callback = function(res){
       success(res,defaultFn);
   }




   var state = {
       get:function(){
           var urlqs = url + '?' + qs.stringify(data);
           server.get(urlqs).then(before).then(callback);
       },
       post:function(){
        
        server.post(urlqs,data).then(before).then(callback);
    }
   }

   if(self[moduleName][name].state == 'ready'){
      self[moduleName][name].state == 'ready'
      state[type]();
   }

   // 发起请求
   state[type]();
}


export default new myserver;

