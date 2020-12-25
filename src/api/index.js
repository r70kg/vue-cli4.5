import login from "./login.js";
import user from "./user";


import myserver from "../request/getrequest.js";

myserver.parseRouter('login',login);
myserver.parseRouter('user',user);


export default myserver;

