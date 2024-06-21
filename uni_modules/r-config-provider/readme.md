# r-config-provider 全局配置

r-config-provider 全局配置,用于全局配置 组件，提供深色模式、主题定制等能力

## 示例

```vue
<template>
  <r-config-provider theme="dark"> //rainui组件放置于此 </r-config-provider>
</template>

<script setup>
import { addTheme } from "@/uni_modules/r-theme/js_sdk/index.js";
//新增黑夜主题样式
addTheme("dark", {
  "r-background": "#000",
  "r-background-2": "#333",
  "r-badge-color": "#999",
});
</script>
```

## API

### Props

| 名称        | 说明             | 类型   | 默认值  | 可选值 |
| ----------- | ---------------- | ------ | ------- | ------ |
| themeName   | r-theme 主题样式 | String | default |        |
| customStyle | 自定义样式       | Object | {}      |        |

### Slots

| 名称    | 说明                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| default | 默认插槽(内部的[`rainui`](https://gitee.com/uv86e/rainui)组件样式将会统一切换) |

###
