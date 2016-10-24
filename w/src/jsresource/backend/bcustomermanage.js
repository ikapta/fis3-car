$(function () {

    var bcustomermanage = {
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
                    url: "merchant/client/info/query.json",
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
            ajaxdata.clientInfo.forEach((item, index) => {
                tbhtml += `<tr>
                            <td>${index}</td>
                            <td>${item.userId}</td>
                            <td>${item.userName}</td>
                            <td>${item.birthday}</td>
                            <td>${item.userPhone}</td>
                            <td>${item.registerTime}</td>
                            <td>${item.totalAmt}</td>
                        </tr>`
            })
            var diff = _this.pageSize - ajaxdata.clientInfo.length;

            while (diff > 0) {
                diff--;
                tbhtml += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
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
                // userId: '',
                userName: '', // 客户姓名
                userPhone: '', // 客户手机号
                registStartTime: '', // 查询条件：注册时间起始值
                registEndTime: '' // 查询条件：注册时间终止值
            }
            _this.strSmodal = JSON.stringify(_this.smodal);
        }


    }
    bcustomermanage.init()
})