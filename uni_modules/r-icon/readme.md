# r-icon

`r-icon` 是一个使用 `iconfont` 的一个的字体图标组件，内置`vantui`图标库可直接使用，引用`iconfont`一些图标（可替换为自己的图标库，下载自己的图标文件后，将 iconfont 文件夹内容替换即可），方便简洁的使用`iconfont`图标。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <r-divider content-position="left" @click="baseShow = !baseShow">
        基础图标--<text style="color: var(--r-primary-color)">{{
          baseShow ? "关闭" : "打开"
        }}</text>
      </r-divider>
      <r-animation :show="baseShow" :duration="300" style="width: 100%">
        <r-grid square>
          <r-grid-item
            v-for="(m, n) in baseIcons"
            :key="m + n"
            :icon="m.icon"
            :text="m.icon"
            @click="copy(m)"
          />
        </r-grid>
      </r-animation>

      <r-divider content-position="left" @click="outlineShow = !outlineShow"
        >线性风格--<text style="color: var(--r-primary-color)">{{
          outlineShow ? "关闭" : "打开"
        }}</text></r-divider
      >
      <r-animation :show="outlineShow" :duration="300" style="width: 100%">
        <r-grid square>
          <r-grid-item
            v-for="(m, n) in outlineIcons"
            :key="m + n"
            :icon="m.icon"
            :text="m.icon"
            @click="copy(m)"
          />
        </r-grid>
      </r-animation>

      <r-divider content-position="left" @click="filledShow = !filledShow"
        >实底风格--<text style="color: var(--r-primary-color)">{{
          filledShow ? "关闭" : "打开"
        }}</text></r-divider
      >
      <r-animation :show="filledShow" :duration="300" style="width: 100%">
        <r-grid square>
          <r-grid-item
            v-for="(m, n) in filledIcons"
            :key="m + n"
            :icon="m.icon"
            :text="m.icon"
            @click="copy(m)"
          />
        </r-grid>
      </r-animation>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
const baseShow = ref(true);
const outlineShow = ref(true);
const filledShow = ref(true);
const baseIcons = ref(
  [
    "arrow",
    "arrow-left",
    "arrow-up",
    "arrow-down",
    "arrow-double-left",
    "arrow-double-right",
    "success",
    "cross",
    "plus",
    "minus",
    "fail",
    "circle",
  ].map((t) => ({
    icon: t,
  }))
);

const outlineIcons = ref(
  [
    // has corresponding filled icon
    "location-o",
    "like-o",
    "star-o",
    "phone-o",
    "setting-o",
    "fire-o",
    "coupon-o",
    "cart-o",
    "shopping-cart-o",
    "cart-circle-o",
    "friends-o",
    "comment-o",
    "gem-o",
    "gift-o",
    "point-gift-o",
    "send-gift-o",
    "service-o",
    "bag-o",
    "todo-list-o",
    "balance-list-o",
    "close",
    "clock-o",
    "question-o",
    "passed",
    "add-o",
    "gold-coin-o",
    "info-o",
    "play-circle-o",
    "pause-circle-o",
    "stop-circle-o",
    "warning-o",
    "phone-circle-o",
    "music-o",
    "smile-o",
    "thumb-circle-o",
    "comment-circle-o",
    "browsing-history-o",
    "underway-o",
    "more-o",
    "video-o",
    "shop-o",
    "shop-collect-o",
    "share-o",
    "chat-o",
    "smile-comment-o",
    "vip-card-o",
    "award-o",
    "diamond-o",
    "volume-o",
    "cluster-o",
    "wap-home-o",
    "photo-o",
    "gift-card-o",
    "expand-o",
    "medal-o",
    "good-job-o",
    "manager-o",
    "label-o",
    "bookmark-o",
    "bill-o",
    "hot-o",
    "hot-sale-o",
    "new-o",
    "new-arrival-o",
    "goods-collect-o",
    "eye-o",
    "delete-o",
    "font-o",
    "contact-o",
    "notes-o",
    "records-o",
    "cash-back-record-o",
    "newspaper-o",
    "discount-o",
    "completed-o",
    "user-o",
    "description-o",
    // without corresponding filled icon
    "balance-o",
    "refund-o",
    "birthday-cake-o",
    "orders-o",
    "tv-o",
    "envelop-o",
    "flag-o",
    "flower-o",
    "filter-o",
    "bar-chart-o",
    "chart-trending-o",
    "brush-o",
    "bullhorn-o",
    "hotel-o",
    "cashier-o",
    "warn-o",
    "calendar-o",
    "bulb-o",
    "user-circle-o",
    "desktop-o",
    "apps-o",
    "home-o",
    "back-top",
    "search",
    "points",
    "edit",
    "qr",
    "qr-invalid",
    "closed-eye",
    "down",
    "scan",
    "revoke",
    "free-postage",
    "certificate",
    "logistics",
    "after-sale",
    "exchange",
    "upgrade",
    "ellipsis",
    "sign",
    "failure",
    "ecard-pay",
    "peer-pay",
    "balance-pay",
    "credit-pay",
    "debit-pay",
    "cash-on-deliver",
    "other-pay",
    "tosend",
    "pending-payment",
    "paid",
    "aim",
    "idcard",
    "replay",
    "shrink",
    "shield-o",
    "guide-o",
    "cash-o",
    "link-o",
    "miniprogram-o",
    "list-switch",
    "list-switching",
  ].map((t) => ({
    icon: t,
  }))
);

const filledIcons = ref(
  [
    // has corresponding outline icon
    "location",
    "like",
    "star",
    "phone",
    "setting",
    "fire",
    "coupon",
    "cart",
    "shopping-cart",
    "cart-circle",
    "friends",
    "comment",
    "gem",
    "gift",
    "point-gift",
    "send-gift",
    "service",
    "bag",
    "todo-list",
    "balance-list",
    "clear",
    "clock",
    "question",
    "checked",
    "add",
    "gold-coin",
    "info",
    "play-circle",
    "pause-circle",
    "stop-circle",
    "warning",
    "phone-circle",
    "music",
    "smile",
    "thumb-circle",
    "comment-circle",
    "browsing-history",
    "underway",
    "more",
    "video",
    "shop",
    "shop-collect",
    "share",
    "chat",
    "smile-comment",
    "vip-card",
    "award",
    "diamond",
    "volume",
    "cluster",
    "wap-home",
    "photo",
    "gift-card",
    "expand",
    "medal",
    "good-job",
    "manager",
    "label",
    "bookmark",
    "bill",
    "hot",
    "hot-sale",
    "new",
    "new-arrival",
    "goods-collect",
    "eye",
    "delete",
    "font",
    "contact",
    "notes",
    "records",
    "cash-back-record",
    "newspaper",
    "discount",
    "completed",
    "user",
    "description",
    // without corresponding outline icon
    "wechat",
    "wechat-pay",
    "wechat-moments",
    "qq",
    "alipay",
    "weibo",
    "photograph",
    "youzan-shield",
    "umbrella-circle",
    "bell",
    "printer",
    "map-marked",
    "card",
    "add-square",
    "live",
    "lock",
    "audio",
    "graphic",
    "column",
    "invitation",
    "play",
    "pause",
    "stop",
    "weapp-nav",
    "ascending",
    "descending",
    "bars",
    "wap-nav",
    "enlarge",
    "photo-fail",
    "sort",
  ].map((t) => ({ icon: t }))
);

const copy = (m) => {
  uni.setClipboardData({
    data: `<r-icon name="${m.icon}" />`, //要被复制的内容
    success: () => {
      uni.showToast({
        title: `复制成功`,
      });
    },
  });
};
</script>
```

## API

### Props

| 参数        | 说明                     | 类型   | 默认值   | 可选值                                                                                                     |
| ----------- | ------------------------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| name        | icon 名称                | String | ''       | chat-o \| cart-o 等 更多可移步到 https://vant-ui.github.io/vant/#/zh-CN/icon                               |
| size        | 大小                     | String | 48rpx    | -                                                                                                          |
| color       | 颜色                     | String | ''       | - //不设置时，为 r-theme 的默认主题的 r-text-color 颜色（#323233）                                         |
| customStyle | 自定义样式               | Object | {}       | -                                                                                                          |
| customClass | 自定义类名               | String | ''       | -                                                                                                          |
| prefix      | 前缀类名                 | String | van-icon | iconfont (使用自己的 iconfont 图标库【可替换为自己 iconfont】，内置一些图标可以在 iconfont.css 文件内查看) |
| hoverClass  | 指定按下去的样式类       | String | ''       | - //可使用官方原生的样式或者 animate.css 样式                                                              |
| themeName   | r-theme 主题名称         | String | default  | -                                                                                                          |
| duration    | 按下去的动画持续时间(ms) | Number | 1000     | -                                                                                                          |
| dalay       | 动画效果的延迟时间（ms） | Number | 0        | -                                                                                                          |

### Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击的回调 | e        |
