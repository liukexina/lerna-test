# lerna2

## 项目介绍
使用lerna 开发管理 lerna2

该项目包含 init、create 命令

## 使用
全局安装lerna

```
npm install -g lerna 
```

安装依赖
```
lerna boostrap
```

## 测试
根目录下执行npm link将lerna2 link到全局

然后执行以下方法
```
lerna2 init
lerna2 create demo1
```