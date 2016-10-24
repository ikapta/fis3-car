$(function () {

    var carinsurance = {
        init() {
            var _this = this;
            // _this.minInvest = 1000; //最小投资额
            // _this.minAdd = 10; //递增递减额度
            // _this.priceOpreation(); //加减操作
            _this.productId = ''; //选中的产品id
            _this.protime = ''; //选中的产品期数
            _this.PRODUCTS = "" //所有的产品对象
            _this.getMerInfo(); //获取商户列表
            _this.merChange(); //商户列表change事件获取产品
            _this.proChange(); //产品选中
            _this.timeChange(); //期数选中
            _this.submit();
        },
        // 获取商户列表
        getMerInfo() {
            var _this = this;
            var merhtml = '';
            MyAjax.send({
                config: {
                    url: "product/merInfo.json",
                    data: {
                        productType: 1
                    }
                },
                success: (ajaxdata) => {

                    if (ajaxdata) {
                        ajaxdata.forEach(mer => {
                            merhtml += `<option value="${mer.id}">${mer.merchantName}</option>`;

                        })
                        $('#insuranceCompany').append(merhtml);
                    } else {
                        // VALIDATEUTIL.showErrorMsg('暂无保险公司，无法购买');
                    }
                    // location.href = '/pages/order/orderdetail.html?orderid=' + 123;
                },
            }); //end ajax
        },
        // 商户change事件获取产品列表
        merChange() {
            var _this = this;
            $('#insuranceCompany').change(function () {
                var merid = $(this).find('option:selected').val();
                if (merid) {
                    $('#productName option').not(":first").remove();
                    $('#time option').not(":first").remove();
                    _this.getProduct(merid); //根据商户获取所有产品
                } else {
                    $('#productName option').not(":first").remove();
                    $('#time option').not(":first").remove();
                }
            })
        },
        //产品列表change事件确定选中的产品
        proChange() {
            var _this = this;
            $('#productName').change(function () {
                _this.productId = $(this).find('option:selected').val();
                if (_this.productId) {
                    _this.gerProductTime();
                } else {
                    $('#time option').not(":first").remove();
                }
            })
        },
        // 产品期数选中change事件
        timeChange() {
            var _this = this;
            $('#time').change(function () {
                _this.protime = $(this).find('option:selected').val();
                if (_this.protime) {
                    var productSelted = _.findWhere(_this.PRODUCTS, {
                        id: parseInt(_this.productId)
                    });
                    var productSeltedTime = _.findWhere(productSelted.productCycle, {
                        id: parseInt(_this.protime)
                    });
                    if (productSeltedTime) {
                        $('.showrate').val(productSeltedTime.rate + '%');
                    }
                }
            })
        },
        //获取选中产品的分期期数列表
        gerProductTime() {
            var _this = this;
            var timeHtml = "";
            var productSelted = _.findWhere(_this.PRODUCTS, {
                id: parseInt(_this.productId)
            });
            if (productSelted.productCycle) {
                productSelted.productCycle.forEach(pro => {
                    timeHtml += `<option value="${pro.id}">${pro.cycle}期</option>`;

                })
                $('#time').append(timeHtml);
            }
        },
        // 获取所有产品
        getProduct(merid) {
            var _this = this;
            var proHtml = '';

            MyAjax.send({
                config: {
                    url: "product/all.json",
                    data: {
                        merId: merid
                    }
                },
                success: (ajaxdata) => {
                    console.log(ajaxdata)

                    if (ajaxdata) {
                        _this.PRODUCTS = ajaxdata;
                        // 循环显示产品期数
                        ajaxdata.forEach(pro => {
                            proHtml += `<option value="${pro.id}">${pro.price}元</option>`;

                        })
                        $('#productName').append(proHtml);
                    } else {
                        // VALIDATEUTIL.showErrorMsg('暂无保险公司，无法购买');
                    }
                },
            }); //end ajax
            // 产品期数选中change事件
            $('#time').change(function () {
                _this.protime = $(this).find('option:selected').val();
            })
        },
        submit() {
            var _this = this;
            // 提交方法
            $('.submitdiv button').click(function () {
                var THIS = this;
                if (!_this.varlidate()) {
                    return false;
                }
                $(THIS).prop('disabled', true);
                MyAjax.send({
                    config: {
                        url: "order/submit.json",
                        data: {
                            userId: _this.userId,
                            productId: _this.productId,
                            productCycleId: _this.protime,
                            amount: ''
                        }
                    },
                    success: function (ajaxdata) {
                        if (ajaxdata == '{status:1}') {
                            CARUTILS.UrlPath.set('/pages/user/veriyInfo.html');
                        } else {
                            location.href = '/pages/order/orderdetail.html?orderid=' + ajaxdata;
                        }
                    },
                    unLogin: () => {
                        CARUTILS.UrlPath.set('/pages/user/login.html');
                    },
                    error: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    failure: (msg) => {
                        VALIDATEUTIL.showErrorMsg(msg);
                    },
                    complete: function () {
                        $(THIS).prop('disabled', false);
                    }

                }); //end ajax

            })
        },
        // 提交验证
        varlidate() {
            var _this = this;
            _this.userId = window.localStorage.getItem('carcfuid');
            var company = $('#insuranceCompany option:selected').val();
            var productName = $('#productName option:selected').val();
            var time = $('#time option:selected').val();

            if (!company) {
                VALIDATEUTIL.showErrorMsg('请选择商户');
                return false;
            }
            if (!productName) {
                VALIDATEUTIL.showErrorMsg('请选择产品');
                return false;
            }
            if (!time) {
                VALIDATEUTIL.showErrorMsg('请选择分期期数');
                return false;
            }

            return true;
        },


    }

    carinsurance.init();
});