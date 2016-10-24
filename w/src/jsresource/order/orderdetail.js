$(function () {

    var neworder = {
        init() {
            var _this = this;
            _this.orderId = CARUTILS.getParameter('orderid');
            _this.submit();
            $('.submitdiv button').click(function () {
                window.location.href = 'deferdesc.html?orderId=' + _this.orderId;
            })
        },
        submit() {
            var _this = this;

            if (!_this.orderId) {
                VALIDATEUTIL.showErrorMsg('未找到订单，请返回重新下单');
                return;
            }

            MyAjax.send({
                config: {
                    url: "order/getByOrderId.json",
                    data: {
                        orderId: _this.orderId
                    }
                },
                success: (ajaxdata) => {
                    console.log(ajaxdata)
                    $('.merName').text(ajaxdata.merName);
                    $('.orderId').text(ajaxdata.orderId);
                    $('.applyAmt').text(ajaxdata.applyAmt);
                    $('.wayname').text(ajaxdata.applyCycle + '期*' + ajaxdata.mAmount + '元');

                },

            }); //end ajax


            // location.href = '/pages/order/deferdesc.html?orderid=' + _this.orderId;
        },



    }

    neworder.init();
});