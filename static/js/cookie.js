var cookie = {
    /*设置cookie*/
    setCookie: function (cname, cvalue, expire) {
        var date = new Date()
        date.setSeconds(date.getSeconds() + expire)
        var expires = 'expires=' + date.toUTCString();
        document.cookie = cname + '=' + encodeURIComponent(cvalue) + '; ' + expires+';path=/';
    },
    /*获取cookie*/
    getCookie: function (c_name) {
        var name = c_name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return decodeURIComponent(c.substring(name.length, c.length));
        }
        return '';
    },

    /*删除cookie*/
    delCookie: function (c_name) {
        this.setCookie(c_name, '', new Date(0).toUTCString())
    },
    cleanAllCookie: function () {
        var result = false;
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                // this.setCookie(keys[i], '', new Date(0).toGMTString())
                document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString()+';path=/'
            result = true;
        }
        return result;
    },
    setRedirectTo:function (url) {
        this.setCookie("redirectTo",url,30*60);
    },
    getRedirectTo:function () {
        var url  = this.getCookie("redirectTo");
        this.delCookie("redirectTo");
        return url;
    }

}
