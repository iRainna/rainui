<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基本使用</view>
      <r-rate v-model:value="value" />

      <view style="padding: 20px">自定义图标</view>
      <r-rate v-model:value="value" icon="like" void-icon="like-o" />

      <view style="padding: 20px">自定义样式</view>
      <r-rate
        v-model:value="value"
        size="50rpx"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />

      <view style="padding: 20px">半星</view>
      <r-rate v-model:value="value2" allow-half />

      <view style="padding: 20px">自定义数量</view>
      <r-rate v-model:value="value" :count="6" />

      <view style="padding: 20px">可清空</view>
      <r-rate v-model:value="value" clearable />

      <view style="padding: 20px">禁用状态</view>
      <r-rate v-model:value="value" disabled />

      <view style="padding: 20px">只读状态</view>
      <r-rate v-model:value="value" readonly />

      <view style="padding: 20px">只读状态显示小数</view>
      <r-rate v-model:value="value2" readonly allow-half />

      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const value = ref(1);
const value2 = ref(1.7);
</script>
