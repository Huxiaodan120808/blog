<template>
  <div class="document-editor">
    <ckeditor 
      @ready="onReady" 
      :editor="editor" 
      :value="editorData" 
      :config="editorConfig">
    </ckeditor>
  </div>
</template>

<script>
import Vue from 'vue'
// import DecoupledEditor  from '@ckeditor/ckeditor5-build-decoupled-document'
// import CKEditor from '@ckeditor/ckeditor5-vue'

export default {
  name: 'richText',
  // components: {
  //   ckeditor: CKEditor.component
  // },
  props: {
    editorConfig: {
      type: Object,
      default: {}
    },
    editorData: {
      type:String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        name: '',
        desc: ''
      },
      CKEditor: '',
      editor: ''
    }
  },
  methods: {
    onReady (editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    }
  },
  beforeMount () {
    let that = this
    Vue.component('ckeditor', () => import('@ckeditor/ckeditor5-vue').then(modules => {
                                  return modules.component
                              })
    )
    this.editor = require('@ckeditor/ckeditor5-build-decoupled-document')
  },
  mounted () {
  }
}
</script>
<style scoped>
.ck.ck-editor__editable_inline {
  border: 1px solid var(--ck-color-base-border)
}
.document-editor {
  margin-top: 5px
}
</style>
