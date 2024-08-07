import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rainui",
  description: "使用uniapp-vue3的ui库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "组件", link: "/guide/install" },
    ],
    logo: "/logo.jpg",

    sidebar: [
      {
        text: "开发指南",
        collapsed: false,
        items: [
          { text: "快速上手", link: "/guide/install" },
          { text: "示例项目", link: "/guide/example" },
        ],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [
          { text: "Button-按钮", link: "/basic/button" },
          { text: "Cell-单元格", link: "/basic/cell" },
          { text: "ConfigProvider-全局配置", link: "/basic/configProvider" },
          { text: "Icon-图标", link: "/basic/icon" },
          { text: "Image-图片", link: "/basic/image" },
          { text: "Layout-布局", link: "/basic/layout" },
          { text: "Popup-弹出层", link: "/basic/popup" },
          { text: "Space-间距", link: "/basic/space" },
          { text: "Toast-轻提示", link: "/basic/toast" },
        ],
      },

      {
        text: "表单组件",
        collapsed: false,
        items: [
          { text: "Calendar-日历", link: "/form/calendar" },
          { text: "Cascader-级联选择", link: "/form/cascader" },
          { text: "Checkbox-复选框", link: "/form/checkbox" },
          { text: "DatePicker-日期选择", link: "/form/datePicker" },
          { text: "Field-输入框", link: "/form/field" },
          { text: "Form-表单", link: "/form/form" },
          { text: "Picker-选择器", link: "/form/picker" },
          { text: "Radio-单选框", link: "/form/radio" },
          { text: "Rate-评分", link: "/form/rate" },
          { text: "Switch-开关", link: "/form/switch" },
          { text: "Uploader-上传", link: "/form/uploader" },
        ],
      },
      {
        text: "反馈组件",
        collapsed: false,
        items: [
          { text: "ActionSheet-动作面板", link: "/action/action-sheet" },
          { text: "Loading-加载", link: "/action/loading" },
          { text: "Overlay-遮罩层", link: "/action/overlay" },
          { text: "SwipeCell-滑动单元格", link: "/action/swipe-cell" },
          { text: "Dialog-弹出框", link: "/action/dialog" },
        ],
      },

      {
        text: "展示组件",
        collapsed: false,
        items: [
          { text: "Badge-徽标", link: "/display/badge" },
          { text: "Collapse-折叠面板", link: "/display/collapse" },
          { text: "Divider-分割线", link: "/display/divider" },
          { text: "Highlight-高亮文本", link: "/display/highlight" },
          { text: "NoticeBar-通知栏", link: "/display/notice-bar" },
          { text: "Popover-气泡弹出框", link: "/display/popover" },
          { text: "Skeleton-骨架屏", link: "/display/skeleton" },
          { text: "Steps-步骤条", link: "/display/steps" },
          { text: "Tag-标签", link: "/display/tag" },
          { text: "TextEllipsis-文本省略", link: "/display/text-ellipsis" },
        ],
      },

      {
        text: "导航组件",
        collapsed: false,
        items: [
          { text: "ActionBar-动作栏", link: "/navigation/action-bar" },
          { text: "Grid-宫格", link: "/navigation/grid" },
          { text: "NavBar-导航栏", link: "/navigation/nar-bar" },
          { text: "Pagination-分页", link: "/navigation/pagination" },
          { text: "Tab-标签页", link: "/navigation/tab" },
          { text: "Sidebar-侧边导航", link: "/navigation/sidebar" },
          { text: "Tabbar-标签栏", link: "/navigation/tabbar" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
