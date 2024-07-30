<template>
  <r-config-provider :themeName="themeName">
    <page-header title="步骤条"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-steps
        :active="active"
        @click-step="
          (index) => {
            active = index;
          }
        "
      >
        <r-step>买家下单</r-step>
        <r-step>商家接单</r-step>
        <r-step>买家提货</r-step>
        <r-step>交易完成</r-step>
      </r-steps>
      <r-divider content-position="left">自定义样式</r-divider>
      <r-steps
        :active="active2"
        active-icon="success"
        active-color="#07c160"
        inactive-icon="arrow"
        @click-step="
          (index) => {
            active2 = index;
          }
        "
      >
        <r-step>买家下单</r-step>
        <r-step>商家接单</r-step>
        <r-step>买家提货</r-step>
        <r-step>交易完成</r-step>
      </r-steps>

      <r-divider content-position="left">竖向步骤条 </r-divider>

      <r-steps
        direction="vertical"
        :active="active3"
        @click-step="
          (index) => {
            active3 = index;
          }
        "
      >
        <r-step>
          <view>【城市】物流状态1</view>
          <text>2016-07-12 12:40</text>
        </r-step>
        <r-step>
          <view>【城市】物流状态2</view>
          <text>2016-07-11 10:00</text>
        </r-step>
        <r-step>
          <view>快件已发货</view>
          <text>2016-07-10 09:30</text>
        </r-step>
      </r-steps>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const active = ref(1);
const active2 = ref(2);
const active3 = ref(0);
</script>
