# r-tabs

`r-tabs `选项卡组件，用于在不同的内容区域之间进行切换。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="标签页"></page-header>
    <r-divider content-position="left">基本使用</r-divider>
    <r-tabs v-model:active="tabActive" @change="onChange">
      <r-tab title="标签 1">内容 1</r-tab>
      <r-tab title="标签 2">内容 2</r-tab>
      <r-tab title="标签 3">内容 3</r-tab>
      <r-tab title="标签 4">内容 4</r-tab>
    </r-tabs>
    <r-divider content-position="left">通过名称匹配</r-divider>
    <r-tabs v-model:active="activeName">
      <r-tab title="标签 1" name="a">内容 1</r-tab>
      <r-tab title="标签 2" name="b">内容 2</r-tab>
      <r-tab title="标签 3" name="c">内容 3</r-tab>
    </r-tabs>
    <r-divider content-position="left">标签栏滚动 </r-divider>
    <r-tabs v-model:active="active">
      <r-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </r-tab>
    </r-tabs>

    <r-divider content-position="left">禁用标签 </r-divider>
    <r-tabs v-model:active="active">
      <r-tab title="标签 1">内容 1</r-tab>
      <r-tab title="标签 2" disabled>内容 2</r-tab>
      <r-tab title="标签 3">内容 3</r-tab>
    </r-tabs>

    <r-divider content-position="left">样式风格 </r-divider>
    <r-tabs v-model:active="active" type="card" :duration="0">
      <r-tab title="标签 1">内容 1</r-tab>
      <r-tab title="标签 2">内容 2</r-tab>
      <r-tab title="标签 3">内容 3</r-tab>
    </r-tabs>

    <r-divider content-position="left">收缩布局 </r-divider>

    <r-tabs v-model:active="active" shrink>
      <r-tab v-for="index in 4" :key="index" :title="'标签 ' + index">
        内容 {{ index }}
      </r-tab>
    </r-tabs>
    <r-divider content-position="left">自定义标签 </r-divider>

    <r-tabs v-model:active="active">
      <template #title="{ item, isActive, index }">
        <view
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12rpx;
          "
        >
          <r-icon :name="index ? 'more-o' : 'gift-o'" color="inherit"></r-icon>
          {{ item.title }}
        </view>
      </template>
      <r-tab v-for="index in 2" :title="'标题' + index">
        内容 {{ index }}
      </r-tab>
    </r-tabs>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const activeName = ref("a");
const tabActive = ref(0);
const active = ref(0);
const onChange = (e) => {
  console.log("e", e);
};
</script>
```

## API

### Tabs Props

| 名称           | 说明                                                           | 类型           | 默认值                       | 可选值 |
| -------------- | -------------------------------------------------------------- | -------------- | ---------------------------- | ------ |
| active         | 绑定当前选中标签的标识符                                       | Number\|String | 0                            | -      |
| type           | 样式风格类型                                                   | String         | `line`                       | `card` |
| color          | 标签主题色                                                     | String         | #1989fa                      |        |
| background     | 标签栏背景色                                                   | String         | var(--r-tabs-nav-background) |        |
| duration       | 动画时间，单位毫秒                                             | Number         | 300                          |        |
| lineWidth      | 底部条宽度                                                     | String         | 80rpx                        |        |
| lineHeight     | 底部条高度                                                     | String         | 6rpx                         |        |
| animated       | 是否开启切换标签内容时的转场动画                               | Boolean        | false                        |        |
| border         | 是否显示标签栏外边框，仅在 type="line" 时有效                  | Boolean        | false                        |        |
| ellipsis       | 是否省略过长的标题文字                                         | Boolean        | true                         |        |
| sticky         | 是否使用粘性布局                                               | Boolean        | false                        |        |
| shrink         | 是否开启左侧收缩布局                                           | Boolean        | false                        |        |
| swipeThreshold | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动 | Number         | 5                            |        |
| beforeChange   | 切换标签前的回调函数，返回 false 可阻止切换，支持返回 Promise  | Function       |                              |        |
| themeName      | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 的主题    | String         | default                      |        |

### Tab Props

| 名称          | 说明                                                            | 类型             | 默认值  | 可选值 |
| ------------- | --------------------------------------------------------------- | ---------------- | ------- | ------ |
| title         | 标题                                                            | String           | -       | -      |
| dot           | 是否在标题右上角显示小红点                                      | Boolean          | false   | true   |
| disabled      | 是否禁用标签                                                    | Boolean          | false   | true   |
| badge         | 图标右上角徽标的内容                                            | String           |         |        |
| name          | 标签名称，作为匹配的标识符                                      | String \| Number |         |        |
| showZeroBadge | 当 badge 为数字 0 时，是否展示徽标                              | Boolean          | true    |        |
| themeName     | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 的主题名称 | String           | default |        |

### Tabs Slots

| 名称      | 说明         | 参数 |
| --------- | ------------ | ---- |
| title     | title 处插槽 | item |
| navLeft   | nav 左侧     | -    |
| navRight  | nav 右侧     | -    |
| navBottom | nav 下侧     | -    |
| default   | 默认插槽     |      |

### Tabs Events

| 名称          | 说明                     | 回调参数                      |
| ------------- | ------------------------ | ----------------------------- |
| update:active | 当前激活的标签改变时触发 | name                          |
| change        | 当前激活的标签改变时触发 | name,title                    |
| rendered      | 标签内容首次渲染时触发   | name,title                    |
| clickTab      | 点击标签时触发           | { name,title,event,disabled } |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)