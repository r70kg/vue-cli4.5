/**
 * Created by Dell on 2020/10/9.
 */
function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
    var r = window.location.hash.substr(8).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
export {
    getUrlParams
}