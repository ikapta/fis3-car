$(function () {
    /**
     * localStorage => 用户id本地存储=> carcfuid
     */
    var sesame = {
        init() {
            var _this = this;
            _this.uid = window.localStorage.getItem('carcfuid');
            _this.loadData();
            _this.submit();
        },
        loadData() {
            var _this = this;

            MyAjax.send({
                config: {
                    url: "user/info/simple/get.json"
                },
                success: (ajaxdata) => {
                    $('.maindata .userName').val(ajaxdata.userName);
                    $('.maindata .cardNum').val(ajaxdata.certiNo);
                },
                failure: (msg) => {
                    VALIDATEUTIL.showErrorMsg(msg);
                },
                unLogin:()=>{
                    CARUTILS.UrlPath.set('/pages/user/login.html');
                },
                error: (msg) => {
                    VALIDATEUTIL.showErrorMsg(msg);
                },
                complete: () => {}

            })
        },
        // 芝麻验证
        submit() {
            var _this = this;
            $('.submitdiv button').click(function () {
                var THIS=this;
                // if (!_this.uid) {
                //     VALIDATEUTIL.showErrorMsg('用户id丢失，请重新登录');
                //     return false;
                // }
                $(THIS).prop('disabled',true);
                MyAjax.send({
                    config: {
                        url: "risk/zmAuthorize.json"
                    },
                    success: (ajaxdata) => {
                        if (ajaxdata) {
                            window.location.href = ajaxdata;
                        } else {
                            VALIDATEUTIL.showErrorMsg('null redirct url');
                        }

                    },
                    failure: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    error: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    unLogin:()=>{
                       CARUTILS.UrlPath.set('/pages/user/login.html');
                    },
                    complete: () => {
                        $(THIS).prop('disabled',true);
                    }

                })

            })

        }

    }
    sesame.init()
})