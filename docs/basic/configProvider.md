<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/configProvider/configProvider'
 </script>

# r-config-provider 全局配置

r-config-provider 全局配置,用于全局配置 组件，提供深色模式、主题定制等能力

## 示例

```vue
<template>
  <page-header title="Rain-ui" :leftArrow="false"></page-header>
  <view class="content" style="padding: 0px; background-color: transparent">
    <r-config-provider :themeName="themeName">
      <view style="padding: var(--r-padding-xs)">
        <view
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 24rpx;
            padding: 0 var(--r-padding-md);
            position: relative;
          "
        >
          <r-image
            src="/static/logo.jpg"
            width="120rpx"
            height="120rpx"
          ></r-image>
          <view
            style="
              display: flex;
              flex-direction: column;
              height: 120rpx;
              justify-content: space-between;
            "
          >
            <view
              style="
                font-weight: var(--r-font-bold);
                font-size: var(--r-font-size-lg);
              "
              >Rainui</view
            >
            <view
              style="
                font-size: var(--r-font-size-md);
                color: var(--r-text-color-2);
              "
              >多平台快速开发的UI框架</view
            >
          </view>
          <r-icon
            :name="themeName == 'default' ? 'icon-sun' : 'icon-moon'"
            prefix="other"
            style="position: absolute; right: 0px; top: 0px"
            @click="changeTheme(themeName == 'default' ? 'dark' : 'default')"
          ></r-icon>
        </view>
        <view
          style="
            color: var(--r-text-color);
            font-size: var(--r-font-size-sm);
            padding: var(--r-padding-md);
            padding-bottom: 0;
          "
        >
          Rain-ui是一个基于uniapp-vue3使用了lodash、dayjs、animate等工具库，实现了vantui样式风格的组件库。
          共计提供了<text
            style="
              color: var(--r-primary-color);
              font-size: var(--r-font-size-md);
            "
            >{{ getCount }}</text
          >个组件,按需引入轻量简洁。
        </view>
      </view>

      <view style="padding: 10px 0">
        <view v-for="(m, n) in list" :key="n">
          <r-divider contentPosition="left">{{ m.title }}</r-divider>
          <r-cell-group inset>
            <r-cell
              v-for="(i, index) in m.list"
              :title="i.title"
              :key="index + i.title"
              isLink
              @click="goPage(i.url)"
            ></r-cell>
          </r-cell-group>
        </view>
      </view>
    </r-config-provider>
  </view>
</template>
<script setup>
import { _ } from "@/uni_modules/r-utils/js_sdk/index.js";
import { ref, computed, watch } from "vue";

import useTheme from "@/hooks/useTheme";
const { themeName, changeTheme } = useTheme();

const list = ref([
  {
    title: "基础组件",
    list: [
      {
        title: "Button-按钮",
        url: "/pages/example/button/button",
      },
      {
        title: "Cell-单元格",
        url: "/pages/example/cell/cell",
      },
      {
        title: "Icon-图标",
        url: "/pages/example/icon/icon",
      },
      {
        title: "Image-图片",
        url: "/pages/example/image/image",
      },
      {
        title: "Layout-布局",
        url: "/pages/example/layout/layout",
      },
      {
        title: "Popup-弹出层",
        url: "/pages/example/popup/popup",
      },
      {
        title: "Space-间距",
        url: "/pages/example/space/space",
      },
      {
        title: "Toast-轻提示",
        url: "/pages/example/toast/toast",
      },
    ],
  },
  {
    title: "表单组件",
    list: [
      {
        title: "Calendar-日历",
        url: "/pages/example/calendar/calendar",
      },
      {
        title: "Cascader-级联选择",
        url: "/pages/example/cascader/cascader",
      },

      {
        title: "Checkbox-复选框",
        url: "/pages/example/checkbox/checkbox",
      },

      {
        title: "DatePicker-日期选择",
        url: "/pages/example/datePicker/datePicker",
      },
      {
        title: "Field-输入框",
        url: "/pages/example/field/field",
      },
      {
        title: "Form-表单",
        url: "/pages/example/form/form",
      },
      {
        title: "Picker-选择器",
        url: "/pages/example/picker/picker",
      },
      {
        title: "Radio-单选框",
        url: "/pages/example/radio/radio",
      },
      {
        title: "Rate-评分",
        url: "/pages/example/rate/rate",
      },
      {
        title: "Switch-开关",
        url: "/pages/example/switch/switch",
      },

      {
        title: "Uploader-上传",
        url: "/pages/example/uploader/uploader",
      },
    ],
  },
  {
    title: "反馈组件",
    list: [
      {
        title: "ActionSheet-动作面板",
        url: "/pages/example/action-sheet/action-sheet",
      },
      {
        title: "Loading-加载",
        url: "/pages/example/loading/loading",
      },
      {
        title: "Overlay-遮罩层",
        url: "/pages/example/overlay/overlay",
      },
      {
        title: "SwipeCell-滑动单元格",
        url: "/pages/example/swipe-cell/swipe-cell",
      },
      {
        title: "Dialog-弹出框",
        url: "/pages/example/dialog/dialog",
      },
    ],
  },
  {
    title: "展示组件",
    list: [
      {
        title: "Badge-徽标",
        url: "/pages/example/badge/badge",
      },
      {
        title: "Collapse-折叠面板",
        url: "/pages/example/collapse/collapse",
      },
      {
        title: "Divider-分割线",
        url: "/pages/example/divider/divider",
      },
      {
        title: "Highlight-高亮文本",
        url: "/pages/example/highlight/highlight",
      },
      {
        title: "NoticeBar-通知栏",
        url: "/pages/example/notice-bar/notice-bar",
      },
      {
        title: "Popover-气泡弹出框",
        url: "/pages/example/popover/popover",
      },
      {
        title: "Skeleton-骨架屏",
        url: "/pages/example/skeleton/skeleton",
      },
      {
        title: "Steps-步骤条",
        url: "/pages/example/steps/steps",
      },
      {
        title: "Tag-标签",
        url: "/pages/example/tag/tag",
      },
      {
        title: "TextEllipsis-文本省略",
        url: "/pages/example/text-ellipsis/text-ellipsis",
      },
    ],
  },
  {
    title: "导航组件",
    list: [
      {
        title: "ActionBar-动作栏",
        url: "/pages/example/action-bar/action-bar",
      },
      {
        title: "Grid-宫格",
        url: "/pages/example/grid/grid",
      },
      {
        title: "NavBar-导航栏",
        url: "/pages/example/nar-bar/nar-bar",
      },
      {
        title: "Pagination-分页",
        url: "/pages/example/pagination/pagination",
      },
      {
        title: "Tab-标签页",
        url: "/pages/example/tab/tab",
      },
      {
        title: "Sidebar-侧边导航",
        url: "/pages/example/sidebar/sidebar",
      },
      {
        title: "Tabbar-标签栏",
        url: "/pages/example/tabbar/tabbar",
      },
    ],
  },
]);
const goPage = (url) => {
  uni.navigateTo({
    url,
  });
};

const { reduce } = _;
const getCount = computed(() => {
  return reduce(
    list.value.map((t) => t.list.length),
    (sum, n) => sum + n,
    0
  );
});
</script>
```

## API

### Props

| 名称        | 说明             | 类型   | 默认值  | 可选值 |
| ----------- | ---------------- | ------ | ------- | ------ |
| themeName   | r-theme 主题样式 | String | default |        |
| customStyle | 自定义样式       | Object | {}      |        |

### Slots

| 名称    | 说明                                                                           |
| ------- | ------------------------------------------------------------------------------ |
| default | 默认插槽(内部的[`rainui`](https://gitee.com/uv86e/rainui)组件样式将会统一切换) |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
