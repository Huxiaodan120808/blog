# Clipboard

复制粘贴使用[`clipboard`](https://github.com/zenorocha/clipboard.js)

> 此处指描述在Vue项目中如何使用，其他使用方式类似

## 封装Clipboard

对clipboard进行封装, 通常将工具类方法放在`/src/utils`中
在`/src/utils`目录下新建 `clipboard.js`

```js
import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

```
## 直接使用

```js

<el-button @click='handleCopy(inputData,$event)'>copy</el-button>

```

```js
import clip from '@/utils/clipboard' // use clipboard directly

methods: {
  handleCopy(text, event) {
    clip(text, event)
  }
}
```

`clip()` 函数第一个参数为复制的内容，第二个参数为`event`事件。 两个参数均为必填项。

