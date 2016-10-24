$(function () {
    /**
     * localStorage => 用户id本地存储=> carcfuid
     */
    var ressign = {
        init() {
            var _this = this;
            _this.loadData();
        },
        loadData() {
            var _this = this;
            // var data = '';
            // var oid = CARUTILS.getParameter('orderId');
            // var userId = window.localStorage.getItem('carcfuid');
            // if (oid) {
            //     data = {
            //         url: 'capital/loan/stat/order/query.json',
            //         data: {
            //             orderId: oid
            //         }
            //     }
            // } else if (userId) {
            //     data = {
            //         url: 'capital/loan/stat/user/id/query.json',
            //         data: {
            //             userId: userId
            //         }
            //     }
            // } else {
            //     VALIDATEUTIL.showErrorMsg('产品id丢失，无法查询');
            //     return false;
            // }

            MyAjax.send({
                config: {
                    url: 'capital/loan/stat/user/id/query.json'
                },
                success: (ajaxdata) => {
                    $('.maindata .loanNum').html(ajaxdata.applySeq);
                    $('.maindata .cardNum').html(ajaxdata.bankCarNo);
                    $('.maindata .userName').html(ajaxdata.name);
                    $('.maindata .status').html(ajaxdata.status);
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


    }
    ressign.init()
})