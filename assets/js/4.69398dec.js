(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{318:function(t,e,n){},366:function(t,e,n){"use strict";var i=n(318);n.n(i).a},371:function(t,e,n){"use strict";n.r(e);n(10);var i=n(0),o={name:"richText",props:{editorConfig:{type:Object,default:{}},editorData:{type:String,default:""}},data:function(){return{form:{name:"",desc:""},CKEditor:"",editor:""}},methods:{onReady:function(t){t.ui.getEditableElement().parentElement.insertBefore(t.ui.view.toolbar.element,t.ui.getEditableElement())}},beforeMount:function(){i.a.component("ckeditor",(function(){return n.e(14).then(n.t.bind(null,368,7)).then((function(t){return t.component}))})),this.editor=n(365)},mounted:function(){}},r=(n(366),n(44)),a=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"document-editor"},[e("ckeditor",{attrs:{editor:this.editor,value:this.editorData,config:this.editorConfig},on:{ready:this.onReady}})],1)}),[],!1,null,"275c38ca",null);e.default=a.exports}}]);