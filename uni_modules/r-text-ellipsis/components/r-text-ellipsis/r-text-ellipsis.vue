<template>
  <view></view>
</template>
<script setup></script>
<style lang="scss" scoped>
.van-text-ellipsis {
  line-height: var(--van-text-ellipsis-line-height);
  white-space: pre-wrap;
  overflow-wrap: break-word;

  &__action {
    cursor: pointer;
    color: var(--van-text-ellipsis-action-color);

    &:active {
      opacity: var(--van-active-opacity);
    }
  }
}
</style>
