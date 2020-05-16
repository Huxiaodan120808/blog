# ICommon-UI-Docs

## Project setup
```
yarn install
# 或：npm install
```

## Compiles and hot-reloads for development
```
yarn dev
# 或：npm run dev
```

## Compiles and minifies for production
```
yarn build
# 或：npm run build
```

## Development configure
.vuepress目录下的config.js
导航栏：themeConfig.nav增加导航栏链接
侧边栏：themeConfig.sidebar增加侧边栏链接
  新增文件 xx.md 需要将文件添加到themeConfig.sidebar参数数组中，重新编译才可以访问到
