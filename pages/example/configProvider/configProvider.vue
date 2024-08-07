<template>
  <r-config-provider :themeName="themeName">
    <page-header title="全局配置"></page-header>
    <r-button @click="changeTheme(themeName == 'default' ? 'dark' : 'default')"
      >切换</r-button
    >
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName, changeTheme } = useTheme();
</script>

<style></style>
