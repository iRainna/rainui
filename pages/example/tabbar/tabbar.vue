<template>
  <r-config-provider>
    <view style="padding: 10rpx 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-tabbar v-model:value="active" :fixed="false">
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">通过名称匹配 </r-divider>
      <r-tabbar v-model:value="active2" :fixed="false">
        <r-tabbar-item name="home" icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item name="search" icon="search">标签</r-tabbar-item>
        <r-tabbar-item name="friends" icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item name="setting" icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>
      <r-divider content-position="left">徽标提示 </r-divider>
      <r-tabbar v-model:value="active" :fixed="false">
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search" dot>标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o" badge="5">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o" badge="20">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">自定义图标 </r-divider>
      <r-tabbar v-model:value="active" :fixed="false">
        <r-tabbar-item badge="3">
          <span>自定义</span>
          <template #icon="props">
            <r-image
              width="var(--r-tabbar-item-icon-size)"
              height="var(--r-tabbar-item-icon-size)"
              :src="props.active ? icon.active : icon.inactive"
            />
          </template>
        </r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">自定义颜色 </r-divider>

      <r-tabbar v-model:value="active" active-color="#ee0a24" :fixed="false">
        <r-tabbar-item icon="home-o">标签</r-tabbar-item>
        <r-tabbar-item icon="search">标签</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签</r-tabbar-item>
      </r-tabbar>

      <r-divider content-position="left">监听切换事件 </r-divider>

      <r-tabbar v-model:value="active" @change="onChange" :fixed="false">
        <r-tabbar-item icon="home-o">标签 1</r-tabbar-item>
        <r-tabbar-item icon="search">标签 2</r-tabbar-item>
        <r-tabbar-item icon="friends-o">标签 3</r-tabbar-item>
        <r-tabbar-item icon="setting-o">标签 4</r-tabbar-item>
      </r-tabbar>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const active = ref(0);
const active2 = ref("home");
const icon = ref({
  active: "https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png",
  inactive: "https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png",
});
const onChange = (e) => {
  console.log("e", e);
};
</script>

<style></style>
