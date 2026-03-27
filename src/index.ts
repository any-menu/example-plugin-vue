/**
 * AnyMenu Plugin: Hello World
 *
 * Template for AnyMenu plugin development.
 * Implements PluginInterface with TypeScript class syntax.
 */

// 插件自定义样式
// 
// 另一个做法不太推荐，但也说一下。
// 使用库: import cssInjectedByJs from 'vite-plugin-css-injected-by-js';
// 使用: 放到 defineConfig plugins 中
// 功能: 可以将 CSS 内联到 JS 中，插件只需分发单个 .js 文件
import cssText from './style.css?inline';

import type { PluginInterface, PluginInterfaceCtx } from '../types/any-menu';

import { createApp, ref, h } from 'vue';
import SubPanel from './SubPanel.vue';

let cache_ctx: PluginInterfaceCtx | undefined

export default class ExamplePluginVue implements PluginInterface {
  metadata = {
    id: 'example-plugin-vue',
    name: 'Example Plugin Vue',
    version: '1.0.0',
    min_app_version: '1.1.0',
    author: 'your-name',
    description: 'A minimal AnyMenu plugin template based on Vue.',
    icon: 'lucide-printer',
    css: cssText,
  };

  onLoad(): void {
    console.log('[ExamplePluginVue] Plugin loaded');
  }

  onUnload(): void {
    if (cache_ctx) cache_ctx.api.unregisterSubPanel('example-plugin-vue-panel')
    console.log('[ExamplePluginVue] Plugin unloaded');
  }

  async run(ctx: PluginInterfaceCtx): Promise<void> {
    // 注册面板示例
    if (!cache_ctx) {
      cache_ctx = ctx
      const newPanel = document.createElement('div'); newPanel.classList.add('example-plugin-vue-panel');
      ctx.api.registerSubPanel({
          id: 'example-plugin-vue-panel',
          el: newPanel
      })

      // vue panel 1
      // Vue SFC 组件
      // 注意: 该写法需要 vue loader 依赖支持。该 demo 默认支持。如果你不需要，可根据 README 中的说明卸载相关依赖
      const panel1 = document.createElement('div'); newPanel.appendChild(panel1);
      createApp(SubPanel).mount(panel1)

      // vue panel 2
      // 组合式 API + Render
      const panel2 = document.createElement('div'); newPanel.appendChild(panel2);
      createApp({
        setup() {
          const count = ref(0);
          return () => h('div', [
            h('div', `(2) 组合式 API + Render`),
            h('button', { onClick: () => count.value++ }, `Count: ${count.value}`),
          ])
        }
        // 或直接 render 也行
        // render() {
        //   return h('div', '(2) 组合式 API + Render')
        // }
      }).mount(panel2);

      // vue panel 3
      // 选项式 API + Template
      // 注意: 这里的 Template 需要完整 vue 而非 runtime-only 版本支持。该 demo 默认不支持。如果需要，可根据 README 中的说明配置
      const panel3 = document.createElement('div'); newPanel.appendChild(panel3);
      createApp({
        data() {
          return { text: '(3) 选项式 Option API' }
        },
        template: `<div>{{ text }}</div>`
      }).mount(panel3)

      // vue panel 4
      // 组合式 API + Template
      // 注意: 这里的 Template 需要完整 vue 而非 runtime-only 版本支持。该 demo 默认不支持。如果需要，可根据 README 中的说明配置
      const panel4 = document.createElement('div'); newPanel.appendChild(panel4);
      createApp({
        setup() {
          const count = ref(1)
          return { count }
        },
        template: `<div>(4) 组合式 Composition API, count: {{ count }}</div>`
      }).mount(panel4)
    }

    // 文本输出示例
    const selected = ctx.env.selectedText;
    if (selected && selected.trim() !== '') {
      // 如果有选中文本，在其后追加问候
      ctx.api.sendText(`${selected} — ExamplePluginVue!`);
    } else {
      // 否则直接输出
      // ctx.api.sendText('ExamplePluginVue!');

      // 否则显示面板
      ctx.api.hidePanel(['menu'])
      ctx.api.showPanel(['example-plugin-vue-panel'])
    }

    ctx.api.notify('ExamplePluginVue plugin executed ✅');
  }
}
