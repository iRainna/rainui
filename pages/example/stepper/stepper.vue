<template>
  <r-config-provider :themeName="themeName">
    <page-header title="步进器"></page-header>
    <view style="padding: 20rpx 0">
      <r-cell-group inset>
        <r-cell title="基础用法">
          <template #value>
            <r-stepper v-model:value="value" />
          </template>
        </r-cell>

        <r-cell title="步长设置">
          <template #value>
            <r-stepper v-model:value="value" step="2" />
          </template>
        </r-cell>

        <r-cell title="限制输入范围">
          <template #value>
            <r-stepper v-model:value="value2" :min="5" :max="8" />
          </template>
        </r-cell>

        <r-cell title="限制输入整数">
          <template #value>
            <r-stepper v-model:value="value3" integer />
          </template>
        </r-cell>

        <r-cell title="禁用状态">
          <template #value>
            <r-stepper v-model:value="value" disabled />
          </template>
        </r-cell>

        <r-cell title="禁用输入框">
          <template #value>
            <r-stepper v-model:value="value" disable-input />
          </template>
        </r-cell>

        <r-cell title="固定小数位数">
          <template #value>
            <r-stepper v-model:value="value4" step="0.2" :decimal-length="1" />
          </template>
        </r-cell>

        <r-cell title="自定义大小">
          <template #value>
            <r-stepper
              v-model:value="value"
              input-width="40px"
              button-size="32px"
            />
          </template>
        </r-cell>

        <r-cell title="圆角风格">
          <template #value>
            <r-stepper
              v-model:value="value"
              theme="round"
              button-size="22"
              disable-input
            />
          </template>
        </r-cell>
      </r-cell-group>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const value = ref(1);
const value2 = ref(5);
const value3 = ref(1);
const value4 = ref(1.0);
</script>
