# Vue编码规范

## 1 模板
#### 1.1 [强制]为 `v-for` 设置键值
**总是用 `key` 配合 `v-for`。**

在组件上总是必须用 `key` 配合 `v-for`，且不应使用 `index` 作为 `key`。
```vue
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
#### 1.2 [强制]避免 `v-if` 和 `v-for` 用在一起
```vue
// 反例
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```
通过将其更换为在如下的一个计算属性上遍历：
```js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```
#### 1.3 [强制]模板中简单的表达式
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。
```js
// 反例
{
  {
    fullName
      .split(' ')
      .map(function(word) {
        return word[0].toUpperCase() + word.slice(1)
      })
      .join(' ')
  }
}
```
```js
// 好例子
<!-- 在模板中 -->
{{ normalizedFullName }}
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
#### 1.4 [强制]指令缩写
指令缩写 (用 `:` 表示 `v-bind`: 和用 `@` 表示 `v-on`:) 应该要么都用要么都不用。

#### 1.5 [强制]模板里尽量不写内联样式，可使用原子类
```vue
// 反例
<div style="margin-top: 10px">内容</div>

// 好例子
<div class="m-t-10">内容</div>
```
#### 1.6 [强制]带引号的特征值
非空 `HTML` 特性值应该始终带引号
```vue
// 反例
<AppSidebar :style={width:sidebarWidth+'px'}>

// 好例子
<AppSidebar :style="{ width: sidebarWidth + 'px' }"></AppSidebar>
```
#### 1.7 [强制]多个特性的元素
多个特性的元素在长度过长时应该分多行撰写，每个特性一行。
```vue
// 反例
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo" foo="a" bar="b" baz="c">

// 好例子
<img 
  src="https://vuejs.org/images/logo.png" 
  alt="Vue Logo" 
  foo="a" 
  bar="b" 
  baz="c"
>
```
#### 1.8 [建议] `v-if` `v-else`结合 key 排除错误
**如果一组 `v-if + v-else` 的元素类型相同，最好使用 `key` (比如两个 `<div>` 元素)。**
```vue
// 反例
<div v-if="error">
  错误：{{ error }}
</div>
<div v-else>
  {{ results }}
</div>

// 好例子
<div v-if="error" key="search-status">
  错误：{{ error }}
</div>
<div v-else key="search-results">
  {{ results }}
</div>
```
## 2 脚本
#### 2.1 [强制]`Prop` 定义
**`Prop` 定义应该尽量详细。**

在你提交的代码中，`prop` 的定义应该尽量详细，至少需要指定其类型。
```js
props: {
  status: String
}
```
#### 2.2 [强制]私有属性名
如果需要标记某个属性为私有属性，不使用`_`作为前缀，而是使用`$_`作为前缀

#### 2.3 [强制]`Prop` 名大小写
**在声明 `prop` 的时候，其命名应该始终使用 `camelCase`，而在模板和 JSX 中应该始终使用 `kebab-case`。**
```js
// 反例
props: {
  'greeting-text': String
}

// 好例子
props: {
  greetingText: String
}
```
#### 2.4 [强制]不直接修改父元素或子元素的值
**应该优先通过 `prop` 和事件进行父子组件之间的通信，而不是 `this.$parent` 或改变 `prop`。**

一个理想的 `Vue` 应用是 `prop` 向下传递，事件向上传递的。遵循这一约定会让你的组件更易于理解。然而，在一些边界情况下 `prop` 的变更或 `this.$parent` 能够简化两个深度耦合的组件。

问题在于，这种做法在很多简单的场景下可能会更方便。但请当心，不要为了一时方便 (少写代码) 而牺牲数据流向的简洁性 (易于理解)。

#### 2.5 [强制]非 `Flux` 的全局状态管理
应该优先通过 `Vuex` 管理全局状态，而不是通过 `this.$root` 或一个全局事件总线。

#### 2.6 [建议]简单的计算属性
应该把复杂计算属性分割为尽可能多的更简单的属性。
```js
// 反例
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}

// 好例子
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
``` 
#### 2.7 [建议]组件/实例的选项的顺序
**组件/实例的选项应该有统一的顺序。**

这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新属性应该放到哪里。

1. 副作用 (触发组件外的影响)
2. el
3. 全局感知 (要求组件以外的知识)
4. name
5. parent
6. 组件类型 (更改组件的类型)
7. functional
8. 模板修改器 (改变模板的编译方式)
9. delimiters
10. comments
11. 模板依赖 (模板内使用的资源)
12. components
13. directives
14. filters
15. 组合 (向选项里合并属性)
16. extends
17. mixins
18. 接口 (组件的接口)
19. inheritAttrs
20. model
21. props/propsData
22. 本地状态 (本地的响应式属性)
23. data
24. computed
25. 事件 (通过响应式事件触发的回调)
26. watch
27. 生命周期钩子 (按照它们被调用的顺序)
    - beforeCreate
    - created
    - beforeMount
    - mounted
    - beforeUpdate
    - updated
    - activated
    - deactivated
    - beforeDestroy
    - destroyed
28. 非响应式的属性 (不依赖响应系统的实例属性)
29. methods
30. 渲染 (组件输出的声明式描述)
31. template/render
32. renderError

## 3 样式
#### 3.1 [强制]为组件样式设置作用域
```vue
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
  .button {
    border: none;
    border-radius: 2px;
  }

  .button-close {
    background-color: red;
  }
</style>
```
## 4 其它
#### 4.1 [强制]组件文件始终使用大写开头命名组件
始终使用大写开头命名组件, 如果组件内包裹多个内容时，入口文件应为 `index.vue` 或 `index.js`
```sh
components/
|- TodoList.vue
|- TodoItem.vue
|- Tree
   |- index.vue
   |- TreeItem.vue
```
#### 4.2 [强制]完整单词的组件名
**组件名应该倾向于完整单词而不是缩写。**
```sh
# 反例
components/
|- SdSettings.vue
|- UProfOpts.vue

# 好例子
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```
#### 4.3 [强制]不允许空内容
不允许不加注释的情况就留下空函数，空内容
```vue
// 坏例子
<template> </template>
<script></script>
<style></style>
export default {
  methods: {
    submit() {},
    cancel() {}
  }
}
```
#### 4.4 [强制]注释添加说明
**在通常情况下，不允许直接注释一大段内容而不留下任何说明，后人在接手代码时不知道这段代码是否被使用**

#### 4.5 [强制]单文件组件的顶级元素的顺序
单文件组件应该总是让 `<script>`、`<template>` 和 `<style>` 标签的顺序保持一致。且 `<style>` 要放在最后，因为另外两个标签至少要有一个
```vue
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```
#### 4.6 [建议]组件名中的单词顺序
组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。
```sh
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```