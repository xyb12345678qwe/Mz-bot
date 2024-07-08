import log4js from 'log4js'
import path from 'path'
import { DirPath } from '../../config.js'
// 加载配置文件
log4js.configure(
    {
  "appenders": {
    "console": { "type": "console",
    "layout": {
          "type": 'pattern',
          "pattern": "%[[Mz-bot][%d{hh:mm:ss.SSS}][%4.4p]%] %m"
        } 
      },
    "file": {
      "type": "file",
      "filename": "logs/app.log",
      "maxLogSize": 10485760,
      "backups": 3,
      "compress": true
    }
  },
  "categories": {
    "default": { "appenders": ["console", "file"], "level": "info" }
  }
}

);

// 获取logger对象
export const logger: Log4jsLogger = log4js.getLogger();
//定义类型
interface Log4jsLogger {
    info: (msg: any, ...args: any[]) => void;
    warn: (msg: any, ...args: any[]) => void;
    error: (msg: any, ...args: any[]) => void;
    debug: (msg: any, ...args: any[]) => void;
    trace: (msg: any, ...args: any[]) => void;
    log: (msg: any, ...args: any[]) => void;

}

declare global {
    interface Global {
        logger: Log4jsLogger;
    }
    var logger: Log4jsLogger;
}


global.logger = logger;
// logger.info('This is an info message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');
