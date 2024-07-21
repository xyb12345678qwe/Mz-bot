# 介绍
本框架支持``LLoneBot``连接qq

支持连接``q群bot``

支持使用``早柚核心``

支持使用``Lagrange``

支持使用``kook``

# 开始
gitee
```sh
git clone https://gitee.com/xyb12345678qwe/mz-bot
```
github
```sh
git clone https://github.com/xyb12345678qwe/mz-bot
```
执行上述任意指令后
```js
cd mz-bot
npm i yarn -g
yarn i
npm run start 配置名(默认为test) LLOneBot ntqq
```
``LLOneBot``启动无需配置，正向ws会自动连接qq,连接新框架qq,如何安装见安装教程

``ntqq``是q群bot,如何配置见文档

``Lagrange``是一个连接连接新框架qq的协议，如何配置见文档

``kook``是kook机器人

注:启动指令是暂时的,后续会进行更改
# 一键下载脚本
在安装机器人的目录下以git bash执行
```sh
curl -sL https://gitee.com/xyb12345678qwe/mz-bot/raw/master/src/sh/install.sh -o install.sh & sh install.sh
```
# 开发
```sh
npm run dev LLOneBot 开启热开发
```
plugins目录下有示例插件,后续会出对应文档
# 指令配置平台
在机器人人根目录下执行
配置
```
npm run set
```
运行
```
npm run run
```
# 配置文件
在config文件夹下``config.yaml``
# 使用
使用本机器人连接LLoneBot需要先安装LLoneBot
安装教程见 [LLoneBot](https://boke.mzbs.top/index.php/2024/07/08/%e5%ae%89%e8%a3%85llonebot/)

# 文档
[文档](https://docs.mzbs.top/)

# 早柚核心
[早柚核心](https://docs.sayu-bot.com)

根据文档下载``早柚核心``

然后在空启动一次机器人
```
npm run start
```
会自动生成一些配置文件

先启动早柚核心

登录上控制面板,进行一些配置

点击修改插件设定

在``core``中开启关于``图片转链接发送``的选项

有一项需填ip,先暂时填``http://127.0.0.1:8765``

如需使用kook机器人,需在``GsCore发送图片``中,将``kook``图片发送改为``link``

在``config/config/config.yaml``中将``GSUIDCore``改为``true``开启``早柚核心``连接

# 作者
1:名字(qq:3407318235)
# 交流群
1:902225646
