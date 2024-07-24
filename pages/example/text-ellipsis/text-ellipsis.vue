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
