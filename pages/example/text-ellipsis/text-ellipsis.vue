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
