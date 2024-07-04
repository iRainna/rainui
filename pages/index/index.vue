<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">
        <r-divider content-position="left">基础使用</r-divider>
        <r-checkbox v-model:value="checked">复选框</r-checkbox>

        <r-divider content-position="left">禁用状态</r-divider>
        <r-checkbox v-model:value="checked" disabled>复选框</r-checkbox>

        <r-divider content-position="left">自定义形状</r-divider>
        <r-checkbox-group v-model:value="checked2" shape="round">
          <r-checkbox name="a">复选框 a</r-checkbox>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </r-checkbox-group>

        <r-divider content-position="left">自定义颜色</r-divider>
        <r-checkbox v-model:value="checked" checked-color="#ee0a24"
          >复选框</r-checkbox
        >
        <r-divider content-position="left">自定义大小</r-divider>
        <r-checkbox v-model:value="checked" icon-size="24px">复选框</r-checkbox>

        <r-divider content-position="left">自定义图标</r-divider>
        <r-checkbox v-model:value="checked">
          自定义图标
          <template #icon="props">
            <r-image
              width="20px"
              height="20px"
              :src="props.checked ? activeIcon : inactiveIcon"
            />
          </template>
        </r-checkbox>

        <r-divider content-position="left">左侧文本</r-divider>
        <r-checkbox v-model:value="checked" label-position="left"
          >复选框</r-checkbox
        >
      

        <r-divider content-position="left">复选框组</r-divider>
        <r-checkbox-group v-model:value="checked2">
          <r-checkbox name="a">复选框 a</r-checkbox>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </r-checkbox-group>

        <r-divider content-position="left">水平排列</r-divider>
        <r-checkbox-group v-model:value="checked2" direction="horizontal">
          <r-checkbox name="a">复选框 a</r-checkbox>
          <r-checkbox name="b">复选框 b</r-checkbox>
        </r-checkbox-group>

       
      </view>
      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const activeIcon = ref(
  "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
);
const inactiveIcon = ref(
  "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png"
);
const checked = ref(false);
const checked2 = ref([]);
</script>
