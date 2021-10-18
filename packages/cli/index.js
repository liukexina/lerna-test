const yargs = require("yargs/yargs");  // 解析命令行参数

function lernaCLI() {
  const cli = yargs();
  // 所有命令的全局选项
  const globalOptions = {
    loglevel: {
      defaultDescription: "info",
      describe: "What level of logs to report.",
      type: "string",
      alias: '别名'
    },
  }

  const globalKeys = Object.keys(globalOptions).concat(["help", "version"]);
  return cli.options(globalOptions)
    .group(globalKeys,'Global Options:')   // 分组
    .usage("Usage: $0 <command> [options]")  // lerna create demo 使用说明
    .demandCommand(1, "A command is required. 至少需要一个命令") //设置最少命令个数
    .strict() // 严格模式 输入命令不认识 会报错，否则什么不发生不显示
    .recommendCommands()  // 如果写错了 会帮你提建议
    .fail((msg, err) => {
      console.log(msg);
      console.log(err);
      // 个性化错误展示
    })
    .alias("h", "help")  // 别名
    .alias("v", "version")  // 别名
    .epilogue(
      'When a command fails, all logs are written to lerna-debug.log in the current working directory.'
    ); // 结语
}

module.exports = lernaCLI;