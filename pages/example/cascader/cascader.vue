<template>
  <r-config-provider :themeName="themeName">
    <page-header title="级联选择"></page-header>
    <view> </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
</script>
