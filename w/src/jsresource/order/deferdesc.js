$(function () {

    var neworder = {
        init() {
            var _this = this;
            _this.orderId = CARUTILS.getParameter('orderid');
            _this.submit();
        },
        submit() {
            var _this = this;
            // 提交方法
            $('.submitdiv button').click(function () {

                if (!_this.orderId) {
                    VALIDATEUTIL.showErrorMsg('未找到订单，请返回重新下单');
                    return;
                }
               window.location.href='/pages/sesame/sesameverify.html'


            })
        },



    }

    neworder.init();
});