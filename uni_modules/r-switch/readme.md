# r-switch

r-switch 开关，用于在打开和关闭状态之间进行切换。

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础使用</view>
      <r-switch v-model:value="checked" />

      <view style="padding: 20px">基础使用</view>
      <r-switch v-model:value="checked" disabled />
      <view style="padding: 20px">加载状态</view>
      <r-switch v-model:value="checked" loading />
      <view style="padding: 20px">自定义大小</view>
      <r-switch v-model:value="checked" size="22px" />
      <view style="padding: 20px">自定义颜色</view>
      <r-switch
        v-model:value="checked"
        active-color="#ee0a24"
        inactive-color="#dcdee0"
      />
      <view style="padding: 20px">自定义按钮</view>
      <r-switch v-model:value="checked">
        <template #node>
          <div class="icon-wrapper">
            <r-icon
              size="36rpx"
              :color="checked ? 'var(--r-blue)' : 'var(--r-gray-5)'"
              :name="checked ? 'success' : 'cross'"
            />
          </div>
        </template>
      </r-switch>

      <view style="padding: 20px">搭配单元格使用</view>
      <r-cell center title="标题">
        <template #rightIcon>
          <r-switch v-model:value="checked" />
        </template>
      </r-cell>
      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const checked = ref(false);
</script>
<style>
.icon-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
}
</style>
```

## API

### Props

| 名称          | 说明               | 类型    | 默认值                    | 可选值 |
| ------------- | ------------------ | ------- | ------------------------- | ------ |
| value         | 开关选中状态       | any     | false                     | -      |
| loading       | 是否为加载状态     | Boolean | false                     | true   |
| disabled      | 是否为禁用状态     | Boolean | false                     | true   |
| size          | 开关按钮的尺寸     | String  | 52rpx                     |        |
| activeColor   | 打开时的背景色     | String  | #1989fa                   |        |
| inactiveColor | 关闭时的背景色     | String  | rgba(120, 120, 128, 0.16) |        |
| activeValue   | 打开时对应的值     | any     | true                      |        |
| inactiveValue | 关闭时对应的值     | any     | false                     |        |
| themeName     | r-theme 的主题名称 | String  | default                   |        |

### Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| node       | 自定义按钮的内容     |
| background | 自定义开关的背景内容 |

### Events

| 名称         | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| update:value | 开关状态切换时触发 | value    |
| change       | 开关状态切换时触发 | value    |
