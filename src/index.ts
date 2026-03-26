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

export default class HelloWorldPlugin implements PluginInterface {
  metadata = {
    id: 'hello-world',
    name: 'Hello World',
    version: '1.0.0',
    min_app_version: '1.1.0',
    author: 'your-name',
    description: 'A minimal AnyMenu plugin template that prints Hello World.',
    icon: 'lucide-printer',
    css: cssText,
  };

  onLoad(): void {
    console.log('[HelloWorld] Plugin loaded');
  }

  onUnload(): void {
    console.log('[HelloWorld] Plugin unloaded');
  }

  async run(ctx: PluginInterfaceCtx): Promise<void> {
    const selected = ctx.env.selectedText;

    if (selected) {
      // 如果有选中文本，在其后追加问候
      ctx.api.sendText(`${selected} — Hello World!`);
    } else {
      // 否则直接输出
      ctx.api.sendText('Hello World!');
    }

    ctx.api.notify('Hello World plugin executed ✅');
  }
}
