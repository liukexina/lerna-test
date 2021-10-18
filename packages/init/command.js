exports.command = 'init';
exports.describe = "创建一个新的lerna仓库";

exports.builder = () => {  // 构建器
  // console.log('init builder')
};

// init命令真正的处理逻辑
exports.handler = function handler(argv) {  // 处理器
  // console.log('执行init命令', argv)
  return require(".")(argv);
};