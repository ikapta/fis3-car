##使用fis

###切换到cnpm
由于npm安装慢，可以切换到淘宝的cnpm命令，
执行命令：`npm install -g cnpm --registry=https://registry.npm.taobao.org`，然后下面的命令都可以 `cnpm install [name]`

### 1.安装过程
 * 安装nodejs 
 * 安装fis3 `npm install -g fis3 `
 * 安装package: `cnpm install` (如果经常切换分支的话，建议全局安装 cnpm install -g)

### 2.开发过程
* cmd进入开发目录`..src/`
* 执行命令-启动本地服务 `fis3 server start` (只需要执行一次)
* 执行命令-发布项目 `fis3 release debug -wL` (自动将开发目录`src`下面的文件全部发布到自带的服务器中，)

### 3.发布到build目录 
* 执行命令-发布项目 `fis3 release build `  

### 4.由于fis3 的命令都很长，熟悉了之后可以使用 make（mac,linux默认支持命令） 命令
  * eg: `make d` ===`fis3 release debug -wL` 
  * 具体看Makefile文件

样式md5，js压缩合并，es6支持