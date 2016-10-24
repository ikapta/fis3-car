var VALIDATEUTIL=(function(){
	var VALIDATEUTIL = {
		nameReg: /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/,	
		certiCodeReg : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, 
		mobileReg : /^1\d{10}$/, 
		companyMobileReg:/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{6,14}$/,
		loginPwdReg : /^[0-9A-Za-z]{6,20}$/, 
		payPwdReg : /^\d{6}$/,
		email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		
		isNotEmpty : function(value,msg,debug) {
			var _this=this;
			if (!value || value == null || value == "") {
				if(debug){
					_this.showErrorMsg(msg+"不能为空");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},
		
		certiCode : function(value, debug) {
			var _this = this;
			var reg = _this.certiCodeReg;
			if (reg.test(value) == false) {
				if (debug) {
					_this.showErrorMsg("请输入有效的身份证信息");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},

		mobile : function(value, debug) {
			var _this = this;
			var reg = _this.mobileReg;
			if (!reg.test(value)) {
				if (debug) {
					_this.showErrorMsg("请确认你的手机号码");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},

		loginPassword : function(value, debug) {
			var _this = this;
			var reg =  _this.loginPwdReg;
			if (!reg.test(value)) {
				if (debug) {
					_this.showErrorMsg("请输入6-20位数字或字母");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},

		payPassword : function(value, debug) {
			var _this = this;
			var reg = _this.payPwdReg;
			if (!reg.test(value)) {
				if (debug) {
					_this.showErrorMsgs("请输入6位数字交易密码");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},
		
		againPassword:function(pwd,apwd,debug){
			var _this=this;
			if(pwd!=apwd){
				if(debug){
					_this.showErrorMsg("确认密码错误");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},
		
		//检查日期输入是否错误  起始日期是否在结束日期之前
		checkData : function(data1 , data2 , debug){
			/*if(data1 != null && data1 != "" && data2 != null && data2 != "" ){
				DateTime a = DateTime.parse(data1); //2010-1-9 8:00:00
				DateTime b = DateTime.parse(data2);
				if(debug){
					if(a > b){
						alert("起始日期不能在结束日期之后");
					}
				}
				return a < b;
			}*/
			return true ;
		},
		/**
		 * 判断checkbox是否选中
		 */
		isSelect : function(){
			var _this = this ;
            var chk=$(".virtualRight").hasClass("dispaly");
            if(chk){
            	_this.showErrorMsg("未同意协议");
            	return false ;
            } else{
            	_this.hideErrorMsg("")
            	return true ;
            }
		},
		/**
		 * 邮箱校验
		 */
		isEmail : function(value, debug){
			var _this = this;
			var reg = _this.email;
			if (!reg.test(value)) {
				if (debug) {
					_this.showErrorMsg("请输入正确的邮箱信息！");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},
		/**
		 * 是否为空 ，是否是数字
		 */
		isEmptyANum : function(value,msg,debug){
			var _this=this;
			if (!value || value == null || value == "") {
				if(debug){
					_this.showErrorMsg(msg+"不能为空");
				}
				return false;
			}
			if(isNaN(value)){
				if(debug){
					_this.showErrorMsg(msg+"不能包含非数字");
				}
				return false;
			}
			_this.hideErrorMsg("")
			return true;
		},
		/**
		 * 显示企业名
		 */
		showCN : function(str){
			if(!str || str == null || str == ''){
				return '';
			}
			return str.substr(0,2)+"*****";
		},
		/**
		 * 显示错误信息
		 */
		showErrorMsg:function(msg){
			var _this=this;
            if($(".error2").is(":visible")){
                _this.hideErrorMsg();
            }
            $(".error2").removeClass("hide");
            $(".error2").animate({top:0 +"px"},"slow",function() {});
            $(".error2 span").text(msg);
            _this.autoHideErrorMsg();
		},
		
		autoHideErrorMsg: function(){
			var _this=this;
			if($(".error2").is(":visible")){
				setTimeout(function(){
				_this.hideErrorMsg();
				},4000);
			}
		},
		/**
		 * 隐藏错误信息
		 */
		hideErrorMsg:function(){
			var _this=this;
            $(".error2").addClass("hide");
            $(".error2 span").text("");
		},
	};
	return VALIDATEUTIL;
}());
	
