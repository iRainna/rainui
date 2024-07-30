<template>
  <r-config-provider :themeName="themeName">
    <page-header title="标签页"></page-header>
    <r-tabs v-model:active="tabActive">
      <r-tab title="标签 1" name="tab1">内容 1 </r-tab>
      <r-tab title="标签 2" name="tab2">内容 2</r-tab>
      <r-tab title="标签 3" name="tab3">内容 3</r-tab>
      <r-tab title="标签 4" name="tab4">内容 4</r-tab>
      <r-tab title="标签 5" name="tab5">内容 5</r-tab>
      <r-tab title="标签 6" name="tab6">内容 6</r-tab>
      <r-tab title="标签 7" name="tab7">内容 7</r-tab>
      <r-tab title="标签 8" name="tab8">内容 8</r-tab>
      <r-tab title="标签 9" name="tab9">内容 9</r-tab>
      <r-tab title="标签 0" name="tab0">内容 0</r-tab>
    </r-tabs>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const tabActive = ref("tab1");
</script>
