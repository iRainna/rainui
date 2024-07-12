
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础使用</view>
      <r-switch v-model:value="checked" />

      <view style="padding: 20px">基础使用</view>
      <r-switch v-model:value="checked" disabled />
      <view style="padding: 20px">加载状态</view>
      <r-switch v-model:value="checked" loading />
      <view style="padding: 20px">自定义大小</view>
      <r-switch v-model:value="checked" size="22px" />
      <view style="padding: 20px">自定义颜色</view>
      <r-switch
        v-model:value="checked"
        active-color="#ee0a24"
        inactive-color="#dcdee0"
      />
      <view style="padding: 20px">自定义按钮</view>
      <r-switch v-model:value="checked">
        <template #node>
          <div class="icon-wrapper">
            <r-icon
              size="36rpx"
              :color="checked ? 'var(--r-blue)' : 'var(--r-gray-5)'"
              :name="checked ? 'success' : 'cross'"
            />
          </div>
        </template>
      </r-switch>

      <view style="padding: 20px">搭配单元格使用</view>
      <r-cell center title="标题">
        <template #rightIcon>
          <r-switch v-model:value="checked" />
        </template>
      </r-cell>
      <view style="padding: 20px"></view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const checked = ref(false);
</script>
<style>
.icon-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
}
</style>