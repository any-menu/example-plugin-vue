# AnyMenu Plugin Vue

> 这是 [AnyMenu](https://github.com/any-menu/any-menu) 的插件开发模板

## 编译

```bash
$ npm install
$ npm run build
# 然后会将编译结果生成到 dist 目录下
```

## 使用

同普通的 AnyMenu 插件

将编译好的结果放置于 AnyMenu 的插件目录下，然后 AnyMenu 中刷新本地插件列表即可看到刚刚添加的新插件

将新插件开启后即可 (当前版本可能需要重启下插件/软件才可)

## 从零生成此项目 (可选)

(1) 基于 plugin-simple

先基于 [any-menu/example-plugin-simple](https://github.com/any-menu/example-plugin-simple)

然后使用 vue:

(2) 添加 vue 依赖

```bash
npm install vue
```

(3) 修改 vite.config.js 的 define

主要是使其脱离 process (node.js) 依赖

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

(5) (可选) 支持 .vue 文件

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
