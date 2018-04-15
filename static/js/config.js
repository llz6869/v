var BASE_URL = "https://api.jingubank.com"; //https://api.jingubank.com  //http://106.37.111.115:8081
var SIGN = "amluZ3ViYW5i";
var ACTIVE_TYPE = "xycghyl";
function GetQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
