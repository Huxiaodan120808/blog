# Html编码规范

## 1 前言
`HTML` 作为描述网页结构的超文本标记语言，本文档的目标是使 `HTML` 代码风格保持一致，容易被理解和被维护。

## 2 代码风格规则
#### 2.1 DOCTYPE
**[强制] 使用 `HTML5` 的 `doctype` 来启用标准模式，建议使用大写的 `DOCTYPE`。**

`HTML5` 是目前所有 `HTML` 文档类型中的首选： `<!DOCTYPE html>`
```html
<!DOCTYPE html>
```
#### 2.2 编码
**[强制] 页面必须使用精简形式，明确指定字符编码。指定字符编码的 `meta` 必须是 `head` 的第一个直接子元素。**
```html
<html>
    <head>
        <meta charset="UTF-8">
        ......
    </head>
    <body>
        ......
    </body>
</html>
```
**[建议] `HTML` 文件使用无 `BOM` 的 `UTF-8` 编码。**

解释：

`UTF-8` 编码具有更广泛的适应性。`BOM` 在使用程序或工具处理文件时可能造成不必要的干扰。

#### 2.3 `CSS` 和 `JavaScript` 引入
**[建议] 在 `head` 中引入页面需要的所有 `CSS` 资源。**

解释：

在页面渲染的过程中，新的 `CSS` 可能导致元素的样式重新计算和绘制，页面闪烁。

**[建议] `JavaScript` 应当放在页面末尾，或采用异步加载。**

解释：

将 `script` 放在页面中间将阻塞页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。
```html
<body>
    <!-- a lot of elements -->
    <script src="init-behavior.js"></script>
</body>
```
**[建议] 嵌入式资源书写省略协议头。**

解释：

省略图像、媒体文件、样式表和脚本等URL协议头部声明 ( http: , https: )。如果不是这两个声明的URL则不省略。

省略协议声明，使 `URL` 成相对地址，防止内容混淆问题和导致小文件重复下载。
```html
<!-- 不推荐 -->
<script src="http://www.google.com/js/gweb/analytics/autotrack.js"></script>
<!-- 推荐 -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```
**[建议] 在样式表和脚本的标签中忽略 `type` 属性。**
解释：

`HTML5`默认 `type`为 [text/css](https://html.spec.whatwg.org/multipage/semantics.html#attr-style-type) 和 [text/javascript](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type) 类型，所以没必要指定。
```html
<!-- 不推荐 -->
<link rel="stylesheet" href="//www.google.com/css/maia.css" type="text/css">
<!-- 推荐 -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">
```
#### 2.4 title
**[强制] 页面必须包含 `title` 标签声明标题。**

**[强制] `title` 必须作为 `head` 的直接子元素，并紧随 `charset` 声明之后。**

解释：

`title` 中如果包含 `ascii` 之外的字符，浏览器需要知道字符编码类型才能进行解码，否则可能导致乱码。
```html
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
```
#### 2.5 favicon
**[强制] 保证 `favicon` 可访问。**
```html
<link rel="shortcut icon" href="path/to/favicon.ico">
```
#### 2.6 viewport
**[建议] 若页面欲对移动设备友好，需指定页面的 `viewport`。**
```html
<meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```
#### 2.7 缩进与换行
**[强制] 使用 `2` 个空格做为一个缩进层级，不允许使用 `4` 个空格 或 `tab` 字符。**
```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```
**[建议] 每行不得超过 `120` 个字符，属性过多时需要换行写。**

解释：

过长的代码不容易阅读与维护。

#### 2.8 命名
**[强制] `class` 必须单词全字母小写，单词间以 - 分隔。**

**[强制] `class` 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。**
```html
<!-- 推荐 -->
<div class="sidebar"></div>

<!-- 推荐 -->
<div class="sidebar-text"></div>

<!-- 不推荐 --> 
<div class="left"></div>
```
**[强制] 元素 id 必须保证页面唯一。**

解释：

同一个页面中，不同的元素包含相同的 `id`，不符合 `id` 的属性含义。并且使用 `document.getElementById` 时可能导致难以追查的问题。

**[建议] `id` 建议单词全字母小写，单词间以 - 分隔。同项目必须保持风格一致。**

**[建议] 少用或者不使用 `id` 选择器。**

解释：

`id` 选择器通常用于页面的全局查找，不推荐。

```html
<!-- 推荐 -->
<div id="nav"></div>
<!-- 不推荐 -->
<div id="navigation"></div>

<!-- 推荐 -->
<p class="comment"></p>
<!-- 不推荐 -->
<p class="com"></p>

<!-- 推荐 -->
<span class="author"></span>
<!-- 不推荐 -->
<span class="red"></span>
```
#### 2.9 标签
**[强制] 标签名必须使用小写字母。**
```html
<!-- 推荐 -->
<p>Hello StyleGuide!</p>

<!-- 不推荐 -->
<P>Hello StyleGuide!</P>
```
**[强制] 对 `HTML5` 中规定允许省略的闭合标签，不允许省略闭合标签。**
```html
<!-- 推荐 -->
<ul>
    <li>first</li>
    <li>second</li>
</ul>

<!-- 不推荐 -->
<ul>
    <li>first
    <li>second
</ul>
```
**[建议] 标签的使用应尽量简洁，减少不必要的标签。**
```html
<!-- 推荐 -->
<img class="avatar" src="image.png">

<!-- 不推荐 -->
<span class="avatar">
    <img src="image.png">
</span>
```
#### 2.10 属性
**[强制] 属性名必须使用小写字母。**
```html
<!-- 推荐 -->
<table cellspacing="0">...</table>

<!-- 不推荐 -->
<table cellSpacing="0">...</table>
```
**[强制] 属性值必须用双引号包围。**

解释：

不允许使用单引号，不允许不使用引号。
```html
<!-- 推荐 -->
<script src="esl.js"></script>

<!-- 不推荐 -->
<script src='esl.js'></script>
<script src=esl.js></script>
```
**[建议] 自定义属性建议以 `xxx-` 为前缀，推荐使用 `data-`。**

解释：

使用前缀有助于区分自定义属性和标准定义的属性。
```html
<ol data-ui-type="Select"></ol>
```
#### 2.11 语义化
**[强制] 根据 HTML 各个元素的用途而去使用它们。**

解释：

例如，用 `heading` 元素构造标题， `p`元素构造段落, `a`元素构造锚点等。

根据 `HTML` 各个元素的用途而去使用是很重要的，它涉及到文档的可访问性、重用和代码效率等问题。

```html
<!-- 不推荐 -->
<div onclick="goToRecommendations();">All recommendations</div>

<!-- 推荐 -->
<a href="recommendations/">All recommendations</a>
```
#### 2.12 图片和多媒体降级
**[建议] 为重要图片添加 `alt` 属性。**

解释：

可以提高图片加载失败时的用户体验。

**[建议] 有下载需求的图片采用 `img` 标签实现，无下载需求的图片采用 `CSS` 背景图实现。**

解释：

1. 产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。
2. 无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 css 背景图实现。

**[建议] 在 `object` 标签内部提供指示浏览器不支持该标签的说明。**
```html
<object width="100" height="50" data="something.swf">DO NOT SUPPORT THIS TAG</object>
```