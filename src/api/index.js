import login from "./login.js";
import user from "./user";
import wechart from "./wechat";


import myserver from "../request/getrequest.js";

myserver.parseRouter('login',login);
myserver.parseRouter('user',user);
myserver.parseRouter('wechart',wechart);


export default myserver;

