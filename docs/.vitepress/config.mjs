import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rainui",
  lastUpdated: true,
  description: "使用uniapp-vue3的ui库",
  base: "/rainui/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "组件", link: "/guide/install" },
    ],
    logo: "/logo.jpg",
    search: {
      provider: "local",
    },
    aside: true,
    outline: false,
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
          { text: "Signature-签名", link: "/form/signature" },
          { text: "Stepper-步进器", link: "/form/stepper" },
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
          { text: "Progress-进度条", link: "/display/progress" },
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
      { icon: "github", link: "https://github.com/iRainna/rainui" },
      {
        icon: {
          svg: '<svg t="1704626282666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4228"></path></svg>',
        },
        link: "https://gitee.com/uv86e/rainui",
      },
      {
        icon: {
          svg: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16" height="16" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGUlEQVQ4jX2TXYgPYRTGfzu7KN8T0bJ7haYUtcooIqFeM9m40EZqXG1t2im1Co1Lbyjc/CW1d1OyF1z4aN6dkjYbaaREbbZ8tlplafN1gVidnNW/Je/NTO85z/Oe8zznNDDlhHESAp3ARuCHRhuBQaC3KvKqHvGHIIyTucAFoAU4BdysivyrxmYA24DDwGugqyryjxLz6sD9wIOqyDf5aXDPT4N2iRlnF/tpsMtPg9sSkxzJVcxvAn35SlXkZ4yze4BnwGmNLQT6gBHj7F7JAS4rBk97blGw9H0RmAfMUYIv+pW7c8bZ1qrIzwJLwzhZ56lgJ42z04A7QLu2M6bA98BT4DiwrIyyEb0XnTobwjgZAtr8NNiv4O4yyl4ZZ0X5ReJEGWVvVY/ZCrw2XhseAB5KBROq9mpgBzBknN0JrABeAs+Ns83G2bXAY+AAsFUxP5uEYEqv8tooMAuYDjTp/xKtSM5M/U54KqT4fAs4D6wqo+x+GWVi13pxGXhRRtlVYCVwA3gUxomQe6JBr1rYr33OB3oAsXNNGWWfjLNPhASoqcCN47XhLcBuqUAIjii4VWfgGLAcWFA3C9uB68CGMsq+A0cF6+lsj4ZxclAt6gY+KFB6l/NZ7/aVUTYouYIR7OQkdgEdSnIJkEqkhXcaP6Qz0KfgDsX8c5magRPAQFXk3zQmgm3Wst/UL9P/1lkcmLRY8u7+tc7AL5BhyngPO/ubAAAAAElFTkSuQmCC" ></image></svg>`,
        },
        link: "https://ext.dcloud.net.cn/plugin?id=19701",
      },
    ],
    footer: {
      message:
        '<a href="https://github.com/iRainna/rainui?tab=MIT-1-ov-file">MIT License</a>  |  <a href="https://beian.miit.gov.cn/">蜀ICP备2024094080号</a> | <img src="./ba.png" style="height: 18px;width: 18px;display: inline-block;position: relative;top: 4px;" /><a style="margin-left:5px" href="https://beian.mps.gov.cn/#/query/webSearch">公安备案<a/>',
      copyright: "Copyright (c) 2024 iRainna",
    },
  },
});
