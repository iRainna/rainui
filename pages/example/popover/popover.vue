<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基本使用</r-divider>
      <r-popover
        v-model:show="showPopover"
        :actions="actions"
        @select="onSelect"
      >
        <template #reference>
          <r-button type="primary">浅色风格</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">深色风格</r-divider>

      <r-popover v-model:show="showPopover2" theme="dark" :actions="actions">
        <template #reference>
          <r-button type="primary">深色风格</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">水平排列</r-divider>
      <r-popover
        v-model:show="showPopover3"
        :actions="actions"
        actions-direction="horizontal"
        placement="bottom-start"
      >
        <template #reference>
          <r-button type="primary">水平排列</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">弹出位置</r-divider>
      <r-cell-group inset>
        <r-cell title="弹出位置" is-link></r-cell>
      </r-cell-group>
      <r-divider content-position="left">展示图标</r-divider>
      <r-popover v-model:show="showPopover4" :actions="actions2">
        <template #reference>
          <r-button type="primary">展示图标</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">禁用选项</r-divider>

      <r-popover v-model:show="showPopover5" :actions="actions3">
        <template #reference>
          <r-button type="primary">禁用选项</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">自定义内容</r-divider>
      <r-popover placement="top-start" v-model:show="showPopover6">
        <r-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
          width="200px"
          mode="widthFix"
        ></r-image>
        <template #reference>
          <r-button type="primary">自定义内容</r-button>
        </template>
      </r-popover>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const showPopover = ref(false);
const showPopover2 = ref(false);
const showPopover3 = ref(false);
const showPopover4 = ref(false);
const showPopover5 = ref(false);
const showPopover6 = ref(false);

// 通过 actions 属性来定义菜单选项
const actions = ref([
  { text: "选项一" },
  { text: "选项二" },
  { text: "选项三" },
]);

const actions2 = ref([
  { text: "选项一", icon: "add-o" },
  { text: "选项二", icon: "music-o" },
  { text: "选项三", icon: "more-o" },
]);
const actions3 = ref([
  { text: "选项一", disabled: true },
  { text: "选项二", disabled: true },
  { text: "选项三" },
]);
const onSelect = (action) => {
  console.log(action.text);
};
</script>

<style></style>
