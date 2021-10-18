const fs = require("fs-extra");
const path = require("path");
const execa = require('execa')
// const pMap = require("p-map");
// const writeJsonFile = require("write-json-file");

// const { Command } = require("@lerna/command");
// const childProcess = require("@lerna/child-process");

class InitCommand {
  constructor(options) {
    this.options = options
    this.rootPath = path.resolve();
  }

  async execute() {
    console.info("Initializing Git repository");
    await execa("git", ["init"], {stdio: "pipe"});  // 初始化git仓库
    await this.ensurePackageJSON();
    await this.ensureLernaConfig();
    await this.ensurePackagesDir();
    console.info(("Initialized Lerna files"))
  }

  async ensurePackageJSON() {
    console.info('创建package.json');
    await fs.writeJson(path.join(this.rootPath, 'package.json'), {
      "name": "root",
      "private": true,
      "devDependencies": {
        "lerna": "^4.0.0"
      }
    }, {spaces: 2})
  }

  async ensureLernaConfig() {
    console.info('创建lerna.json');
    await fs.writeJson(path.join(this.rootPath, 'lerna.json'), {
      "packages": [
        "packages/*"
      ],
      "version": "independent",
    }, {spaces: 2})
  }

  async ensurePackagesDir() {
    console.info('创建packages');
    await fs.mkdirp(path.join(this.rootPath, "packages"))
  }

}

function factory(argv) {
  new InitCommand(argv).execute();
}

module.exports = factory;