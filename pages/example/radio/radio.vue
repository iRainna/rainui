<template>
  <r-config-provider :themeName="themeName">
    <page-header title="单选框"></page-header>
    <view style="padding: 20px">
      <r-divider content-position="left">基础使用</r-divider>
      <r-radio-group v-model:value="radioData">
        <r-radio name="1">单选框 1</r-radio>
        <r-radio name="2">单选框 2</r-radio>
      </r-radio-group>

      <r-divider content-position="left">水平排列 </r-divider>
      <r-radio-group v-model:value="radioData" direction="horizontal">
        <r-radio name="1">单选框 1</r-radio>
        <r-radio name="2">单选框 2</r-radio>
      </r-radio-group>

      <r-divider content-position="left">禁用状态 </r-divider>
      <r-radio-group v-model:value="radioData" disabled>
        <r-radio name="1">单选框 1</r-radio>
        <r-radio name="2">单选框 2</r-radio>
      </r-radio-group>

      <r-divider content-position="left">自定义形状 </r-divider>
      <r-radio-group v-model:value="radioData" shape="square">
        <r-radio name="1">单选框 1</r-radio>
        <r-radio name="2">单选框 2</r-radio>
      </r-radio-group>
      <r-divider content-position="left">自定义形状 </r-divider>
      <r-radio-group v-model:value="radioData" shape="dot">
        <r-radio name="1">Radio 1</r-radio>
        <r-radio name="2">Radio 2</r-radio>
      </r-radio-group>
      <r-divider content-position="left">自定义颜色 </r-divider>
      <r-radio-group v-model:value="radioData">
        <r-radio name="1" checked-color="#ee0a24">单选框 1</r-radio>
        <r-radio name="2" checked-color="#ee0a24">单选框 2</r-radio>
      </r-radio-group>
      <r-divider content-position="left">基础使用</r-divider>
      <r-radio-group v-model:value="radioData">
        <r-radio name="1" icon-size="24px">单选框 1</r-radio>
        <r-radio name="2" icon-size="24px">单选框 2</r-radio>
      </r-radio-group>
      <r-divider content-position="left">左侧文本 </r-divider>
      <r-radio-group v-model:value="radioData">
        <r-radio name="1" label-position="left">单选框 1</r-radio>
        <r-radio name="2" label-position="left">单选框 2</r-radio>
      </r-radio-group>
      <r-divider content-position="left">禁用文本点击 </r-divider>
      <r-radio-group v-model:value="radioData">
        <r-radio name="1" label-disabled>单选框 1</r-radio>
        <r-radio name="2" label-disabled>单选框 2</r-radio>
      </r-radio-group>
      <r-divider content-position="left">自定义图标 </r-divider>
      <r-radio-group v-model:value="radioData">
        <r-radio name="1">
          单选框 1
          <template #icon="props">
            <image
              style="height: 20px; width: 20px"
              :src="props.checked ? activeURL : inactiveURL"
            />
          </template>
        </r-radio>
        <r-radio name="2">
          单选框 2
          <template #icon="props">
            <image
              style="height: 20px; width: 20px"
              :src="props.checked ? activeURL : inactiveURL"
            />
          </template>
        </r-radio>
      </r-radio-group>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const radioData = ref("1");
const activeURL = ref(
  "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
);
const inactiveURL = ref(
  "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png"
);
</script>

<style></style>
