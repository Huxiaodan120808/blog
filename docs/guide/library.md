## 基础组件
基础组件又叫整个项目乃至跨项目通用组件，每个组件不涉及业务逻辑，只有入口参数和事件回调。例如封装一个Dialog.vue，主要通过prop设置自定义参数，控制文案、样式等通用属性；通过$emit实现事件的回调；通过slot实现组件的更多拓展功能。
```html
<template>
  <el-dialog
    class="mtg-dialog"
    :width="width"
    :modal="modal"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    @open="open">
    <!-- 通过slot实现可拓展 -->
    <slot></slot>
    <!-- 共同配置项 -->
    <span slot="title" class="el-dialog__title" v-if="!isCustomHeader">
      <span v-html="title ? title : $t('common.tips')"></span>
    </span>
    <span slot="footer" v-if="!isCustomButton">
      <el-button class="margin-right-30" size="mini" @click="cancel">{{$t('common.cancel')}}</el-button>
      <el-button size="mini" type="primary" @click="save">{{$t('common.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'mtgDialog',
  props: { // 共同配置项
    visible: {
      type: Boolean,
      default: false
    },
    isCustomHeader: {
      type: Boolean,
      default: false
    },
    isCustomButton: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '500px'
    },
    modal: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible () {
      this.dialogVisible = this.visible
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
      this.$emit('update:visible', false) // 事件回调给父组件，在父组件中实现相应的业务逻辑
      this.$emit('before-close')
    },
    save () {
      this.$emit('save')
    },
    cancel () {
      this.dialogVisible = false
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    open () {
      this.$emit('open')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
```

## 业务组件
业务组件，是把模块代码根据功能细分，实现每个组件中的功能高度内聚，以便更好的项目维护。如会议控制模块
```sh
├── components
│   ├── ConferenceList # 会议列表-切换会议
│   ├── ConferenceInfo # 会议信息
│   ├── CommonFunction  # 会议操作
│   ├── ToolBar # 与会者操作工具栏
│   ├── ParticipantList # 与会者列表
```
## 类库
### Utils
```sh
├── utils
│   ├── mixins # 混入
│   ├── directive.js # 会议信息
│   ├── element-ui.js  # UI 按需引入
│   ├── enum.js # 整个项目的枚举
│   ├── filter.js # filter过滤方法 format、url参数截取等
│   ├── request.js # axio的封装
│   ├── crypt.js # 加密
│   ├── clipboard.js # 复制粘贴
│   ├── qr-img-down.js # 二维码相关的代码生成、下载、图片和文字合成等
│   ├── ... # 其他功能性的js
```
### Lodash
`lodash`是一个一致性、模块化、高性能的 `JavaScript` 实用工具库。

`Lodash` 通过降低 `array、number、objects、string` 等等的使用难度从而让 `JavaScript` 变得更简单。

`Lodash` 的模块化方法 非常适用于：
- 遍历 `array、object` 和 `string`
- 对值进行操作和检测
- 创建符合功能的函数

#### 模块组成
+ `Array` 方法：适用于数组类型，比如填充数据`fill`，查找元素`findIndex`，数组分片`chunk`等操作
+ `集合` 方法(`Collection` Methods)：使用与数组和对象类型，部分适用于字符串，比如分组`groupBy`，查找`find`，过滤`filter`等操作
+ `Date` Methods（`日期`方法）：`now()`返回时间戳
+ `Function` Methods（`函数`方法）：适用于函数类型，比如节流`throttle`，缓存`memoize`，设置钩子`before``after`等操作
+ `Lang` Methods：普遍适用于各种类型，常用于执行类型判断和类型转换，比如强制转换为数组`castArray`，浅拷贝`clone`，深刻拷贝`cloneDeep`等
+ `Math` Methods(`数学` 方法)： 使用与数值类型，常用于执行数学运算。比如相加`add`，取最大值`max`等
+ `Number` Methods：适用于生成随机数，比较数值与数值区间的关系，比如`clamp`返回两个值之间的数
+ `Object` Methods：适用于对象类型，常用于对象的创建`create`、扩展`assign`、检索`findKey`等操作
+ `Seq` Methods：常用于创建链式调用，提高执行性能（惰性计算）
+ `String` Methods：适用于字符串类型
+ `Util` Methods：工具类，如重复多次某个元素`times`

[loadsh各模块API](https://www.lodashjs.com/docs/latest)

> 当前项目已添加`loadsh`依赖
> ```sh
>npm install loadsh --save-dev
>```

#### 使用
1. 按需引入 `loadsh` 模块(以`array`为例),引入模块以首字母大写命名，以便与普通变量区分
2. 调用模块对应方法
```js
import Array from 'lodash/array'

let arr = [1,2,3,4,5,6,7];
let other = Array.difference(arr, [2,4,6]);  // 去除数组的值
console.log(other)   // 1,3,5,7
```

### Date-fns
时间，日期处理插件
>项目已安装`date-fns`依赖
>```sh
>npm install date-fns --save-dev
>```
[API详情](https://date-fns.org/v1.30.1/docs)
#### 使用
以`distanceInWords`为例

1. 直接引入插件库，调用方法
```js
import dateFns from 'date-fns'

let  result = dateFns.distanceInWords(
  new Date(2014, 6, 2),
  new Date(2015, 0, 1)
)    // => '6 months'
```
2. 单独方法引入。根据方法名称，转换引入模块名称为下划线命名（**推荐使用**）
```js
import distanceInWords from 'date-fns/distance_in_words'

let  result = distanceInWords(
  new Date(2014, 6, 2),
  new Date(2015, 0, 1)
)    // => '6 months'
```