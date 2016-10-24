$(function () {
    var veriyInfo = {
        init() {
            var _this = this;
            _this.$submit = $('.submitdiv button');
            _this.returnurl=CARUTILS.getParameter('returnurl');
            _this.sexSwitch();
            _this.submit();
        },
        submit() {
            var _this = this;

            _this.$submit.click((e) => {
                // 取用户数据
                _this.makeUserDate();
                // 验证信息
                if (!_this.validate()) {
                    return false;
                }
                // 开始提交
                _this.$submit.prop('disabled', true);

                MyAjax.send({
                    config: {
                        url: "user/authen/info.json",
                        data: {
                            data: JSON.stringify(_this.user)
                        }
                    },
                    success: (ajaxdata) => {
                        if(_this.returnurl){
                            location.href = 'applydata.html?returnurl='+_this.returnurl;
                        }
                        
                    },
                    unLogin:()=>{

                    },
                    complete: () => {
                        _this.$submit.prop('disabled', false);
                    },
                    error: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    failure: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    }

                })
            })
        },

        makeUserDate() {
            var _this = this;
            _this.user = {
                // userId: window.localStorage.getItem('carcfuid'),
                userName: $('input[name=userName]').val(), //姓名
                certiNo: $('input[name=certiNo]').val(), //身份证
                sex: $('.peosex .active').data('sex'), //性别
                birthday: $('input[name=birthday]').val().replace(/-/g, '/'), //生日
                houseProperty: $('#houseProperty option:selected').val(), //现住房性质
                detailAddress: $('input[name=detailAddress]').val(), //现住房详细地址
                province: '',
                city: '',
                district: '',
                bankCardNo: $('input[name=bankCardNo]').val(), //银行卡号
                bankName: $('#bankName option:selected').val(), //开户行名称
            };
        },
        // 登录提交验证
        validate() {
            var _this = this;

            // if (!_this.user.userId) {
            //     VALIDATEUTIL.showErrorMsg('用户id丢失，请重新登录');
            //     return false;
            // }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.userName, '姓名', true)) {
                return false;
            }
            if (!VALIDATEUTIL.nameReg.test(_this.user.userName)) {
                VALIDATEUTIL.showErrorMsg('请输入正确的姓名');
                return false;
            }
            if (!VALIDATEUTIL.certiCode(_this.user.certiNo, true)) {
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.certiNo, '身份证信息', true)) {
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.birthday, '出生日期', true)) {
                return false;
            }
            if (!_this.user.houseProperty) {
                VALIDATEUTIL.showErrorMsg('请选择现住房性质');
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.detailAddress, '现住房地址', true)) {
                return false;
            }
            if (!/\d/.test(_this.user.bankCardNo)) {
                VALIDATEUTIL.showErrorMsg('请输入银行卡号');
                return false
            }
            if (!_this.user.bankName) {
                VALIDATEUTIL.showErrorMsg('请选择开户行名称');
                return false;
            }
            return true;
        },

        sexSwitch() {
            $('.peosex abbr').click(function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings().removeClass('active');
                }
            })
        },

    }
    veriyInfo.init()
})