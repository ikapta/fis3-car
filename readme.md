##使用fis

###切换到cnpm
由于npm安装慢，可以切换到淘宝的cnpm命令，
执行命令：`npm install -g cnpm --registry=https://registry.npm.taobao.org`，然后下面的命令都可以 `cnpm install [name]`

### 1.安装过程
 * 安装nodejs 建议4.0稳定版本
 * 安装fis3 `npm install -g fis3 ` (当前版本v3.3.21)
 * 安装node-sass **现在的css尽量使用sass写法，fis3自动将后缀.scss改为.css**
  1）` npm install -g node-sass`
  2）` npm install -g fis3-parser-node-sass` 
  3) ` npm install -g  fis3-preprocessor-autoprefixer`
  4）` npm install -g fis-optimizer-uglify-js` （fis3已内置无需安装，如若提示即要安装）
  5) ` npm install -g fis-parser-es6-babel` (解析es6语法)
  6）` npm install -g fis3-postpackager-loader` jscss合并压缩包管理

  (如果运行的时候提示libsass失败什么的，尝试安装 `npm install -g fis-parser-node-sass` 或者卸载node重新装fis3)
### 2.开发过程
* cmd进入开发目录`..src/`
* 执行命令-启动本地服务 `fis3 server start` (只需要执行一次)
* 执行命令-发布项目 `fis3 release debug -wL` (自动将开发目录`src`下面的文件全部发布到自带的服务器中，)

### 3.发布到build目录 
* 执行命令-发布项目 `fis3 release build `  

> 本地开发只需要提交**src目录到svn**,无需执行**步骤3**命令，上线的时候操作。

### 4.由于fis3 的命令都很长，熟悉了之后可以使用 make（mac,linux默认支持命令） 命令
  * eg: `make d` ===`fis3 release debug -wL` 
  * 具体看Makefile文件

样式md5，js压缩合并，es6支持