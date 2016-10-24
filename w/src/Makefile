# 生成开发目录
d:
	fis3 release debug -wL
	
# 生成build目录
b:
	fis3 release build

# 生成temp目录
t:
	fis3 release temp

# 清空 fis3 自带服务器目录(h5 pc执行debug 都会生成在同一个目录)
c:
	fis3 server clean

# 启动debug服务器
s:
	fis3 server start

# 打开debug目录
o:
	fis3 server open

a:
	make c && make s && make d

.PHONY: d b t c s o a