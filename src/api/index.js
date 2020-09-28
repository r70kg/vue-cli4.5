import login from "./login.js";
import shop from "./shop.js";


import mserver from "../request/getrequest.js";
mserver.parseRouter('login',login);
mserver.parseRouter('shop',shop);


export default mserver;

