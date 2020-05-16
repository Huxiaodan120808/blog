# Vue项目文件/文件夹命名规范

> **文件夹及文件命名遵循一下规范**
>  + `index.vue` 和 `index.js`，统一使用小写字母开头命名规范
>  + 属于组件的，统一使用大写字母开头（**PascalCase**）命名规范
>  + 其他非组件或者类的，统一使用小写字母开头（**kebab-case**）命名规范




## 1. 文件夹命名规范
属于`components`文件夹下面的子文件夹，采用大写字母开头（**PascalCase**）命名规范

1. 全局组件方在/src/components下
2. 其他业务页面的组件，放在各自字面下的./components文件夹下
3. 每个components下<font color='red'>最多只有一层文件夹</font>，且文件夹应为组件名，文件夹下面必须有index.js或者index.vue. 其他Vue文件统一使用大写字母开头（**PascalCase**）命名规范


#### 其他文件夹统一使用小写字母开头（kebab-case）命名规范


/src/components命名规范示例
```sh
- [components]
    - [Breadcrumb]
      - index.vue
    - [Hamburger]
      - index.vue
    - [SvgIcon]
      - index.vue
```

业务组件内部封装的组件，以/src/views/layout/components命名规范示例
```sh
-[src]
  - [views]
    - [layout]
      - [components]
        - [Sidebar]
          - index.vue
          - Item.vue
          - SidebarItem.vue
        - AppMain.vue
        - index.js
        - Navbar.vue
```
index.js导出组件方式如下
```js
export { default as Sidebar } from './Sidebar'
```

## 2. 文件命名规范
#### 2.1 `*.js`文件命名规范

+ 其他类型的`.js`文件，<font color='red'>使用kebab-case风格</font>


#### 2.2 `*.vue`文件命名规范

针对components下的vue类型文件，除index.vue外，统一采用大写字母开头（**PascalCase**）命名规范

对于其他类型vue类型文件，统一使用小写字母开头（**kebab-case**）命名规范，尽量以一个单词表示



#### 2.3 `*.less/*.scss`文件命名规范

统一使用小写字母开头（**kebab-case**）命名规范




