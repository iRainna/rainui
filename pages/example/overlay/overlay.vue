<template>
  <r-config-provider :themeName="themeName">
    <page-header title="遮罩层"></page-header>
    <view> 遮罩层 </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
</script>
