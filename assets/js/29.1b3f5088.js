(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{376:function(a,t,v){"use strict";v.r(t);var _=v(44),e=Object(_.a)({},(function(){var a=this,t=a.$createElement,v=a._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[v("h1",{attrs:{id:"版本规范"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#版本规范"}},[a._v("#")]),a._v(" 版本规范")]),a._v(" "),v("p",[a._v("项目的版本应该根据某些规则进行迭代, 这里推荐使用"),v("a",{attrs:{href:"https://semver.org/lang/zh-CN/",target:"_blank",rel:"noopener noreferrer"}},[v("code",[a._v("语义话版本")]),v("OutboundLink")],1),a._v(", "),v("strong",[a._v("通过这个规范，用户可以了解版本变更的影响范围。")]),a._v(" 摘选部分规则如下:")]),a._v(" "),v("h2",{attrs:{id:"摘要"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#摘要"}},[a._v("#")]),a._v(" 摘要")]),a._v(" "),v("p",[a._v("版本格式：主版本号.次版本号.修订号，版本号递增规则如下：")]),a._v(" "),v("ul",[v("li",[a._v("主版本号：当你做了不兼容的 API 修改，")]),a._v(" "),v("li",[a._v("次版本号：当你做了向下兼容的功能性新增，")]),a._v(" "),v("li",[a._v("修订号：当你做了向下兼容的问题修正。")])]),a._v(" "),v("p",[a._v("先行版本号及版本编译元数据可以加到“主版本号.次版本号.修订号”的后面，作为延伸。")]),a._v(" "),v("h2",{attrs:{id:"语义化版本控制范围"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#语义化版本控制范围"}},[a._v("#")]),a._v(" 语义化版本控制范围")]),a._v(" "),v("p",[a._v("以下关键词 MUST、MUST NOT、REQUIRED、SHALL、SHALL NOT、SHOULD、SHOULD NOT、 RECOMMENDED、MAY、OPTIONAL 依照 RFC 2119 的叙述解读。（译注：为了保持语句顺畅， 以下文件遇到的关键词将依照整句语义进行翻译，在此先不进行个别翻译。）")]),a._v(" "),v("ol",[v("li",[v("p",[a._v("使用语义化版本控制的软件必须（MUST）定义公共 API。该 API 可以在代码中被定义或出现于严谨的文件内。无论何种形式都应该力求精确且完整。")])]),a._v(" "),v("li",[v("p",[a._v("标准的版本号必须（MUST）采用 X.Y.Z 的格式，其中 X、Y 和 Z 为非负的整数，且禁止（MUST NOT）在数字前方补零。X 是主版本号、Y 是次版本号、而 Z 为修订号。每个元素必须（MUST）以数值来递增。例如：1.9.1 -> 1.10.0 -> 1.11.0。")])]),a._v(" "),v("li",[v("p",[a._v("标记版本号的软件发行后，禁止（MUST NOT）改变该版本软件的内容。任何修改都必须（MUST）以新版本发行。")])]),a._v(" "),v("li",[v("p",[a._v("主版本号为零（0.y.z）的软件处于开发初始阶段，一切都可能随时被改变。这样的公共 API 不应该被视为稳定版。")])]),a._v(" "),v("li",[v("p",[a._v("1.0.0 的版本号用于界定公共 API 的形成。这一版本之后所有的版本号更新都基于公共 API 及其修改内容。")])]),a._v(" "),v("li",[v("p",[a._v("修订号 Z（x.y.Z | x > 0）必须（MUST）在只做了向下兼容的修正时才递增。这里的修正指的是针对不正确结果而进行的内部修改。")])]),a._v(" "),v("li",[v("p",[a._v("次版本号 Y（x.Y.z | x > 0）必须（MUST）在有向下兼容的新功能出现时递增。在任何公共 API 的功能被标记为弃用时也必须（MUST）递增。也可以（MAY）在内部程序有大量新功能或改进被加入时递增，其中可以（MAY）包括修订级别的改变。每当次版本号递增时，修订号必须（MUST）归零。")])]),a._v(" "),v("li",[v("p",[a._v("主版本号 X（X.y.z | X > 0）必须（MUST）在有任何不兼容的修改被加入公共 API 时递增。其中可以（MAY）包括次版本号及修订级别的改变。每当主版本号递增时，次版本号和修订号必须（MUST）归零。")])]),a._v(" "),v("li",[v("p",[a._v("先行版本号可以（MAY）被标注在修订版之后，先加上一个连接号再加上一连串以句点分隔的标识符来修饰。标识符必须（MUST）由 ASCII 字母数字和连接号 [0-9A-Za-z-] 组成，且禁止（MUST NOT）留白。数字型的标识符禁止（MUST NOT）在前方补零。先行版的优先级低于相关联的标准版本。被标上先行版本号则表示这个版本并非稳定而且可能无法满足预期的兼容性需求。范例：1.0.0-alpha、1.0.0-alpha.1、1.0.0-0.3.7、1.0.0-x.7.z.92。")])]),a._v(" "),v("li",[v("p",[a._v("版本编译元数据可以（MAY）被标注在修订版或先行版本号之后，先加上一个加号再加上一连串以句点分隔的标识符来修饰。标识符必须（MUST）由 ASCII 字母数字和连接号 [0-9A-Za-z-] 组成，且禁止（MUST NOT）留白。当判断版本的优先层级时，版本编译元数据可（SHOULD）被忽略。因此当两个版本只有在版本编译元数据有差别时，属于相同的优先层级。范例：1.0.0-alpha+001、1.0.0+20130313144700、1.0.0-beta+exp.sha.5114f85。")])]),a._v(" "),v("li",[v("p",[a._v("版本的优先层级指的是不同版本在排序时如何比较。判断优先层级时，必须（MUST）把版本依序拆分为主版本号、次版本号、修订号及先行版本号后进行比较（版本编译元数据不在这份比较的列表中）。由左到右依序比较每个标识符，第一个差异值用来决定优先层级：主版本号、次版本号及修订号以数值比较，例如：1.0.0 < 2.0.0 < 2.1.0 < 2.1.1。当主版本号、次版本号及修订号都相同时，改以优先层级比较低的先行版本号决定。例如：1.0.0-alpha < 1.0.0。有相同主版本号、次版本号及修订号的两个先行版本号，其优先层级必须（MUST）透过由左到右的每个被句点分隔的标识符来比较，直到找到一个差异值后决定：只有数字的标识符以数值高低比较，有字母或连接号时则逐字以 ASCII 的排序来比较。数字的标识符比非数字的标识符优先层级低。若开头的标识符都相同时，栏位比较多的先行版本号优先层级比较高。范例：1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0。")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);