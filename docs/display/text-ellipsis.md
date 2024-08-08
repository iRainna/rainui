<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/text-ellipsis/text-ellipsis'
 </script>

# r-text-ellipsis

`r-text-ellipsis` 文本省略，对长文本进行省略，支持展开/收起。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-text-ellipsis :content="text" />

      <r-divider content-position="left">展开/收起</r-divider>
      <r-text-ellipsis
        :content="text2"
        expand-text="展开"
        collapse-text="收起"
      />
      <r-divider content-position="left">自定义展示行数</r-divider>
      <r-text-ellipsis
        :rows="2"
        :content="text3"
        expand-text="展开"
        collapse-text="收起"
      />

      <r-divider content-position="left">自定义省略位置--头部省略</r-divider>
      <r-text-ellipsis
        :rows="1"
        :content="text3"
        expand-text="展开"
        collapse-text="收起"
        position="start"
      />
      <r-divider content-position="left">自定义省略位置--中部省略</r-divider>
      <r-text-ellipsis
        :rows="3"
        :content="text3"
        expand-text="展开"
        collapse-text="收起"
        position="middle"
      />

      <r-divider content-position="left">自定义操作内容</r-divider>
      <r-text-ellipsis :content="text">
        <template #action="{ expanded }">{{
          expanded ? "收起" : "展开"
        }}</template>
      </r-text-ellipsis>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const text = ref("慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。");
const text2 = ref(
  "似水流年是一个人所有的一切，只有这个东西，才真正归你所有。其余的一切，都是片刻的欢娱和不幸，转眼间就已跑到那似水流年里去了。"
);

const text3 = ref(
  "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。"
);
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

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
