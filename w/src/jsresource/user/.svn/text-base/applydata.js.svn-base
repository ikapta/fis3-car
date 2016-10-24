$(function () {
    var veriyInfo = {
        init() {
            var _this = this;
            _this.$submit = $('.submitdiv button');
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
                        url: "user/info/update.json",
                        data: {
                            data: JSON.stringify(_this.user)
                        }
                    },
                    success: (ajaxdata) => {
                        CARUTILS.UrlPath.locationhref('/');
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
                company: $('input[name=company]').val(), //工作单位
                companyAddress: $('input[name=companyAddress]').val(), //工作单位地址
                companyPhone: $('input[name=companyPhone]').val(), //工作电话
                emergencyContact1: $('input[name=emergencyContact1]').val(), //紧急联系人
                contact1Phone: $('input[name=contact1Phone]').val(), //紧急联系人电话
                contact1Address: $('input[name=contact1Address]').val(), //紧急联系人的地址
                contact1Relation: $('#contact1Relation option:selected').val(), //与紧急联系人的关系
                // contactRelation: $('input[name=contactRelation]').val(), //与紧急联系人的关系
            };
        },
        // 登录提交验证
        validate() {
            var _this = this;

         
            if (!VALIDATEUTIL.isNotEmpty(_this.user.company, '工作单位', true)) {
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.companyAddress, '工作单位地址', true)) {
                return false;
            }
            if (!VALIDATEUTIL.companyMobileReg.test(_this.user.companyPhone)) {
                VALIDATEUTIL.showErrorMsg('请输入有效的单位电话');
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.emergencyContact1, '联系人姓名', true)) {
                return false;
            }
            if (!VALIDATEUTIL.mobileReg.test(_this.user.contact1Phone)) {
                VALIDATEUTIL.showErrorMsg('请输入正确的联系人电话');
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.contact1Address, '联系人地址', true)) {
                return false;
            }
            if (!VALIDATEUTIL.isNotEmpty(_this.user.contact1Relation, '与联系人关系', true)) {
                return false;
            }

            return true;
        },

    }
    veriyInfo.init()
})