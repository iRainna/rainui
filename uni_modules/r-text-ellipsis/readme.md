# r-text-ellipsis

`r-text-ellipsis` 文本省略，对长文本进行省略，支持展开/收起。

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
[完整文档请前往](https://irainna.github.io/rainui/)

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="文本省略"></page-header>
    <view style="padding: 20rpx">
      <template v-for="(m, n) in list" :key="n">
        <r-divider content-position="left">{{ m.title }} </r-divider>

        <r-animation
          :show="m.animation"
          @open="
            () => {
              m.show = true;
            }
          "
          @closed="
            () => {
              m.show = false;
            }
          "
        >
          <r-text-ellipsis
            :content="m.text"
            :expandText="m.expandText || ''"
            :collapseText="m.collapseText || ''"
            :rows="m.rows || 1"
            :position="m.position"
            v-if="m.show"
          >
            <template #action="{ expanded }" v-if="m.showAction">{{
              expanded ? "收起" : "展开"
            }}</template>
          </r-text-ellipsis>
        </r-animation>
      </template>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const list = ref([
  {
    text: "慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。",
    title: "基本使用",
    show: false,
    animation: true,
  },

  {
    text: "似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。",
    title: "展开/收起",
    expandText: "展开",
    collapseText: "收起",
    show: false,
    animation: true,
  },
  {
    text: "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。",
    title: "自定义展示行数",
    expandText: "展开",
    collapseText: "收起",
    rows: 2,
    show: false,
    animation: true,
  },
  {
    text: "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。",
    title: "头部省略",
    expandText: "展开",
    collapseText: "收起",
    rows: 1,
    show: false,
    position: "start",
    animation: true,
  },
  {
    text: "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。",
    title: "中部省略",
    expandText: "展开",
    collapseText: "收起",
    rows: 3,
    show: false,
    position: "middle",
    animation: true,
  },
  {
    text: "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。",
    title: "自定义操作内容",
    rows: 2,
    show: false,
    position: "end",
    showAction: true,
    animation: true,
  },
]);
</script>
```

## API

### Props

| 名称         | 说明             | 类型   | 默认值    | 可选值                 |
| ------------ | ---------------- | ------ | --------- | ---------------------- |
| rows         | 展示的行数       | Number | 1         | -                      |
| content      | 需要展示的文本   | String | -         | -                      |
| expandText   | 展开操作的文案   | String | -         | -                      |
| collapseText | 收起操作的文案   | String | -         | -                      |
| dots         | 省略号的文本内容 | String | `...`     | -                      |
| fontSize     | 字号(px)         | Number | 16        |                        |
| position     | 省略位置         | String | `end`     | `end` `start` `middle` |
| themeName    | r-theme 主题名称 | String | `default` |                        |

### Events

| 名称         | 说明                | 参数 |
| ------------ | ------------------- | ---- |
| click-action | 点击展开/收起时触发 | e    |

### Slots

| 名称   | 说明       | 参数         |
| ------ | ---------- | ------------ |
| action | 自定义操作 | {_expanded_} |

### Methods

| 名称   | 说明                                                               | 参数       |
| ------ | ------------------------------------------------------------------ | ---------- |
| toggle | 切换文本的展开状态，传 `true` 为展开，`false` 为收起，不传参为切换 | [expanded] |
