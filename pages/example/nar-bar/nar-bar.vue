<template>
  <r-config-provider :themeName="themeName">
    <page-header title="导航栏"></page-header>
    <view style="padding: 10rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-nav-bar title="标题" />

      <r-divider content-position="left">返回上级</r-divider>
      <r-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <r-divider content-position="left">右侧按钮</r-divider>

      <r-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <r-divider content-position="left">使用插槽</r-divider>

      <r-nav-bar title="标题" left-text="返回" left-arrow>
        <template #right>
          <r-icon
            name="search"
            size="36rpx"
            color="var(--r-nav-bar-icon-color)"
          />
        </template>
      </r-nav-bar>

      <r-divider content-position="left">禁用按钮</r-divider>
      <r-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        left-disabled
        right-disabled
      />
    </view>
  </r-config-provider>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const onClickLeft = () => {
  uni.navigateBack();
};

const onClickRight = () => {
  console.log("click right");
};
</script>
