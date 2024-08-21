<template>
  <r-config-provider :themeName="themeName">
    <page-header title="图标" :leftArrow="true"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left"> 基础图标 </r-divider>
      <r-grid square>
        <r-grid-item
          v-for="(m, n) in baseIcons.filter((t) => showIcons.includes(t))"
          :key="m + n"
          :icon="m.icon"
          :text="m.icon"
          @click="copy(m)"
        />
      </r-grid>

      <r-divider content-position="left">线性风格</r-divider>
      <r-grid square>
        <r-grid-item
          v-for="(m, n) in outlineIcons.filter((t) => showIcons.includes(t))"
          :key="m + n"
          :icon="m.icon"
          :text="m.icon"
          @click="copy(m)"
        />
      </r-grid>

      <r-divider content-position="left">实底风格</r-divider>
      <r-grid square>
        <r-grid-item
          v-for="(m, n) in filledIcons.filter((t) => showIcons.includes(t))"
          :key="m + n"
          :icon="m.icon"
          :text="m.icon"
          @click="copy(m)"
        />
      </r-grid>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
const themeStore = useThemeStore();
const themeName = computed(() => themeStore.theme);
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

const showLength = ref(40);
const showIcons = computed(() =>
  new Array(showLength.value)
    .fill(0)
    .map((t, index) => {
      if (Number(index) < baseIcons.value.length) {
        return baseIcons.value[index];
      } else if (
        Number(index) >= baseIcons.value.length &&
        Number(index) < baseIcons.value.length + outlineIcons.value.length
      ) {
        return outlineIcons.value[Number(index) - baseIcons.value.length];
      } else if (
        Number(index) >= baseIcons.value.length + outlineIcons.value.length &&
        Number(index) <
          baseIcons.value.length +
            outlineIcons.value.length +
            filledIcons.value.length
      ) {
        return filledIcons.value[
          Number(index) - baseIcons.value.length - outlineIcons.value.length
        ];
      }
      return 0;
    })
    .filter((t) => t)
);

onPullDownRefresh(() => {
  showLength.value = 40;
  uni.stopPullDownRefresh();
});
onReachBottom(() => {
  if (
    showLength.value <
    baseIcons.value.length +
      outlineIcons.value.length +
      filledIcons.value.length
  )
    showLength.value = showLength.value + 40;
});

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
