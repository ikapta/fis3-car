 $(function () {

     var home = {

         init: function () {
             var _this = this;
              VALIDATEUTIL.showErrorMsg('你好');
             $('.link').click(function () {
                 var returnurl = $(this).data('href');


                 MyAjax.send({
                     config: {
                         url: 'user/login/check.json'
                     },
                     success: (data) => {
                        window.localStorage.setItem('carcfuid', data.id);
                         location.href = returnurl;
                     },
                     unLogin: () => {

                         location.href = '/pages/user/login.html?returnurl=' + returnurl;
                     },
                     failure: (data) => {
                         VALIDATEUTIL.showErrorMsg(data);
                     },
                     error: (msg) => {
                         VALIDATEUTIL.showErrorMsg(msg);
                     }
                 }); //end 发送验证码


             })

         },

     }
     home.init();
 })