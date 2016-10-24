$(function () {

    var bgetuser = {
        init() {
            var _this = this;

            _this.loadData();
        },

        loadData() {
            var _this = this;

            MyAjax.send({
                config: {
                    url: "merchant/info/id/get.json",
                  
                },
                success: (ajaxdata) => {
                    $('.uname').html(ajaxdata.accountName);
                    $('.logout').click(function () {
                        _this.logout();
                    })
                },
                unLogin:()=>{
                    CARUTILS.UrlPath.set('/pages/backend/blogin.html'); 
                },
                failure: (msg) => {},
                error: (msg) => {},
                complete: () => {}

            })

        },

        logout() {
            var _this = this;

            window.location.href='/pages/backend/blogin.html';
            // MyAjax.send({
            //     config: {
            //         url: "user/login.json"
            //     },
            //     success: (ajaxdata) => {
            //         location.href = '/pages/backend/bbefore.html';
            //     },
            //     failure: (msg) => {},
            //     error: (msg) => {},
            //     complete: () => {}

            // })

        },
    }
    bgetuser.init();
})