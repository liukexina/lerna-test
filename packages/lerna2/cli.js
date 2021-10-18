#!/usr/bin/env node 

// 告诉执行脚步的人是node脚本  从环境变量中找到node命令

require(".")(process.argv.slice(2));