/**
 * 从url的query中取出对应的参数值
 * @param {string} paramName 参数名
 * @param {String} url 
 */
export function urlQuery(paramName, url) {
    if ('undefined' === typeof (url)) {
        url = window.location.search;
    }
    var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
    var r = url.substr(url.indexOf('?') + 1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
