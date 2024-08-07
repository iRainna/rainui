# r-checkbox

`r-checkbox`复选框，在一组备选项中进行多选。

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">
        <r-divider content-position="left">基础使用</r-divider>
        <r-checkbox v-model:value="checked">复选框</r-checkbox>

        <r-divider content-position="left">禁用状态</r-divider>
        <r-checkbox v-model:value="checked" disabled>复选框</r-checkbox>

        <r-divider content-position="left">自定义形状</r-divider>
        <r-checkbox-group v-model:value="checked2" shape="round">
          <r-checkbox name="a">复选框 a</r-checkbox>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </r-checkbox-group>

        <r-divider content-position="left">自定义颜色</r-divider>
        <r-checkbox v-model:value="checked" checked-color="#ee0a24"
          >复选框</r-checkbox
        >
        <r-divider content-position="left">自定义大小</r-divider>
        <r-checkbox v-model:value="checked" icon-size="24px">复选框</r-checkbox>

        <r-divider content-position="left">自定义图标</r-divider>
        <r-checkbox v-model:value="checked">
          自定义图标
          <template #icon="props">
            <r-image
              width="20px"
              height="20px"
              :src="props.checked ? activeIcon : inactiveIcon"
            />
          </template>
        </r-checkbox>

        <r-divider content-position="left">左侧文本</r-divider>
        <r-checkbox v-model:value="checked" label-position="left"
          >复选框</r-checkbox
        >

        <r-divider content-position="left">复选框组</r-divider>
        <r-checkbox-group v-model:value="checked2">
          <r-checkbox name="a">复选框 a</r-checkbox>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </r-checkbox-group>

        <r-divider content-position="left">水平排列</r-divider>
        <r-checkbox-group v-model:value="checked2" direction="horizontal">
          <r-checkbox name="a">复选框 a</r-checkbox>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </r-checkbox-group>
      </view>
      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const activeIcon = ref(
  "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
);
const inactiveIcon = ref(
  "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png"
);
const checked = ref(false);
const checked2 = ref([]);
</script>
```

## API

### Checkbox Props

| 名称          | 说明                                                           | 类型    | 默认值   | 可选值         |
| ------------- | -------------------------------------------------------------- | ------- | -------- | -------------- |
| value         | 是否为选中状态                                                 | Boolean | false    | -              |
| name          | 标识符，通常为一个唯一的字符串或数字                           | any     | -        | -              |
| shape         | 形状                                                           | String  | round    | `square` `dot` |
| disabled      | 是否为禁用状态                                                 | Boolean | false    | true           |
| labelPosition | 文本位置                                                       | String  | right    | left           |
| iconSize      | 图标大小                                                       | String  | 40rpx    |                |
| checkedColor  | 选中状态颜色                                                   | String  | \#1989fa |                |
| bindGroup     | 是否与复选框组绑定                                             | Boolean | true     |                |
| themeName     | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)的主题名称 | String  | default  |                |

### CheckboxGroup Props

| 名称         | 说明                                                           | 类型    | 默认值   | 可选值        |
| ------------ | -------------------------------------------------------------- | ------- | -------- | ------------- |
| value        | 所有选中项的标识符                                             | any     | -        | -             |
| disabled     | 是否禁用所有单选框                                             | Boolean | false    | true          |
| direction    | 排列方向                                                       | String  | vertical | horizontal    |
| shape        | 形状                                                           | String  | `square` | `round` `dot` |
| iconSize     | 所有单选框的图标大小                                           | String  | 40rpx    |               |
| checkedColor | 所有单选框的选中状态颜色                                       | String  | \#1989fa |               |
| themeName    | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)的主题名称 | String  | default  |               |

### Checkbox Slots

| 名称    | 说明       | 参数                                      |
| ------- | ---------- | ----------------------------------------- |
| default | 自定义文本 | -                                         |
| icon    | 自定义图标 | _{ checked: boolean, disabled: boolean }_ |

### Checkbox Events

| 名称         | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| update:value | 当绑定值变化时触发的事件 | value    |
| change       | 当绑定值变化后触发的事件 | value    |
| click        | 点击单选框时触发         | e        |

### CheckboxGroup Events

| 名称         | 说明                     | 回调参数 |
| ------------ | ------------------------ | -------- |
| update:value | 当绑定值变化时触发的事件 | value    |
| change       | 当绑定值变化后触发的事件 | value    |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
