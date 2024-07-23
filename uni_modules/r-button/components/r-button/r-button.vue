<!--
 * @Description: 
 * @Author: iRainna
 * @Date: 2023-07-25 15:27:34
 * @LastEditTime: 2023-08-28 10:01:37
 * @FilePath: \i-r-ui\uni_modules\iR-ui\components\button\index.vue
-->
<template>
  <button
    :class="{
      'r-button': true,
      [`r-button--${type}`]: true,
      [`r-button--${size}`]: true,
      'r-button--plain': plain,
      'r-button--disabled': disabled,
      'r-button--round': round,
      'r-button--square': square,
      'r-button--block': block,
      [`${customClass}`]: true,
    }"
    :style="{ ...getComponentThemeStyle, ...customStyle, ...getStyle }"
    @click="clickHandler"
    :form-type="formType"
    :open-type="openType"
    :hover-class="hoverClass || ''"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :lang="lang"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :group-id="groupId"
    :guild-id="guildId"
    :public-id="publicId"
    :data-im-id="dataImId"
    :data-im-type="dataImType"
    :data-goods-id="dataGoodsId"
    :data-order-id="dataOrderId"
    :data-biz-line="dataBizLine"
    @getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    @contact="contact"
    @chooseavatar="chooseavatar"
    @addgroupapp="addgroupapp"
    @chooseaddress="chooseaddress"
    @chooseinvoicetitle="chooseinvoicetitle"
    @subscribe="subscribe"
    @login="login"
    @im="im"
  >
    <view class="r-button__content">
      <view
        v-if="iconPosition == 'left'"
        :class="{
          'r-button__loading': loading && !$slots.loading,
          'r-button__icon': icon || $slots.icon,
        }"
        style="display: flex"
      >
        <view v-if="loading">
          <slot v-if="$slots.loading" name="loading" />
          <r-loading
            v-else
            :size="loadingSize"
            :type="loadingType"
            class="r-button__loading"
          ></r-loading>
        </view>
        <view class="r-button__icon" v-if="$slots.icon">
          <slot name="icon" />
        </view>
        <view v-else>
          <r-icon
            :name="icon"
            class="r-button__icon"
            :prefix="iconPrefix"
            :color="'inherit'"
          ></r-icon>
        </view>
      </view>
      <view class="r-button__text" v-if="$slots.default || text || loadingText">
        <view v-if="loading">{{ loadingText }}</view>
        <view v-else>
          <slot v-if="$slots.default"></slot>
          <view v-else>{{ text }}</view>
        </view>
      </view>
      <view
        v-if="iconPosition == 'right'"
        :class="{
          'r-button__loading': loading && !$slots.loading,
          'r-button__icon': icon || $slots.icon,
        }"
        style="display: flex"
      >
        <view v-if="loading">
          <slot v-if="$slots.loading" name="loading" />
          <r-loading
            v-else
            :size="loadingSize"
            type="loadingType"
            class="r-button__loading"
          ></r-loading>
        </view>
        <view class="r-button__icon" v-if="$slots.icon">
          <slot name="icon" />
        </view>
        <view v-else>
          <r-icon
            :name="icon"
            class="r-button__icon"
            :prefix="iconPrefix"
          ></r-icon>
        </view>
      </view>
    </view>
  </button>
</template>

<script setup>
import ButtonProps from "./props.js";
import { computed, inject } from "vue";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";

const props = defineProps({
  ...ButtonProps,
});

const componentsName = "r-button";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.themeName;
  }
  if (props.themeName != "default") {
    //单独设置了组件的 就用单独设置的
    themeName = props.themeName;
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});
const emit = defineEmits([
  "click",
  "getphonenumber",
  "getuserinfo",
  "error",
  "opensetting",
  "launchapp",
  "contact",
  "addgroupapp",
  "chooseavatar",
  "chooseaddress",
  "chooseinvoicetitle",
  "subscribe",
  "login",
  "im",
]);
// 监听跳转IM的成功回调	open-type="im"	抖音小程序2.68.0版本+
const im = (e) => {
  emit("im", e);
};
// 登录回调	open-type="login"	百度小程序
const login = (e) => {
  emit("login", e);
};
// 阅消息授权回调	open-type="subscribe"	百度小程序
const subscribe = (e) => {
  emit("subscribe", e);
};
// 用户选择发票抬头的回调	open-type="chooseInvoiceTitle"	百度小程序
const chooseinvoicetitle = (e) => {
  emit("chooseinvoicetitle", e);
};
// 调起用户编辑并选择收货地址的回调	open-type="chooseAddress"	百度小程序
const chooseaddress = (e) => {
  emit("chooseaddress", e);
};
// 添加群应用的回调	open-type="addGroupApp"	QQ小程序
const addgroupapp = (e) => {
  emit("addgroupapp", e);
};
// 获取用户头像回调	open-type="chooseAvatar"	微信小程序
const chooseavatar = (e) => {
  emit("chooseavatar", e);
};
// 客服消息回调	open-type="contact"	微信、QQ、百度、快手小程序
const contact = (e) => {
  emit("contact", e);
};
// 从小程序打开 App 成功的回调	open-type="launchApp"	微信、QQ、快手、京东小程序
const launchapp = (e) => {
  emit("launchapp", e);
};
// 在打开授权设置页并关闭后回调	open-type="openSetting"	微信、QQ、百度、快手、京东小程序
const opensetting = (e) => {
  emit("opensetting", e);
};
// 当使用开放能力时，发生错误的回调	open-type="launchApp"	微信、QQ、快手、京东小程序
const error = (e) => {
  emit("error", e);
};
// 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo    open-type="getUserInfo"	  微信、QQ、百度、快手、京东小程序
const getuserinfo = (e) => {
  emit("getuserinfo", e);
};
// 获取用户手机号回调 open-type="getPhoneNumber"  微信、支付宝、百度、抖音、快手、京东小程序
const getphonenumber = (e) => {
  emit("getphonenumber", e);
};
//点击事件
const clickHandler = (e) => {
  // 非禁止并且非加载中，才能点击
  if (!props.disabled && !props.loading) {
    emit("click", e);
  }
};
const getStyle = computed(() => {
  const { color, plain } = props;
  if (color) {
    const style = {
      color: plain ? color : "white",
    };

    if (!plain) {
      // Use background instead of backgroundColor to make linear-gradient work
      style.background = color;
    }

    // hide border when color is linear-gradient
    if (color.includes("gradient")) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }

    return style;
  }
  return {};
});
</script>

<style lang="scss" scoped>
.r-button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: var(--r-button-default-height);
  margin: 0;
  padding: 0;
  font-size: var(--r-button-default-font-size);
  line-height: var(--r-button-default-line-height);
  text-align: center;
  border-radius: var(--r-button-radius);
  cursor: pointer;
  transition: opacity var(--r-duration-fast);
  -webkit-appearance: none;
  -webkit-font-smoothing: auto;
  background-color: transparent;
  overflow: initial;

  &::after {
    border: none;
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: var(--r-black);
    border: inherit;
    border-color: var(--r-black);
    border-radius: inherit;
    /* inherit parent's border radius */
    transform: translate(-50%, -50%);
    opacity: 0;
    content: " ";
  }

  &:active::before {
    opacity: 0.1;
  }

  &--loading,
  &--disabled {
    &::before {
      display: none;
    }
  }

  &--default {
    color: var(--r-button-default-color);
    background: var(--r-button-default-background);
    border: var(--r-button-border-width) solid
      var(--r-button-default-border-color);
  }

  &--primary {
    color: var(--r-button-primary-color);
    background: var(--r-button-primary-background);
    border: var(--r-button-border-width) solid
      var(--r-button-primary-border-color);
  }

  &--success {
    color: var(--r-button-success-color);
    background: var(--r-button-success-background);
    border: var(--r-button-border-width) solid
      var(--r-button-success-border-color);
  }

  &--danger {
    color: var(--r-button-danger-color);
    background: var(--r-button-danger-background);
    border: var(--r-button-border-width) solid
      var(--r-button-danger-border-color);
  }

  &--warning {
    color: var(--r-button-warning-color);
    background: var(--r-button-warning-background);
    border: var(--r-button-border-width) solid
      var(--r-button-warning-border-color);
  }

  &--plain {
    background: var(--r-button-plain-background);

    &.r-button--primary {
      color: var(--r-button-primary-background);
    }

    &.r-button--success {
      color: var(--r-button-success-background);
    }

    &.r-button--danger {
      color: var(--r-button-danger-background);
    }

    &.r-button--warning {
      color: var(--r-button-warning-background);
    }
  }

  &--large {
    width: 100%;
    height: var(--r-button-large-height);
  }

  &--normal {
    padding: var(--r-button-normal-padding);
    font-size: var(--r-button-normal-font-size);
  }

  &--small {
    height: var(--r-button-small-height);
    padding: var(--r-button-small-padding);
    font-size: var(--r-button-small-font-size);
  }

  &__loading {
    color: inherit;
    font-size: inherit;

    .r-loading__spinner {
      color: currentColor;
      width: var(--r-button-loading-icon-size);
      height: var(--r-button-loading-icon-size);
    }
  }

  &--mini {
    height: var(--r-button-mini-height);
    padding: var(--r-button-mini-padding);
    font-size: var(--r-button-mini-font-size);

    & + .r-button--mini {
      margin-left: var(--r-padding-base);
    }
  }

  &--block {
    display: block;
    width: 100%;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--r-button-disabled-opacity);
  }

  &--loading {
    cursor: default;
  }

  &--round {
    border-radius: var(--r-button-round-radius);
  }

  &--square {
    border-radius: 0;
  }

  /* // align-items are ignored when flex container is a button in legacy safari
  // see: https://bugs.webkit.org/show_bug.cgi?id=169700 */
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    /* // fix icon vertical align */
    /* // see: https://github.com/vant-ui/vant/issues/7617 */
    &::before {
      content: " ";
    }
  }

  &__icon {
    font-size: var(--r-button-icon-size);
    line-height: inherit;
  }

  &__icon + &__text,
  &__loading + &__text,
  &__text + &__icon,
  &__text + &__loading {
    margin-left: var(--r-padding-base);
  }

  &--hairline {
    border-width: 0;

    &::after {
      border-color: inherit;
      border-radius: calc(var(--r-button-radius) * 2);
    }

    &.r-button--round::after {
      border-radius: var(--r-button-round-radius);
    }

    &.r-button--square::after {
      border-radius: 0;
    }
  }
}
</style>
