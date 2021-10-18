exports.command = 'create <name>';
exports.describe = "Create a new Lerna 管理的包";

exports.builder = (yargs) => {  // 构建器
  // console.log('init builder')
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
};

// init命令真正的处理逻辑
exports.handler = function handler(argv) {  // 处理器
  // console.log('执行init命令', argv)
  return require(".")(argv);
};