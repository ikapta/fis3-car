/**
 *  常用命令
 * 
 *  本地开发：fis3 release -wL   (发布到本地服务器目录，加-wl 同时监听文件变动和自动刷新浏览器)
 *           fis3 server start  (打开fis3自带的服务器)
 *           fis3 server open   (打开服务器目录)
 *           fis3 server clean  (清空服务器目录)
 * 
 * 构建到build目录：
 *           fis3 release build 
 */

//编译sass 以及md5处理
//需安装 npm install fis-parser-node-sass,fis3-preprocessor-autoprefixer -g
fis.match(/^(?!_).+scss/, {
    rExt: '.css',
    preprocessor : fis.plugin("autoprefixer",{
        // "browsers": ["last 2 versions"]
    }),
    parser: fis.plugin('node-sass', {
        success: function (css) {
            // console.log(css)
        }
    }),
    useHash: true,
    optimizer: fis.plugin('clean-css')
});


//可以使用es6的语法，但模块化暂不支持
//es6开头必须要用严格模式，所以注意js写法，结尾必须要有分号等...
//可以查看此链接注意事项：https://segmentfault.com/a/1190000000517498
//安装插件 npm install -g fis-parser-es6-babel
//默认jsresource下面的文件都会进行es6处理，
fis.match('jsresource/**.js', { 
    parser: fis.plugin('es6-babel'),
});


//压缩图片
fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

//发布的时候忽略以下目录或文件
fis.set('project.ignore', [
  'output/**',
  'node_modules/**',
  '.git/**',
  '.svn/**',
  'package.json',
  'map.json',
  'Makefile',
  'fis-conf.js'
]);

// 开发命令
fis.media('debug').match('*.{js,css,png}', {
        useHash: false,
        useSprite: false,
        optimizer: null
    });

//构建到build发布目录
fis.media('build')
    .match('{jsresource/**.js,jscomponent/**.js,jsbackend/**.js}', {
        // 通过 uglify 压缩 js
        // 记得先安装：
        // npm install [-g] fis-optimizer-uglify-js
        optimizer: fis.plugin('uglify-js')
    })
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            useInlineMap: true, //使用内联模块静态表
            allInOne: {
                includeAsyncs: true,
                ignore: ['/lib/**'],
                js: function (file) {
                    // if(file.filename.indexOf('carinsurance')>-1){
                    //     console.log(file);
                    // }
                    // return "/static/"+file.subdirname+'/' + file.filename + "_aio.js?d=" + (new Date()).getTime();
                    return "/static/js/" + file.filename + "_aio.js?d=" + (new Date()).getTime();
                },
            }
        })
    })
    // build需要移动的文件（除去本地开发js文件）
    //map.json文件记录了文件合并md5的相关信息
    .match('!jsresource/**', {
        deploy: fis.plugin('local-deliver', {
            to: '../build'
        })
    });
