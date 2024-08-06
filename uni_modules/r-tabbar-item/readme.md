# r-tabbar-item

`r-tabbar-item` 标签栏，底部导航栏，用于在不同页面之间进行切换。该组件为[r-tabbar](https://ext.dcloud.net.cn/plugin?id=19419)的子组件，导入[r-tabbar](https://ext.dcloud.net.cn/plugin?id=19419)使用即可

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 10rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-tabbar v-model:value="active" :fixed="false">
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">通过名称匹配 </r-divider>
      <r-tabbar v-model:value="active2" :fixed="false">
        <r-tabbar-item name="home" icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item name="search" icon="search">标签</r-tabbar-item>
        <r-tabbar-item name="friends" icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item name="setting" icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>
      <r-divider content-position="left">徽标提示 </r-divider>
      <r-tabbar v-model:value="active" :fixed="false">
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search" dot>标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o" badge="5">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o" badge="20">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">自定义图标 </r-divider>
      <r-tabbar v-model:value="active" :fixed="false">
        <r-tabbar-item badge="3">
          <span>自定义</span>
          <template #icon="props">
            <r-image
              width="var(--r-tabbar-item-icon-size)"
              height="var(--r-tabbar-item-icon-size)"
              :src="props.active ? icon.active : icon.inactive"
            />
          </template>
        </r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">自定义颜色 </r-divider>

      <r-tabbar v-model:value="active" active-color="#ee0a24" :fixed="false">
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">监听切换事件 </r-divider>

      <r-tabbar v-model:value="active" @change="onChange" :fixed="false">
        <r-tabbar-item icon="home-o">标签 1</r-tabbar-item>
        <r-tabbar-item icon="search">标签 2</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签 3</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签 4</r-tabbar-item>
      </r-tabbar>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const active = ref(0);
const active2 = ref("home");
const icon = ref({
  active: "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png",
  inactive: "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png",
});
const onChange = (e) => {
  console.log("e", e);
};
</script>
```

## API

### Tabbar Props

| 名称                   | 说明                                                            | 类型             | 默认值    | 可选值 |
| ---------------------- | --------------------------------------------------------------- | ---------------- | --------- | ------ |
| value                  | 当前选中标签的名称或索引值                                      | String\|Number   | 0         |        |
| fixed                  | 是否固定在顶部                                                  | Boolean          | false     |        |
| border                 | 是否显示下边框                                                  | Boolean          | true      |        |
| z-index                | 导航栏 z-index                                                  | String \| Number | 1         |        |
| active-color           | 选中标签的颜色                                                  | String           | `#1989fa` |        |
| inactive-color         | 未选中标签的颜色                                                | String           | `#7d7e80` |        |
| placeholder            | 固定在底部时，是否在标签位置生成一个等高的占位元素              | Boolean          | false     |        |
| safe-area-inset-bottom | 是否开启底部安全区适配                                          | Boolean          | false     |        |
| before-change          | 切换标签前的回调函数，返回 `false` 可阻止切换，支持返回 Promise | Function         | -         |        |
| themeName              | 主题名称                                                        | String           | default   |        |

### Tabbar Events

| 名称         | 说明           | 回调参数 |
| ------------ | -------------- | -------- |
| update:value | 切换标签时触发 | _active_ |
| change       | 切换标签后触发 | _active_ |

### TabbarItem Props

| 名称        | 说明                                                                              | 类型            | 默认值      | 可选值                                              |
| ----------- | --------------------------------------------------------------------------------- | --------------- | ----------- | --------------------------------------------------- |
| name        | 标签名称，作为匹配的标识符                                                        | Number\|String  | -           | -                                                   |
| icon        | 图标名称                                                                          | String          | -           | -                                                   |
| icon-prefix | 图标类名前缀                                                                      | String          | `van-icon`  | `iconfont`                                          |
| dot         | 是否显示图标右上角小红点                                                          | Boolean         | false       | true                                                |
| badge       | 图标右上角徽标的内容                                                              | Number\|String  | -           | -                                                   |
| badgeColor  | 徽标背景颜色                                                                      | String          | -           | -                                                   |
| max         | 最大值,超过最大值会显示 {max}+，仅当 content 为数字时有效                         | Number\| String | -           | -                                                   |
| offset      | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px | Array           | -           | -                                                   |
| showZero    | 当 content 为数字 0 或字符串 '0' 时，是否展示徽标                                 | Boolean         | true        | false                                               |
| position    | 徽标位置                                                                          | String          | `top-right` | `top-right` `top-left` `bottom-left` `bottom-right` |
| themeName   | 主题名称                                                                          | String          | default     |                                                     |

### TabbarItem Slots

| 名称 | 说明       | 回调参数 |
| ---- | ---------- | -------- |
| icon | 自定义图标 | _active_ |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)