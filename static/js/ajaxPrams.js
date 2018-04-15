function getParams() {
    var config = {};
    var clientType = GetQueryString("clientType");
    if(clientType == 4 || clientType == 5){
        config.clientType = clientType
        config.timestampApp = GetQueryString("timestampApp");
        config.version = GetQueryString("version");
        config.tokenId = GetQueryString("tokenId");
        config.sign = GetQueryString("sign");
        config.device = GetQueryString("device");
    }else{
        config.clientType = '1'
        config.timestampApp = Date.parse(new Date())
        config.version = '1.0'
        config.tokenId = cookie.getCookie('tokenId')
        config.sign = md5(config.clientType + '&' + SIGN + '&' + config.version + '&' + config.timestampApp)
    }
    return config;
}

function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
