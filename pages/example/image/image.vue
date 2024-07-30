<template>
  <r-config-provider :themeName="themeName">
    <page-header title="图片"></page-header>
    <view> image </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
</script>
