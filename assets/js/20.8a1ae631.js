(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{397:function(s,a,t){"use strict";t.r(a);var n=t(44),r=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"onpm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#onpm"}},[s._v("#")]),s._v(" onpm")]),s._v(" "),t("p",[t("a",{attrs:{href:"http://onpm.adc.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("onpm"),t("OutboundLink")],1),s._v(" 是私有部署的npm仓库, 也可作为npm内部镜像")]),s._v(" "),t("h2",{attrs:{id:"onpm使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#onpm使用"}},[s._v("#")]),s._v(" onpm使用")]),s._v(" "),t("h3",{attrs:{id:"安装nrm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装nrm"}},[s._v("#")]),s._v(" 安装nrm")]),s._v(" "),t("p",[s._v("nrm可以用来管理自己的npm代理，可以快速修改，切换，增加你的npm镜像地址")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g nrm\n")])])]),t("h3",{attrs:{id:"增加私有仓库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#增加私有仓库"}},[s._v("#")]),s._v(" 增加私有仓库")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("nrm "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" onpm http://onpm.adc.com\n")])])]),t("p",[s._v("查看")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("nrm "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" ---- https://registry.npmjs.org/\ncnpm --- http://r.cnpmjs.org/\ntaobao - https://registry.npm.taobao.org/\nnj ----- https://registry.nodejitsu.com/\nnpmMirror  https://skimdb.npmjs.com/registry/\nedunpm - http://registry.enpmjs.org/\nonpm --- http://onpm.adc.com/\n")])])]),t("p",[s._v("切换到npm仓库")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("nrm use onpm\n")])])]),t("p",[s._v("创建账号")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" adduser\n")])])]),t("p",[s._v("如果在npm分支，则需要说明在那个分支上注册")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" adduser --registry http://onpm.adc.com/\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#创建账号")]),s._v("\n\nUsername: chen8ih\nPassword: \nEmail: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("this IS public"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" chenhang@oppo.com\nLogged "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" as chen8ih on http://onpm.adc.com/\n")])])]),t("p",[s._v("登陆")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" login\n\nUsername: chen8ih\nPassword:\nEmail: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("this IS public"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" chenhang@oppo.com\nLogged "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" as chen8ih on http://onpm.adc.com/.\n")])])]),t("h3",{attrs:{id:"发布依赖包到onpm中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#发布依赖包到onpm中"}},[s._v("#")]),s._v(" 发布依赖包到onpm中")]),s._v(" "),t("p",[s._v("进入需要发布的包的根目录，执行")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" publish\n")])])]),t("p",[s._v("发布成后，即可进入http://onpm.adc.com/查看发布的包")]),s._v(" "),t("h3",{attrs:{id:"用户安装使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用户安装使用"}},[s._v("#")]),s._v(" 用户安装使用")]),s._v(" "),t("p",[s._v("以icomm-cli为例")]),s._v(" "),t("blockquote",[t("p",[s._v("如果nrm已经安装，则可以不用执行nrm安装命令")])]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g nrm\nnrm "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" onpm http://onpm.adc.com\nnrm use onpm\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g icomm-cli\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);