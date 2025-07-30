import log4js from 'log4js'
  // 加载配置文件
log4js.configure(
    {
      "appenders": {
        "console": {
          "type": "console",
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

export const logger = log4js.getLogger();