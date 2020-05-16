# icomm-cli

IT前端脚手架工具，为更好使用前端模版搭建的脚手架工具

> 在使用前请保证已经配置好内部的npm源，配置方法请参考[onpm](/ecology/onpm)

## 安装

```sh
npm install -g icomm-cli
```

## 使用
打开终端，输入icomm 或者 icomm -h, 可以看到如下命令

```sh
Usage: icomm <command> [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add            add a new template
  delete         delete a template
  list           list all the templates
  init           generate a new project from a template
  help [cmd]     display help for [cmd]
```

## 通过脚手架工具初始化前端模版

* 初始化PC端模版

```sh
icomm init icomm-pc `${projectName}`
```

`projectName`为自定义项目名

* 初始化H5端模版

```sh
icomm init icomm-h5 `${projectName}`
```
`projectName`为自定义项目名
