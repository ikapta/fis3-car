!function(global){
    var _previousobject = global.MyAjax;
	var urlProtocol = window.location.protocol;

	if (urlProtocol.substr(0, 5) == "https") {
		urlPrefix = "https://" + window.location.host + "/";
	} else {
		urlPrefix = "http://" + window.location.host + "/";
	}
	var interfaceUrl={
		dev:'http://10.1.20.24:8080/',
		qa:'http://10.1.20.32:8081/',
		qa1:'http://qa1-api.liancheinfo.net/',
		qa3:'http://qa3-api.liancheinfo.net:8081/',
		localhost:'http://localhost:8080/chainlife-front/'
	}
	var DEBUG = true;
	var dataType = DEBUG ? 'jsonp' : 'json';
	var type = DEBUG ? 'GET' : 'POST';

	urlPrefix = DEBUG ? interfaceUrl.qa3 : urlPrefix;
	// urlPrefix='http://10.1.20.87:8080/';
	// urlPrefix='http://10.1.21.234:8080/'
	
	
	ajaxConfig = {
		type: type,
		dataType: dataType,
		cache: false,
		jsonp: "jsoncallback"
	};

	var MyAjax = {
		urlAddress: urlPrefix,
		url: {
			"productGroupList": "product/getList.json",
		},
		send: function(callback) {
			callback.config.url = urlPrefix + callback.config.url;
			ajaxConfig.success = function(json) {
				if (json.code == 0) {
					callback.success && callback.success(json.data, json.total)
				} else if (json.code == 3000) {
					// 未登录处理
					callback.unLogin && callback.unLogin()
				} else {
					callback.failure && callback.failure(json.msg)
				}
			};
			ajaxConfig.error = function() {
				callback.error && callback.error("服务器开小差了")
			};
			ajaxConfig.complete = function() {
				callback.complete && callback.complete()
			};
			return $.ajax($.extend(callback.config, ajaxConfig));
		}
	};
      //if conflict,then...
    MyAjax.noConflict = function noConflict() {
        global.MyAjax = _previousobject;
        return MyAjax;
    };
    //add my module to this namespace,this is windows now.
    global.MyAjax = MyAjax;
}(this);