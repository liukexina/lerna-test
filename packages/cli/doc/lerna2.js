const yargs = require("yargs/yargs");  // 解析命令行参数

console.log(process.argv)
// node lerna2.js create demo
// [
//   '/Users/lkx/.nvm/versions/node/v12.14.1/bin/node', //node路径
//   '/Users/lkx/Documents/learn-code/lerna-test/packages/cli/doc/lerna2.js', //文件名
//   'create',
//   'demo'
// ]

// 获取命令行参数
const argv = process.argv.slice(2); // ['create', 'demo']
const cli = yargs(argv);

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
cli.options(globalOptions)
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
  ) // 结语
  .command({  // 配置命令
    command: "create <name> [loc]", // 命令格式
    describe: "Create a new lerna-managed package", // 命令描述
    builder: (yargs) => {
      yargs
        .positional("name", {   // 位置参数
          describe: "The package name",
          type: "string",
        })
        .options({
          registry: {
            group: "Command Options:",  
            describe: "Configure the package's publishConfig.registry",
            type: "string",
          },
          private: {
            group: "Command Options:",
            describe: "Make the new package private, never published to any external registry",
            type: "boolean",
          },
          tag: {
            group: "Command Options:",
            describe: "Configure the package's publishConfig.tag",
            type: "string",
          },
          y: {
            group: "Command Options:",
            describe: "Skip all prompts, accepting default values",
            alias: "yes",
            type: "boolean",
          },
        });
    },
    handler: (argv) => {
      console.log('执行init命令', argv)
    }
  })
  .parse(argv)

