<template>
  <r-config-provider :themeName="themeName">
    <page-header title="日历"></page-header>
    <view>
      <r-calendar></r-calendar>
    </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
</script>

<style></style>
