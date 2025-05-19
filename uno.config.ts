import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(), // 默认预设 (Tailwind CSS 兼容)
    presetAttributify(), // 属性化模式支持，例如 <div text-xl text-red></div>
    presetIcons({
      // 图标预设
      scale: 1.2,
      warn: true,
    }),
  ],
  // 您可以在这里添加自定义规则、快捷方式等
  // shortcuts: {
  //   'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
  // },
});
