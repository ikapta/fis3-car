$(function () {
    /**
     * localStorage => 用户id本地存储=> carcfuid
     */
    var carlogin = {
        init() {
            var _this = this;
            _this.$phone = $('#userAccount'); //手机号
            _this.$vcode = $('#verifyCode'); //验证码
            _this.$submit = $('.submitdiv button'); //提交按钮
            _this.$sendCode = $('#sendCode'); //发送验证码按钮

            _this.sendMsg();
            _this.login();
        },
        login() {
            var _this = this;

            _this.$submit.click((e) => {
                if (!_this.validate()) {
                    return false;
                }
                _this.$submit.prop('disabled', true);
                var data = {
                    userAccount: _this.$phone.val(),
                    verifyCode: _this.$vcode.val(),
                }
                MyAjax.send({
                    config: {
                        url: "user/register.json",
                        data: {
                            data: JSON.stringify(data)
                        }
                    },
                    success: (ajaxdata) => {
                        window.localStorage.setItem('carcfuid', ajaxdata.id);
                        CARUTILS.UrlPath.locationhref('/'); //默认跳转到首页
                    },
                    failure: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    error: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    complete: () => {
                        _this.$submit.prop('disabled', false);
                    }

                })
            })
        },


        // 登录提交验证
        validate() {
            var _this = this;
            var phonevalue = _this.$phone.val();
            var codevalue = _this.$vcode.val();

            if (!phonevalue) {
                VALIDATEUTIL.showErrorMsg('请输入手机号');
                return false;
            }
            if (!VALIDATEUTIL.mobileReg.test(phonevalue)) {
                VALIDATEUTIL.showErrorMsg('请输入正确的手机号');
                return false;
            }
            if (!codevalue) {
                VALIDATEUTIL.showErrorMsg('请输入验证码');
                return false;
            }
            return true;
        },

        // 发送验证码
        sendMsg() {
            var _this = this;
            _this.$sendCode.click(() => {
                if (!VALIDATEUTIL.isNotEmpty(_this.$phone.val(), "手机号", true)) {
                    return;
                }
                if (!VALIDATEUTIL.mobile(_this.$phone.val(), true)) {
                    return;
                }

                if (!$(_this.$sendCode).prop("disabled") || $(_this.$sendCode).prop("disabled") == false) {
                    $(_this.$sendCode).html("获取60秒").prop("disabled", true);
                    var time = 60;
                    var t = setInterval(() => {
                        if (time == 0) {
                            $(_this.$sendCode).html("获取验证码").removeAttr("disabled");
                            clearInterval(t);
                            time = 60;
                        } else if (time > 0) {
                            time = time - 1;
                            $(_this.$sendCode).html("获取" + time + "秒");
                        }
                    }, 1000);
                    MyAjax.send({
                        config: {
                            url: 'sys/sms/register/validate/send.json',
                            data: {
                                phone: _this.$phone.val()
                            }
                        },
                        success: (data) => {
                            // Nothing todo
                        },
                        failure: (data) => {
                            clearInterval(t);
                            $(_this.$sendCode).html("获取验证码").removeAttr("disabled");
                        }
                    }); //end 发送验证码
                }
            });
        }

    }
    carlogin.init()
})