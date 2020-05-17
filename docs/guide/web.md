# web端开发模板

## 目录结构
```sh
├── dist                  # 运行npm build，编译后生成的代码存放目录
├── node_modules          # npm本地依赖包
├── public                # 该目录下的静态资源会被复制到输出目录（dist）中，不经过 webpack处理
├── src
│   ├── api               # 与后端交互使用相关方法，接口定义
│   ├── assets            # 放置一些静态资源，例如图片，图标，字体等
│   ├── components        # 公共组件  
│   ├── lang              # 国际化多语言定义 
│   ├── router            # vue-router相关配置 https://router.vuejs.org/zh/guide/
│   ├── store             # vuex 相关配置 https://vuex.vuejs.org/zh/
│   ├── styles            # 公共样式定义
│   ├── theme             # 主题定义
│   ├── utils             # 工具类定义，详细请阅读“工具类”部分介绍
│   ├── views             # 所有的路由组件，业务功能开发
│   ├── App.vue           # 路由组件的顶层路由
│   └── main.js           # vue入口文件
├── tests                 # 测试
├── .browserslistrc       # 指定项目的目标浏览器的范围，查看“配置项-目标浏览器”了解
├── .env                  # 环境变量配置，详细请阅读“环境变量和模式”部分介绍
├── .gitignore            # 配置不提交到git仓库的文件
├── postcss.config.js     # 配置rem转换，查看“配置项 - postcss.config.js”了解https://www.npmjs.com/package/postcss-px2rem
└── vue.config.js         # 配置文件，详细请阅读“配置项-vue.config.js”部分
```
## 基础依赖

### ElementUI
Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
#### 引入 Element
##### 完整引入
在`main.js`中写入以下内容
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
以上代码便完成了 `Element` 的引入。需要注意的是，样式文件需要单独引入。

##### 按需引入
借助[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的

1. 新增`element-ui.js`，定义组件的引入，以`Button`为例
```js
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

import {
Button,
Message
} from 'element-ui'

Vue.use(Button)
/** 或写为
 * Vue.component(Button.name, Button)
 */

 Vue.prototype.$message = Message  // 弹框类注册方式不一样
```
2. `mian.js` 引入 `element-ui.js`
```js
import './element-ui'
```
##### 全局配置
在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 `size` 与 `zIndex` 字段。

`size` 用于改变组件的默认尺寸，`zIndex` 设置弹框的初始 `z-index（默认值：2000）`。
- 完整引入Element
```js
import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
```
- 按需引入Element
```js
import Vue from 'vue';
import { Button } from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
```
按照以上设置，项目中所有拥有 size 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000。

**我们当前开发采用按需引入，故之后的文档中只说明按需引入方式**

#### 调用
**1. 组件内调用**

1.1. 普通组件
```js
// element-ui.js 引入需要调用的组件
import Vue from 'vue';
import { Button } from 'element-ui';

Vue.use(Button);
```
```html
<template>
<el-button type="primary">确认</el-button>
</template>
```
1.2. 弹窗类组件
```js
// element-ui.js 引入需要调用的组件
import Vue from 'vue';
import { Message } from 'element-ui';

Vue.prototype.$message = Message
```
```html
<template>
<el-button type="primary" @click="save">确认</el-button>
</template>
<script>
export default {
  methods: {
    save () {
      this.$message({
        message: '保存',
        type: 'success'
      })
    }
  }
}
</script>
```
**2. 普通js或全局调用**

因为`element-ui.js`中引入的组件注册在vue实例中，故在普通js或全局引用时，直接调用不能被识别，需要单独再次引入
```js
import Message from 'element-ui'

Message({
  message: '保存',
  type: 'success'
})
```
具体组件调用，请参考[官方文档](https://element.eleme.cn/#/zh-CN/component/layout)

### SCSS
Scss 是一款强化 `CSS` 的辅助工具，完全兼容`css3`；在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能；通过函数进行颜色值与属性值的运算；提供控制指令 (control directives)等高级功能。

#### 1. 变量
使用`$`标识变量
```scss
$width: 5em;
```
直接使用即调用变量：
```scss
#main {
  width: $width;
}
```
变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明。
```scss
#main {
  $width: 5em;
  width: $width;
}
```
编译为
```css
#main {
  width: 5em;
}
```

#### 2. 嵌套规则

Scss 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器。嵌套功能避免了重复输入父选择器。
```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```
编译为
```scss
#main p {
  color: #00ff00;
  width: 97%;
}
#main p .redbox {
  background-color: #ff0000;
  color: #000000;
}
```
2.1 父选择器`&`

使用 `&` 代表嵌套规则外层的父选择器。`&` 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器
```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
}
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
```
编译为
```css
a {
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

#main {
  color: black;
}
#main-sidebar {
  border: 1px solid;
}
```
2.2 属性嵌套

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family`, `font-size`, `font-weight` 都以 `font` 作为属性的命名空间。Scss 允许将属性嵌套在命名空间中。
```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```
编译为
```css
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

#### 3.导入文件

scss的`@import`规则在生成css文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个css文件中，而无需发起额外的下载请求。另外，所有在被导入文件中定义的变量和混合器均可在导入文件中使用。

3.1 使用scss部分文件
`scss`局部文件的文件名以下划线开头。这样，`scss`就不会在编译时单独编译这个文件输出`css`，而只把这个文件用作导入

3.2 原生css导入

下列三种情况下会生成原生的`CSS@import`:
- 被导入文件的名字以.css结尾；
- 被导入文件的名字是一个URL地址；
- 被导入文件的名字是CSS的url()值。
- `@import` 包含 media queries


#### 4. 注释

Sass 支持标准的 CSS 多行注释 `/* */`，以及单行注释 `//`，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会

将 `!` 作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 CSS 文件中，通常用于添加版权信息。

插值语句 (interpolation) 也可写进多行注释中输出变量值：
```scss
$version: "1.2.3";
/* This CSS is generated by My Snazzy Framework version #{$version}. */
```
编译为
```css
/* This CSS is generated by My Snazzy Framework version 1.2.3. */
```

#### 5. 运算
5.1 数字运算

支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值
```scss
p {
  width: 1in + 8pt;
}
```
编译为
```css
p {
  width: 1.111in;
}
```
5.2 字符串运算

`+` 可用于连接字符串 
```scss
p {
  cursor: e + -resize;
}
```
编译为
```css
p {
  cursor: e-resize;
}
```
- 如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号
- 运算表达式与其他值连用时，用空格做连接符
- 在有引号的文本字符串中使用 `#{}` 插值语句可以添加动态的值
- 空的值被视作插入了空字符串
```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
  content: "I ate #{5 + 10} pies!";
  content: "I ate #{$value} pies!";
}
p {
  margin: 3px + 4px auto;
}
```
编译为
```css
p:before {
  content: "Foo Bar";
  font-family: sans-serif;
  content: "I ate 15 pies!";
  content: "I ate pies!";
}
p {
  margin: 7px auto;
}
```
5.3 圆括号

圆括号可以用来影响运算的顺序
```scss
p {
  width: 1em + (2em * 3);
}
```
编译为
```css
p {
  width: 7em;
}
```
#### 6. 指令
 **@extend** 

`@extend` ,告诉 Scss 将一个选择器下的所有样式继承给另一个选择器。
```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
上面代码的意思是将 `.error` 下的所有样式继承给 `.seriousError`，`border-width: 3px;` 是单独给 `.seriousError` 设定特殊样式，这样，使用 `.seriousError` 的地方可以不再使用 `.error`。

#### 7. 控制指令
**@if**

`@if` 声明后面可以跟多个 `@else if` 声明，或者一个`@else` 声明。如果 `@if` 声明失败，Scss 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明
```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
编译为
```css
p {
  color: green;
}
```
**@for**

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动

这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值
```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```
编译为
```css
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```
**@each**

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名

`@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果
```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
编译为
```css
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```
[官方文档](https://www.sass.hk/docs/)
## 功能

### HTTP

### 国际化
Element 组件内部默认使用中文，若希望使用其他语言，则需要进行多语言设置

Element 搭配 `i18n`，实现多语言切换。

#### 定义
1. `index.js` 语言包引入，集成i18n，语言设定、切换等实现
```js
// lang/index.js
// 语言环境切换
changeLang(lan) // 传入参数，指定语言类型，否则中英文之间相互切换。语言类型通过cookie存储在本地
// 获取语言
getLanguage()  // 获取本地语言类型，读取cookie获取，若不存在则读取浏览器语言环境
```
2. `zh.js` 自定义中文语言包；`en.js`自定义英文语言包。语言包分别实现界面中需要切换语言时展示的文案信息，以`json`格式定义。
3. 需要切换其他语言时，增加对应的语言包。在`index.js`中引入该语言包
```js
// lang/index.js 以英文包引入为例
import ElementEnLocale from 'element-ui/lib/locale/lang/en' // element内置语言包引入
import zhLocale from './en' // 自定义语言包引入

const messages = {
  en: { // 添加语言包至messages集合
    ...ElementEnLocale,
    ...enLocale
  },
  zh: {
    ...ElementZhLocale,
    ...zhLocale
  }
}
```
#### 使用
**1. 文案展示**

语言包中定义文案对应数据
```js
// 语言包定义
export default {
  message: '你好！'
  public: {
    title: '标题',
    save: '保存'
  }
}
```

1.1 组件内调用，`$t`访问 
```html
<template>
  <header>{{title}}</header>
  <div>{{$t('message')}}</div>
  <div></div>
  <button>{{$t('public.save')}}</button>
</template>
<script>
  export default {
    data () {
      return {
        title: this.$t('title')    // 标题; js部分调用
      }
    }
  }
</script>
```

1.2 如果不需要切换语言可以放到data里面，如果有切换则放到computed里面，否者无效，更多可连接data\computed区别
```html
<template>
  <header>{{title}}</header>
  <div>{{$t('message')}}</div>
  <div></div>
  <button>{{$t('public.save')}}</button>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      title: this.$t('title') // 标题; js部分调用
    }
  }
</script>
```

1.3 在普通js或者全局调用。由于`$t`注册在组件内，故只能在组件内调用，在普通js中不识别该函数。外部调用时，需要引入`i18n`
```js
import i18n from '@/lang'

i18n.t('message') // 你好！

```
**2. 切换语言环境**

调用 `changeLang`
```html
<button @click="$changeLang">中英文环境切换</button>
<button @click="$changeLang('en')">切换至英文环境</button>
```

### 主题
#### 主题编辑器
使用[在线主题编辑器](https://element.eleme.cn/#/zh-CN/theme)可以修改定制 Element 所有全局和组件的 Design Tokens，并可以方便地实时预览样式改变后的视觉。同时它还可以基于新的定制样式生成完整的样式文件包，供直接下载使用（关于如何使用下载的主题包，请参考本节「引入自定义主题」部分）

#### 仅替换主题色
如果仅希望更换 Element 的主题色，推荐使用[在线主题生成工具](https://elementui.github.io/theme-chalk-preview/#/zh-CN)。使用上述工具，可以很方便地实时预览主题色改变之后的视觉，同时它还可以基于新的主题色生成完整的样式文件包，供直接下载使用（关于如何使用下载的主题包，请参考本节「引入自定义主题」和「搭配插件按需引入组件主题」部分）。

#### 在项目中改变 SCSS 变量
Element 的 `theme-chalk` 使用 SCSS 编写，我们当前的项目使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。
```scss
// element-variables.scss
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```
之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 Element 编译好的 CSS 文件）：
```js
// main.js
import './element-variables.scss'

```
#### 使用自定义主题
##### 引入自定义主题
和引入默认主题一样，在代码里直接引用「在线主题编辑器」或「命令行工具」生成的主题的 theme/index.css 文件即可。
```js
// main.js
import '../theme/index.css'
```
##### 搭配插件按需引入组件主题
如果是搭配 `babel-plugin-component` 一起使用，只需要修改 `.babelrc` 的配置，指定 `styleLibraryName` 路径为自定义主题相对于 `.babelrc` 的路径，注意要加 `~`。
```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "~theme"
      }
    ]
  ]
}
```

### 引导页
`Driver.js` 是一个轻量级（gzip压缩后约4KB），无需依赖且功能强大的原生 JavaScript引导插件 。兼容所有主流浏览器，可以突出显示页面上的指定区域，以吸引用户的注意力。当网站改版或者新增新功能后，使用Driver.js引导用户展示说明新功能，增强用户对产品体验。
#### 安装
```sh
npm install driver.js
#yarn add driver.js
```
#### 引入
```js
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
```
#### 初始化
```js
const driver = new Driver()
```
#### API
初始配置
```js
const driver = new Driver({
  className: 'scoped-class',        // className to wrap driver.js popover
  animate: true,                    // 是否设置动画
  opacity: 0.75,                    // 背景的透明度(0表示仅弹出不覆盖)
  padding: 10,                      // 元素与覆盖层边缘的距离
  allowClose: true,                 // 点击覆盖是否关闭
  overlayClickNext: false,          // 点击覆盖是否应移动到下一步
  doneBtnText: 'Done',              // 最后一个按钮上的文本
  closeBtnText: 'Close',            // 当前步骤“关闭”按钮上的文本
  stageBackground: '#ffffff',       // 后台突出显示元素的背景色
  nextBtnText: 'Next',              // 当前步骤的下一步按钮文本
  prevBtnText: 'Previous',          // 当前步骤的下一步按钮文本
  showButtons: false,               // 不在页脚中显示控制按钮
  keyboardControl: true,            // 允许通过键盘进行控制（退出以关闭，箭头键移动）
  scrollIntoViewOptions: {},        // We use `scrollIntoView()` when possible, pass here the options for it if you want any
  onHighlightStarted: (Element) => {}, // 在元素即将突出显示时调用
  onHighlighted: (Element) => {},      // 当元素完全突出显示时调用
  onDeselected: (Element) => {},       // 取消选择元素时调用
  onReset: (Element) => {},            // 覆盖即将清除时调用
  onNext: (Element) => {},             // 在任何步骤转到下一步时调用
  onPrevious: (Element) => {},         // 在任何步骤转到上一步时调用
})
```
步骤定义
```js
const stepDefinition = {
  element: '#some-item',        // 要突出显示的查询选择器字符串或节点
  stageBackground: '#ffffff',   // 这将覆盖初始化是的设置
  popover: {                    // 如果空的或没有给的话，就不会有popover
    className: 'popover-class', // 类名
    title: 'Title',             // popover 标题
    description: 'Description', // popover 内容
    showButtons: false,         // 不在页脚中显示控制按钮
    doneBtnText: 'Done',        // 最后一个按钮上的文本
    closeBtnText: 'Close',      // 关闭按钮上的文本
    nextBtnText: 'Next',        // 下一步按钮的文本
    prevBtnText: 'Previous',    // 上一个步按钮的文本
  },
  onNext: () => {},             // 从当前步骤转到下一步时调用
  onPrevious: () => {},         // 从当前步骤转到上一步时调用
}
```
Methods API
```js
const driver = new Driver(driverOptions)

// 检查驱动程序是否处于活动状态
if (driver.isActivated) {
    console.log('Driver is active')
}

// 使用查询选择器或步骤定义突出显示元素，单个高亮
driver.highlight(string|stepDefinition);

// 在使用步骤指南的情况下，可以调用以下方法；多个步骤
driver.defineSteps([ stepDefinition1, stepDefinition2, stepDefinition3 ]);  // 定义介绍步骤
driver.start(stepNumber = 0)  // 开始执行定义的步骤
driver.moveNext()             // 转到步骤列表中的下一步
driver.movePrevious()         // 转到步骤列表中的上一步
driver.hasNextStep()          // 检查是否有下一步要移动到
driver.hasPreviousStep()      // 检查是否有上一步要移动到

// 重新定位弹出窗口和突出显示的元素
driver.refresh()

// 重置覆盖并清除屏幕
driver.reset()
// 可以传递布尔值，立即清除，不做动画等。
driver.reset(clearImmediately = false);

// 检查是否有突出显示的元素
driver.hasHighlightedElement()

// 获取屏幕上当前突出显示的元素。
const activeElement = driver.getHighlightedElement()

// 获取最后一个突出显示的元素
const lastActiveElement = driver.getLastHighlightedElement()

activeElement.getCalculatedPosition() // 获取活动元素的屏幕坐标。
activeElement.hidePopover()           // 隐藏 popover
activeElement.showPopover()           // 展示 popover

activeElement.getNode()  // 获取此元素后面的dom元素。

```

#### 示例
突出显示单个元素
```js
onst driver = new Driver();
driver.highlight('#create-post');  // 无popover

driver.highlight({    // 显示popover
  element: '#some-element',
  popover: {
    title: 'Title for the Popover',
    description: 'Description for it',
  }
});
```
功能步骤展示
```js
const driver = new Driver();

// Define the steps for introduction
driver.defineSteps([
  {
    element: '#first-element-introduction',
    popover: {
      className: 'first-step-popover-class',
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'left'
    }
  },
  {
    element: '#second-element-introduction',
    popover: {
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'top'
    }
  },
  {
    element: '#third-element-introduction',
    popover: {
      title: 'Title on Popover',
      description: 'Body of the popover',
      position: 'right'
    }
  },
]);

// Start the introduction
driver.start();
```
[官方文档](https://kamranahmed.info/driver.js/)

### 进度条

### 错误处理

#### 页面

##### 404

页面级的处理由`vue-router` 统一处理，所有匹配不到正确路由的页面都会进入`404`页面

```js
{ path: '*', redirect: '/404' }
```

:::warning
<b>注意事项</b> `404` 页面一定要放在最后加载，如果放在constantRoutes一同声明了`404`，后面的所有页面都会被拦截到`404`
:::

#### 请求

项目中的所有请求都会走`@/utils/request.js`里面创建的axios实例，它做了统一处理。[`完整代码`](http://gitlab.adc.com/oppo-front/new-mo-portal/blob/master/src/utils/request.js)

可以通过axios提供的响应拦截器(`service.interceptors.response`)针对后台返回的不同错误代码进行处理, 如：

```js
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res && res.code === 0) {
      return res
    } else {
      if (res.code === 100001 || res.code === 100002) {
        // token认证失败 或者 账号已失效，则返回登陆页面
        logout()
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000,
          showClose: true
        })
      }
    }
  },
  error => {
    try {
      if (error && error.response) {
        let res = error.response.data
        let showMsg = true
        switch (error.response.status) {
          case 400:
            res.msg = '请求错误'
            break
          case 401:
            res.msg = ''
            showMsg = false
            logout()
            break
          case 403:
            res.msg = '无权限访问'
            break
          case 404:
            res.msg = '未找到请求路径'
            break
          default:
            res.msg = res.msg || '连接服务器错误'
            break
        }
        Message.closeAll()
        if (showMsg) {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000,
            showClose: true
          })
        }
        return Promise.reject(error.response)
      }
    } catch (error) {
      console.log(error, '')
    }
  }
)
```

因为所有的请求返回的都是`promise`, 所以你也可以对每一个请求通过`catch`错误，从而进行单独的处理

```js
getInfo()
  .then(res => {})
  .catch(err => {
    // xxx
  })
```
#### 前端错误统计

:::tip
对于线上产生的前端错误我们也可以借助前端错误统计[](http://sentry.myoas.com)
:::

### 浏览器类型判断