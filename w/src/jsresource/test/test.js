// 测试es6常用语法

// 字符串拼接
var sss = `<span></span>`;
var tel = carUtils.parseMobile('13761289823');
console.log(tel);
var mmm = `<span style="color:red">手机号码：${tel}</span>`;
$('body').prepend(mmm)

// 测试es6函数以及默认参数
var testFun = (arg1 = 'hello', arg2 = 'world') => {
    console.log(arg1);
    console.log(arg2);
}
testFun();
testFun('ka', 'le');

[1, 2, 3].forEach(item => console.log(item)); //只有单行语句

[1, 2, 3].forEach(item => {
        console.log(item)
    }) //多行