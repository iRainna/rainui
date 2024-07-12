<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">
        <r-divider content-position="left">基础使用</r-divider>
        <r-highlight :keywords="keywords" :sourceString="text" />

        <r-divider content-position="left">多字符匹配</r-divider>
        <r-highlight :keywords="keywords2" :sourceString="text2" />

        <r-divider content-position="left">自定义高亮标签样式</r-divider>
        <r-highlight
          :keywords="keywords"
          :sourceString="text"
          :highlightStyle="{
            color: 'red',
          }"
        />
      </view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const text = ref("慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。");
const keywords = ref("难题");

const text2 = ref("慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。");
const keywords2 = ref(["难题", "终有一天", "答案"]);
</script>
