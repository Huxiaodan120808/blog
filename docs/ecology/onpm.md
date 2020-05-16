# onpm

[onpm](http://onpm.adc.com/) 是私有部署的npm仓库, 也可作为npm内部镜像

## onpm使用

### 安装nrm

nrm可以用来管理自己的npm代理，可以快速修改，切换，增加你的npm镜像地址

```sh
npm install -g nrm
```

### 增加私有仓库

```sh
nrm add onpm http://onpm.adc.com
```

查看 
```sh
nrm ls

npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/
onpm --- http://onpm.adc.com/
```
切换到npm仓库

```sh
nrm use onpm
```

创建账号
```sh
npm adduser
```
如果在npm分支，则需要说明在那个分支上注册
```sh
npm adduser --registry http://onpm.adc.com/

#创建账号

Username: chen8ih
Password: 
Email: (this IS public) chenhang@oppo.com
Logged in as chen8ih on http://onpm.adc.com/
```
登陆
```sh
npm login

Username: chen8ih
Password:
Email: (this IS public) chenhang@oppo.com
Logged in as chen8ih on http://onpm.adc.com/.
```

### 发布依赖包到onpm中

进入需要发布的包的根目录，执行
```sh
npm publish
```

发布成后，即可进入http://onpm.adc.com/查看发布的包

### 用户安装使用

以icomm-cli为例

>如果nrm已经安装，则可以不用执行nrm安装命令

```sh
npm install -g nrm
nrm add onpm http://onpm.adc.com
nrm use onpm
npm install -g icomm-cli
```
