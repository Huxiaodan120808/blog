# Vue项目分环境打包

> 在项目开发中，我们的项目一般分为开发版、测试版、Pre版、Prod版。Vue-cli的默认环境一只有dev和prod两个，之前每次要发布测试版或Pre版都是修改了源码中API地址后打包，这样很麻烦。如果能根据不同环境打包就完美了


## 基于Vue-cli2.x创建的项目

### 安装cross-env

在项目目录下根据如下命令安装cross-env

```sh
npm i --save-dev cross-env
```

### 修改各环境下的参数

在`config/`目录下增加`test.env.js`、 `pre.env.js`、 `prod.env.js`. 

修改`prod.env.js`里的内容，修改后的内容大致如下：

```js
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  EVN_CONFIG:'"prod"',
  API_ROOT:'"/apis/v1"'
}
```
修改`test.env.js`和`pre.env.js`文件中的内容，如下：

```js
'use strict'
module.exports = {
  NODE_ENV: '"testing"',
  EVN_CONFIG:'"test"',
  API_ROOT:'"/test/apis/train"'
}
```

```js
'use strict'
module.exports = {
  NODE_ENV: '"presentation"',
  EVN_CONFIG:'"pre"',
  API_ROOT:'"/pre/apis/train"'
}
```

对`dev.env.js`文件内容进行内容，修改后的内容如下：

```js
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG: '"dev"',
  API_ROOT: '"api/apis/v1"'
})
```

### 修改项目中的package.json文件

对package.json文件中的scripts内容进行修改，添加自定义的几种环境的打包过程，命令中的参数配置要与config中定义的环境变量一致

```js
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "start": "npm run dev",
  "build": "node build/build.js",
  "build:test": "cross-env NODE_ENV=production env_config=test node build/build.js",
  "build:pre": "cross-env NODE_ENV=production env_config=pre node build/build.js",
  "build:prod": "cross-env NODE_ENV=production env_config=prod node build/build.js"
}
```

:::warning
在这里，NODE_ENV最好都设成production，因为在utils.js只做了production一种判定
:::

修改`config/index.js`文件中`build`参数, 这里的参数会在`build/webpack.prod.conf.js`中使用到

```js
build:{
  // Template for index.html
  // 添加test pre prod 三处环境的配制
  prodEnv: require('./prod.env'),
  preEnv: require('./pre.env'),
  testEnv: require('./test.env'),
  
  //下面为原本的内容，不需要做任何个性
  index:path.resolve(__dirname,'../dist/index.html'),
```

### 在webpack.prod.conf.js中使用构建环境参数

对`build/webpack.prod.conf.js`文件进行修改，调整`env`常量的生成方式
```js
// 个性env常量的定义
// const env = require('../config/prod.env')
const env = config.build[process.env.env_config + 'Env']
```

### 调整build/build.js

删除`process.env.NODE_ENV`的赋值, 修改`spinner`的定义, 调整后的内容如下

```js
'use strict'
require('./check-versions')()

// 注释掉的代码
// process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

// 修改spinner的定义
// const spinner = ora('building for production...')
var spinner = ora('building for ' + process.env.NODE_ENV + ' of ' + process.env.env_config + ' mode...' )
spinner.start()

//更多的其它内容，不需要做任何调整的内容 ... 
```

### 在代码中使用

在代码中使用环境变量代替，如API地址

```js
//Axios.defaults.baseURL = "/apis/v1"
Axios.defaults.baseURL = process.env.API_ROOT
```

## 基于Vue-cli3.x创建的项目

> 只需要三个步骤即可实现根据环境不同而自动改变请求域名的需求，不需手动更改. 通过改变`process.env.NODE_ENV`值区分打包环境，但是webpack打包时针对`process.env.NODE_ENV===‘production’`和其他情况打出来的包结构和大小都不一样；为了消除这种差异，可以使用其他变量比如`process.env.VUE_APP_ENV_CONFIG`来区分环境

### package.json增加环境打包命令

```js
"scripts": {
    "serve": "vue-cli-service serve", //本地运行，会把process.env.NODE_ENV设置为‘development‘
    "test": "vue-cli-service build --mode test",//设置第二部的文件之后运行此命令会把process.env.NODE_ENV设置为‘production‘
    "build": "vue-cli-service build --mode build"//设置第二部的文件之后运行此命令会把process.env.NODE_ENV设置为‘production‘
  }
```

### 在项目根目录下增加环境配置文件`.env.test` 和 `.env.production`

```js
NODE_ENV='production'
# 区分环境
VUE_APP_ENV_CONFIG='test'
```

```js
NODE_ENV='production'
# 区分环境
VUE_APP_ENV_CONFIG='production'
```

### 区分环境，在`vue.config.js`中增加配置

```js
// 区分环境的变量
var env = process.env.NODE_ENV === 'development' ? 'development' :
    process.env.VUE_APP_ENV_CONFIG
// 根据不同环境配置接口请求地址 
if (env==="development") {
  axios.defaults.baseURL = "本地环境域名"
} else if (env==="alpha") {
  axios.defaults.baseURL = "测试环境域名"
} else if (env==="production") {
  axios.defaults.baseURL = "上线环境域名"
} 
```