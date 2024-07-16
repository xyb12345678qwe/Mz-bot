import { botConfigSet } from 'mz-botjs'
const newbot = new botConfigSet()
const args = process.argv.slice(2);

if (args.includes("set")) {
    newbot.runSelect() //进行机器人配置
} else if (args.includes("run")) {
    newbot.run() //运行机器人
}