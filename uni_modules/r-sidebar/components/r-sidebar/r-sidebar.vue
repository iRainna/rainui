<template>
  <view :class="{ 'van-sidebar': true }">
    <slot></slot>
  </view>
</template>
<script setup></script>
<style lang="scss" scoped>
.van-sidebar {
  width: var(--van-sidebar-width);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
