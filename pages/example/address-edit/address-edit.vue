<template>
  <r-config-provider :themeName="themeName">
    <page-header title="地址编辑"></page-header>
    <r-address-edit
      :columns="columns"
      :columnsFieldNames="{
        text: 'label',
        value: 'value',
        children: 'children',
      }"
    ></r-address-edit>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import { region } from "@/uni_modules/r-region/js_sdk/region.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const columns = ref(region);
</script>

<style></style>
