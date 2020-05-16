module.exports = {
  title: 'Umeet-blog',
  base: '/blog/', // 设置站点根路径
  description: '集合脚手架, Vue开发模版, 代码规范, 工作流规范, 前端相关组件, 接口管理平台系统等, 旨在统一前端开发流程, 开发规范, 减少前端重复造轮子, 提升前端开发效率和代码质量',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '功能', 
        items: [
          { text: '富文本', link: '/components/richtext' },
          { text: '复制粘贴', link: '/components/clipboard' }
        ]
      },
      { text: '相关系统', 
        items: [
          { text: '脚手架工具', link: '/ecology/scaffold' },
          { text: 'NPM镜像仓库', link: '/ecology/onpm' },
          { text: '接口管理平台', link: '/ecology/yapi' },
          { text: '前端错误统计平台', link: '/ecology/sentry' }
        ]
      }
    ],
    sidebarDepth: 2,
    sidebar:{
      '/guide/':[
        {
          title: '开发指南',
          collapsable: false,
          children:[
            {
              path: 'common',
              title: '基础'
            },
            {
              path: 'pc',
              title: 'PC端开发',
            },
            {
              path: 'mobile',
              title: '移动端开发',
            },
            {
              path: 'library',
              title: '插件开发',
            }
          ]
        },
        {
          title: '多环境配置',
          collapsable: false,
          children:[
            {
              path: 'env-standard/env-build',
              title: 'Vue多环境配置'
            }
          ]
        },
        {
          title: '代码规范',
          collapsable: false,
          children: [
            {
              path:'code-standard/html',
              title: 'HTML编码规范',
            },
            {
              path:'code-standard/css',
              title: 'CSS编码规范',
            },
            {
              path:'code-standard/js',
              title: 'JS编码规范'
            },
            {
              path: 'code-standard/vue',
              title: 'Vue编码规范'
            },
            {
              path: 'code-standard/eslint',
              title: 'ESLint规范'
            },
            {
              path:'code-standard/filename',
              title: '命名规范',
            }
          ]
        },
        {
          title: '工作流规范',
          collapsable: false,
          children: [
            {
              path:'dev-standard/project-version',
              title: '版本规范',
            },
            {
              path: 'dev-standard/git-version',
              title: 'Git-Flow工作流规范'
            },
            {
              path: 'cooperation-standard/cooperation',
              title: '前后端协作流程规范'
            }
          ]
        },
        // {
        //   title: '浏览器兼容规范',
        //   collapsable: false,
        //   children: []
        // }
        // {
        //   title: '文档规范',
        //   collapsable: false,
        //   children: []
        // },
        // {
        //   title: '异常处理、监控和调试规范',
        //   collapsable: false,
        //   children: []
        // },
        // {
        //   title: '知识管理',
        //   collapsable: false,
        //   children: []
        // }
      ],
      '/components/': [
        {
          path: 'richtext',
          title: '富文本'
        },
        {
          path: 'clipboard',
          title: '复制粘贴'
        }
      ],
      '/ecology/': [
        {
          path: 'scaffold',
          title: '脚手架'
        },
        {
          path: 'onpm',
          title: 'onpm'
        },
        {
          path: 'yapi',
          title: 'yapi'
        },
        {
          path: 'sentry',
          title: 'sentry'
        }
      ],
      '/library/':[
        {
          path: 'icomm',
          title: '插件',
        }
      ],
      '/': '/'
    },
    lastUpdated: 'Last Updated',
  },
  lineNumbers: true
  // configureWebpack: {
  //   output: {
  //     publicPath: './'
  //   }
  // }
}