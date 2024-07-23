# r-popover

`r-popover` 气泡弹出框，弹出式的气泡菜单。

## 示例

```vue
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
```

## API

### Props

| 名称               | 说明                                                                                      | 类型    | 默认值     | 可选值                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| show               | 是否展示气泡弹出层                                                                        | Boolean | false      | true                                                                                                                              |
| actions            | 选项列表(具体参数见下表)                                                                  | Array   | []         |                                                                                                                                   |
| actionsDirection   | 选项列表的排列方向                                                                        | String  | `vertical` | `horizontal`                                                                                                                      |
| placement          | 弹出位置                                                                                  | String  | `bottom`   | `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end` |
| theme              | 主题风格                                                                                  | String  | `light`    | `dark`                                                                                                                            |
| duration           | 动画时长，单位(ms)                                                                        | Number  | 300        |                                                                                                                                   |
| showArrow          | 是否展示小箭头                                                                            | Boolean | true       | false                                                                                                                             |
| closeOnClickAction | 是否在点击选项后关闭                                                                      | Boolean | true       | false                                                                                                                             |
| iconPrefix         | 图标类名前缀,等同于 r-icon 组件的[prefix](https://ext.dcloud.net.cn/plugin?id=18668) 属性 | String  | `van-icon` | `iconfont`                                                                                                                        |
| zIndex             | 层级                                                                                      | Number  | 2000       |                                                                                                                                   |
| gap                | 弹出框与内容之间的距离                                                                    | String  | `8rpx`     |                                                                                                                                   |
| themeName          | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 主题名称                             | String  | `default`  |                                                                                                                                   |

### PopoverAction 数据结构

| 名称      | 说明                                                                                      | 类型    |
| --------- | ----------------------------------------------------------------------------------------- | ------- |
| text      | 选项文字                                                                                  | String  |
| icon      | 文字左侧的图标等同于 r-icon 组件的 [name](https://ext.dcloud.net.cn/plugin?id=18668) 属性 | String  |
| color     | 选项文字颜色                                                                              | String  |
| disabled  | 是否为禁用状态                                                                            | Boolean |
| className | 为对应选项添加额外的类名                                                                  | String  |

### Events

| 名称        | 说明                     | 参数         |
| ----------- | ------------------------ | ------------ |
| select      | 点击选项时触发           | action,index |
| open        | 打开菜单时触发           |              |
| close       | 关闭菜单时触发           |              |
| opened      | 打开菜单且动画结束后触发 |              |
| closed      | 关闭菜单且动画结束后触发 |              |
| update:show | 显隐状态改变时触发       | show         |

### Slots

| 名称      | 说明                        | 参数           |
| --------- | --------------------------- | -------------- |
| default   | 自定义菜单内容              |                |
| reference | 触发 Popover 显示的元素内容 |                |
| action    | 自定义选项内容              | {action,index} |

> [!IMPORTANT]
>
> 该组件未实现点击外部元素后关闭菜单，需自行在外层盒子上添加事件处理
