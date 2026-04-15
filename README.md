# AnyMenu Plugin Vue

> 这是 [AnyMenu](https://github.com/any-menu/any-menu) 的插件开发模板

## 编译

```bash
$ npm install
$ npm run build
# 然后会将编译结果生成到 dist 目录下
```

## 使用

见: [any-menu/example-plugin-simple 使用](https://github.com/any-menu/example-plugin-simple?tab=readme-ov-file#%E4%BD%BF%E7%94%A8)

## 从零生成此项目 (可选)

(1) 基于 plugin-simple

先基于 [any-menu/example-plugin-simple](https://github.com/any-menu/example-plugin-simple) 的从零生成说明

然后使用 vue:

(2) 添加 vue 依赖

```bash
npm install vue
```

(3) 修改 vite.config.js 的 define

做法参考 vite.config.js 的 define

主要是使其脱离 process (node.js) 依赖，否则编译结果 main.js 中会直接使用只能在 node.js 环境中使用的 node。
AnyMenu 加载插件时会报错: `Caused by: ReferenceError: process is not defined`

此外，如此也能大大减少编译结果的尺寸

(4) 使用 vue 挂载到面板元素

index.ts

```ts
import { createApp } from 'vue';

...

const newPanel = document.createElement('div');
ctx.api.registerSubPanel({
    id: 'example-plugin-vue-panel',
    el: newPanel
})

// 使用 Vue 渲染组件
const app = createApp({
  ...
});
app.mount(newPanel);
```

(5) (可选, 推荐) 支持 .vue 文件

推荐原因: vue 模板会在构建时预编译好，打包结果不需要编译器，只需要用运行时vue。体积不会增加

如果你需要支持 .vue 文件，那么需要其他依赖

```bash
# 二选一

# 如果之前的项目基于 webpack
npm install -D vue-loader@next vue-style-loader css-loader
# 并配置 webpack.config.js，使用 vue-loader 插件:
# 
# const { VueLoaderPlugin } = require('vue-loader')
# module.exports = {
#   module: {
#     rules: [
#       {
#         test: /\.vue$/,
#         loader: 'vue-loader'
#       },
#       // 其他规则...
#     ]
#   },
#   plugins: [
#     new VueLoaderPlugin()
#   ]
# }



# 如果之前的项目基于 vite
npm install -D vite @vitejs/plugin-vue
# 并配置 vite.config.js，使用 vue 插件:
# 
# import { defineConfig } from 'vite'
# import vue from '@vitejs/plugin-vue'
# export default defineConfig({
#   plugins: [vue()]
# })
```

然后就可以正常 import vue 文件并挂载，如:

```ts
import { createApp } from 'vue'
import MyComponent from './MyComponent.vue'

...

const app = createApp(MyComponent)
app.mount('#target-element')
```

(6) (可选, 不推荐) runtime-only 改完整 vue

不推荐原因: 完整版带编译器，体积更大

关于运行时和完整版 vue 的区别可以自己搜，或见我文档库中的 《Vue完整版与runtime运行时版》

vite 打包 vue 项目时，默认使用的是只包含运行时版 vue.runtime.js，
而非引入完整的 vue.js 或 vue.min.js，
这样可以大大减少体积

当然，如果你想要支持非 vue 文件的, createApp 中的 template api 方法，则需要完整 vue。例如:

```ts
createApp({
  setup() {
    const count = ref(1)
    return { count }
  },
  template: `<div>(3) 组合式 Composition API, count: {{ count }}</div>`
}).mount(panel4)
```
