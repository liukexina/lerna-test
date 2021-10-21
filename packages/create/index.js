const fs = require("fs-extra");  // fs
const path = require("path");
const initPackageJson = require("pify")(require("init-package-json"));

class CreateCommand {
  constructor(options) {
    this.options = options
    this.rootPath = path.resolve();
  }

  async execute() {
    const {name, registry } = this.options;
    const targetDir = path.join(this.rootPath, `packages/${name}`);
    await fs.mkdirp(path.join(targetDir, 'lib')); 
    await fs.mkdirp(path.join(targetDir, '__tests__'))

    // init-package-json 弹出选项让我们天蝎package.json信息
    // pify 可以把一个回调方式改为promise方式
    await initPackageJson(targetDir, '')
   
    console.info(("新包创建成功"))
  }

}

function factory(argv) {
  new CreateCommand(argv).execute();
}

module.exports = factory;