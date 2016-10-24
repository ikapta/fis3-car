var CARUTILS=(function(){

var utils = {
    // 获取参数
    getParameter: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    },

    //显示手机号
    parseMobile: function (tel) {
        if (tel != null) {
            return tel.substr(0, 3) + '****' + tel.substr(7, 11);
        }
        return null;
    },

    //显示人名
    investUserName: function (name) {
        if (name != null) {
            if (name.length == 2) {
                return name.substr(0, 1) + '*';
            } else if (name.length == 3) {
                return name.substr(0, 1) + '**';
            } else if (name.length == 4) {
                return name.substr(0, 2) + '**';
            } else if (name.length > 4) {
                return name.substr(0, 2) + '****';
            }
        }
        return null;
    },

    /**
     * 登录捕获 returnurl 跳转
     */
    UrlPath: {
        // 拼接returnurl
        set: function (target) {
            if (target.indexOf('?') > -1) {
                window.location.href = target + '&returnurl=' + encodeURI(window.location.pathname + window.location.search);
            } else {
                window.location.href = target + '?returnurl=' + encodeURI(window.location.pathname + window.location.search);
            }

        },
        //  CARUTILS.UrlPath.locationhref('/')
        // 默认跳转到target页面，如果有returnurl则跳转到returnurl
        locationhref: function (target) {
            var lhref = window.location.href;
            var index = lhref.indexOf('returnurl')
            if (lhref.indexOf('returnurl') > -1) {
                var returnurl = lhref.substring(index);
                var reg = new RegExp("(^|&)returnurl=([^&]*)(&|$)", "i");
                var r = returnurl.match(reg);
                if (r != null) {
                    url = unescape(r[2]);
                } else {
                    url = null;
                }
            } else {
                url = null;
            }

            if (url == null) {
                window.location.href = target;
            } else {
                window.location.href = decodeURI(url);
            }
        }
    },

    /**
     *   对Date的扩展，将 Date 转化为指定格式的String 
     *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
     *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     *   例子：
     *   fmtDate(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     *   fmtDate(new Date(),"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
     */
    fmtDate: function (date, fmt) { //author: meizz 
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    /**
     * 加上逗号
     */
    addComma: function (id) {
        id = id + "";
        var v, j, sj, rv = "";
        v = id.replace(/,/g, "").split(".");
        j = v[0].length % 3;
        sj = v[0].substr(j).toString();
        for (var i = 0; i < sj.length; i++) {
            rv = (i % 3 == 0) ? rv + "," + sj.substr(i, 1) : rv + sj.substr(i, 1);
        }
        var rvalue = (v[1] == undefined) ? v[0].substr(0, j) + rv : v[0].substr(0, j) + rv + "." + v[1];
        if (rvalue.charCodeAt(0) == 44) {
            rvalue = rvalue.substr(1);
        }
        return rvalue;
    },
    /**
     * 去掉逗号
     */
    removeComma: function (id) {
        id = id + "";
        var v;
        v = id.replace(/,/g, "");
        return Number(v);
    },

    //将投资金额以100,000.00的格式显示
    showMoney: function (data) {
        var data = data + '';
        var str = data.split('.')[0];
        var temp = '';
        if (str.length > 3) {
            while (str.length > 3) {
                if (temp == '') {
                    temp = str.substr(str.length - 3, str.length);
                } else {
                    temp = str.substr(str.length - 3, str.length) + ',' + temp;
                }
                str = str.substr(0, str.length - 3);
            }
            if (str != null || str != '') {
                temp = str + ',' + temp;
            }
        } else {
            temp = str;
        }
        if (data.split(".")[1] && data.split(".")[1] != null) {
            temp = temp + '.' + data.split(".")[1];
        } else {
            temp = temp + '.00';
        }

        return temp;
    }
}

return utils;
}());

