$(function () {
    /**
     * localStorage => 用户id本地存储=> carcfuid
     */
    var carlogin = {
        init() {
            var _this = this;
    
            _this.$submit = $('.submitdiv button'); //提交按钮

            _this.submit();
        },
        submit() {
            var _this = this;

            _this.$submit.click((e) => {
                var type = $('#certi option:selected').val(); //身份证
                var num = $('input[name=certi]').val();

                if (!VALIDATEUTIL.certiCode(num,true)) {
                    return false;
                }
                _this.$submit.prop('disabled', true);

                MyAjax.send({
                    config: {
                        url: "capital/approval/idno/query.json",
                        data: {
                            idNo: num
                        }
                    },
                    success: (ajaxdata) => {
                        $('html,body').removeClass('oh');
                        $('.resModal').removeClass('hide');

                        // initData
                        $('.mainitem .date').text(ajaxdata.queryDate);
                        $('.mainitem .status').text(ajaxdata.orderStatus);
                        $('.mainitem .price').text(ajaxdata.applyAmt);
                        $('.mainitem .rate').text('年化利率'+ajaxdata.rate+'%');
                        $('.mainitem .time').text(ajaxdata.applyCycle+'期');
                        $('.modal-confirm').attr('href','onlinesign.html?orderId='+ajaxdata.orderId);
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


    }
    carlogin.init()

})