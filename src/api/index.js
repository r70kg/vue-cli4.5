import login from "./login.js";
import shop from "./shop.js";
import user from "./user";


import myserver from "../request/getrequest.js";
myserver.parseRouter('login',login);
myserver.parseRouter('shop',shop);
myserver.parseRouter('user',user);


export default myserver;

