<template>
  <r-config-provider>
    <view style="padding: 20rpx" @click="hide">
      <r-divider content-position="left">基本使用</r-divider>
      <r-popover
        v-model:show="showPopover"
        placement="bottom-start"
        :actions="actions"
      >
        <template #reference>
          <r-button type="primary">浅色风格</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">深色风格</r-divider>

      <r-popover
        v-model:show="showPopover2"
        placement="bottom-start"
        theme="dark"
        :actions="actions"
      >
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
        <r-cell title="弹出位置" is-link @click="popupShow = true"></r-cell>
      </r-cell-group>
      <r-divider content-position="left">展示图标</r-divider>
      <r-popover
        v-model:show="showPopover4"
        placement="bottom-start"
        :actions="actions2"
      >
        <template #reference>
          <r-button type="primary">展示图标</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">禁用选项</r-divider>

      <r-popover
        v-model:show="showPopover5"
        placement="bottom-start"
        :actions="actions3"
      >
        <template #reference>
          <r-button type="primary">禁用选项</r-button>
        </template>
      </r-popover>

      <r-divider content-position="left">自定义内容</r-divider>
      <r-popover placement="top-start" v-model:show="showPopover6">
        <r-image
          src="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
          width="200px"
          height="200px"
          mode="scaleToFill"
        ></r-image>
        <template #reference>
          <r-button type="primary">自定义内容</r-button>
        </template>
      </r-popover>
    </view>

    <r-popup v-model:show="popupShow" round position="center">
      <view
        style="
          height: calc(100vh - var(--r-padding-xs) - var(--r-padding-xs));
          width: calc(100vw - var(--r-padding-xs) - var(--r-padding-xs));
          background-color: #fff;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
        "
      >
        <view style="position: absolute; right: 10px; top: 10px">
          <r-icon name="cross" @click="popupShow = false"></r-icon>
        </view>

        <r-popover
          v-model:show="showPopover7"
          theme="dark"
          :actions="actions4"
          @select="onSelect"
          :placement="position"
        >
          <template #reference>
            <r-button type="primary">弹出位置</r-button>
          </template>
        </r-popover>
      </view>
    </r-popup>
  </r-config-provider>
</template>

<script setup>
import { ref, computed } from "vue";
const position = ref("bottom");
const chooseValue = ref("bottom");
const popupShow = ref(false);
const showPopover = ref(false);
const showPopover2 = ref(false);
const showPopover3 = ref(false);
const showPopover4 = ref(false);
const showPopover5 = ref(false);
const showPopover6 = ref(false);
const showPopover7 = ref(false);
const hide = () => {
  showPopover.value = false;
  showPopover2.value = false;
  showPopover3.value = false;
  showPopover4.value = false;
  showPopover5.value = false;
  showPopover6.value = false;
  showPopover7.value = false;
};
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
const actions4 = computed(() => {
  let base = [
    {
      text: "top-start",
      value: "top",
    },
    {
      text: "top",
      value: "top",
    },
    {
      text: "top-end",
      value: "top",
    },

    {
      text: "bottom-start",
      value: "bottom",
    },
    {
      text: "bottom",
      value: "bottom",
    },
    {
      text: "bottom-end",
      value: "bottom",
    },
    {
      text: "left-start",
      value: "left",
    },
    {
      text: "left",
      value: "left",
    },
    {
      text: "left-end",
      value: "left",
    },
    {
      text: "right-start",
      value: "right",
    },
    {
      text: "right",
      value: "right",
    },
    {
      text: "right-end",
      value: "right",
    },
  ];

  return base.filter((t) => t.text == t.value || t.value == chooseValue.value);
});

const onSelect = (action) => {
  position.value = action.text;
  chooseValue.value = action.value;
  console.log(action.text);
};
</script>

<style></style>
