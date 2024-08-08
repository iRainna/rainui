<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/sidebar/sidebar'
 </script>

# r-sidebar

`r-sidebar` 侧边导航，垂直展示的导航栏，用于在不同的内容区域之间进行切换。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20px; background-color: #f8f7f6">
      <r-divider content-position="left">基本使用</r-divider>
      <r-sidebar v-model:value="active">
        <r-sidebar-item title="标签名称" />
        <r-sidebar-item title="标签名称" />
        <r-sidebar-item title="标签名称" />
      </r-sidebar>

      <r-divider content-position="left">徽标提示</r-divider>

      <r-sidebar v-model:value="active">
        <r-sidebar-item title="标签名称" dot />
        <r-sidebar-item title="标签名称" badge="5" />
        <r-sidebar-item title="标签名称" />
      </r-sidebar>

      <r-divider content-position="left">禁用选项</r-divider>
      <r-sidebar v-model:value="active">
        <r-sidebar-item title="标签名称" />
        <r-sidebar-item title="标签名称" disabled />
        <r-sidebar-item title="标签名称" />
      </r-sidebar>

      <r-divider content-position="left">监听切换事件</r-divider>

      <r-sidebar v-model:value="active" @change="onChange">
        <r-sidebar-item title="标签名 1" />
        <r-sidebar-item title="标签名 2" />
        <r-sidebar-item title="标签名 3" />
      </r-sidebar>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const active = ref(0);
const onChange = (index) => {
  console.log(index);
};
</script>
```

## API

### Sidebar Props

| 名称      | 说明             | 类型           | 默认值  | 可选值 |
| --------- | ---------------- | -------------- | ------- | ------ |
| value     | 当前导航项的索引 | Number\|String | 0       |        |
| themeName | 主题名称         | String         | default |        |

### SidebarItem Props

| 名称       | 说明                                                                              | 类型             | 默认值      | 可选值                                  |
| ---------- | --------------------------------------------------------------------------------- | ---------------- | ----------- | --------------------------------------- |
| title      | 内容                                                                              | String           | -           |                                         |
| dot        | 是否显示图标右上角小红点                                                          | Boolean          | false       |                                         |
| badge      | 图标右上角徽标的内容                                                              | String\|Number   | -           |                                         |
| badgeColor | 徽标背景颜色                                                                      | String           | `#ee0a24`   |                                         |
| max        | 徽标最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效                    | String \| Number | -           |                                         |
| offset     | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px | Array            | -           |                                         |
| showZero   | 当 徽标值为数字 0 或字符串 '0' 时，是否展示徽标                                   | Boolean          | true        |                                         |
| position   | 徽标位置                                                                          | String           | `top-right` | `top-left` `bottom-left` `bottom-right` |
| disabled   | 是否禁用该项                                                                      | Boolean          | false       |                                         |
| themeName  | 主题名称                                                                          | String           | default     |                                         |

### Sidebar Events

| 名称         | 说明             | 回调参数 |
| ------------ | ---------------- | -------- |
| change       | 切换导航项后触发 | index    |
| update:value | 切换导航项时触发 | index    |

### SidebarItem Events

| 名称  | 说明       | 回调参数 |
| ----- | ---------- | -------- |
| click | 点击时触发 | index    |

### SidebarItem Slots

| 名称  | 说明       |
| ----- | ---------- |
| title | 自定义标题 |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
