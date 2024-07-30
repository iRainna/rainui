<template>
  <r-config-provider :themeName="themeName">
    <page-header title="折叠面板"></page-header>
    <view style="padding: 20px">基础使用</view>
    <r-collapse v-model:value="activeNames">
      <r-collapse-item title="标题1" name="1">
        代码是写出来给人看的，附带能在机器上运行。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题3" name="3">
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </r-collapse-item>
    </r-collapse>
    <view style="padding: 20px">手风琴</view>
    <r-collapse v-model:value="activeName2" accordion>
      <r-collapse-item title="标题1" name="1">
        代码是写出来给人看的，附带能在机器上运行。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题3" name="3">
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </r-collapse-item>
    </r-collapse>
    <view style="padding: 20px">禁用状态</view>
    <r-collapse v-model:value="activeNames3">
      <r-collapse-item title="标题1" name="1">
        代码是写出来给人看的，附带能在机器上运行。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2" disabled>
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题3" name="3" disabled>
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </r-collapse-item>
    </r-collapse>
    <view style="padding: 20px">自定义标题内容</view>
    <r-collapse v-model:value="activeNames4">
      <r-collapse-item name="1">
        <template #title>
          <div>标题1 <r-icon name="question-o" /></div>
        </template>
        代码是写出来给人看的，附带能在机器上运行。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2" icon="shop-o">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
    </r-collapse>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const activeNames = ref(["1"]);
const activeName2 = ref(["1"]);
const activeNames3 = ref(["1"]);
const activeNames4 = ref(["1"]);
const activeNames5 = ref(["1"]);
const collapse = ref(null);
const openAll = () => {
  collapse.value.toggleAll(true);
};
const toggleAll = () => {
  collapse.value.toggleAll();
};
</script>
