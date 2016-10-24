$(function () {

    var borderoperate= {
        init() {
            var _this = this;
            _this.pageSize = 8;
            _this.searchModal();
            _this.loadTable();
        },
        loadTable(curr) {
            var _this = this;

            MyAjax.send({
                config: {
                    url: "merchant/order/list.json",
                    data: {
                        size: _this.pageSize,
                        page: curr || 1,
                        data: _this.strSmodal
                    }
                },
                success: (ajaxdata) => {
                    _this.showTableData(ajaxdata,curr);
                },
                error: (msg) => {
                    console.log(msg)
                },
                failure: (msg) => {
                    console.log(msg)
                },
                unLogin: () => {
                    //  CARUTILS.UrlPath.set('/pages/backend/blogin.html'); 
                }

            })

        },
        showTableData(ajaxdata,curr) {
            var _this = this;
            var tbhtml = '';
            var totals = Math.ceil(ajaxdata.total / _this.pageSize); //分页总数
            ajaxdata.orders.forEach((item, index) => {
                item.createTime=CARUTILS.fmtDate(new Date(item.createTime),'yyyy-MM-dd');
                tbhtml += `<tr>
                            <td>${item.orderId}</td>
                            <td>${item.productName}</td>
                            <td>--</td>
                            <td>${item.userName}</td>
                            <td>${item.userPhone}</td>
                            <td>${item.applyAmt}</td>
                            <td>${item.status}</td>
                            <td>${item.createTime}</td>
                            <td>${item.createTime}</td>
                        </tr>`;
            })
            var diff = _this.pageSize - ajaxdata.orders.length;

            while (diff > 0) {
                diff--;
                tbhtml += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            }
            $('.tbdodydata').html(tbhtml);
            //showdata
            laypage({
                cont: $('#page1'), //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: totals, //通过后台拿到的总页数
                curr: curr || 1, //当前页
                skip: true, //是否开启跳页
                jump: function (obj, first) { //触发分页后的回调
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        _this.loadTable(obj.curr);
                    }
                }
            });
        },

        searchModal() {
            var _this = this;
            _this.smodal = {
                userName:'',        // 姓名
                userPhone:'',       // 手机
                orderId:'',         // 订单号
                orderType:'',       // 订单类型
                orderStatus:'',     // 订单状态
                createTime1:'',     // 下单起始时间
                createTime2:'',     // 下单终止时间
                payTime1:'',        // 支付起始时间
                parTime2:'',        // 支付终止时间
            }
            _this.strSmodal = JSON.stringify(_this.smodal);
        }


    }
    borderoperate.init()
})