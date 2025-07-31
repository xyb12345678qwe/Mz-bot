# 介绍

`mz-bot`是一个多平台高性能的机器人框架,经历多次重构

# 支持平台

1: OneBot

# 安装教程

```bash
npm i create-mz-bot

create-mz-bot
```

# 安装适配器

## OneBot

```
npm i @mz-botjs/adapter-onebotv11
```
# 插件模板
请在`plugins`文件夹下创建你的插件文件夹

在插件文件夹`根目录`中创建index.ts文件

并写入以下代码
```ts
import { Plugin, Middleware } from '@mz-botjs/core';

export default {
  name: 'plugin',
  install() {
    console.log('plugin installed');
  },
  
  middlewares: [
  ],
  
  events: {
    'message_create_group': [help] //群聊消息事件
    'message_create_private': [help] //私聊消息事件
    'message_create': [help] //群,私聊消息事件
  }
} satisfies Plugin;

import { Text } from '@mz-botjs/core'

export const help = async (ctx) => {
  if(!isMatch(ctx.payload.UserText, /^(#|\/)?蛊界菜单$/)) return;
  await ctx.payload.reply(Text('你好'));
}

//判断消息是否符合正则
export const isMatch = (message: string, regex: RegExp): boolean => {
  return regex.test(message);
};
```
# 作者

1: 名字(3407318235)

# 官方群聊

QQ:902225646