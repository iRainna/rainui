<!--
 * @Description: 
 * @Author: iRainna
 * @Date: 2023-08-02 11:21:59
 * @LastEditTime: 2023-09-11 17:47:51
 * @FilePath: \i-r-ui\uni_modules\iR-ui\components\popup\index.vue
-->
<template>
  <r-overlay
    class="popup"
    :show="show"
    :color="overlay ? '' : 'transparent'"
    :customClass="overlayClass"
    :customStyle="{
      ...getComponentThemeStyle,
      ...overlayStyle,
    }"
    :duration="duration"
    :zIndex="zIndex"
    :delay="show ? 0 : duration"
    :lockScroll="lockScroll"
    @click="clickOverlay"
    @closed="closed"
    @close="close"
    @opened="opened"
    @open="open"
  >
    <view
      :style="{
        ...getPosition,
        boxSizing: 'border-box',
        ...getComponentThemeStyle,
      }"
      style="display: flex; flex-direction: row; width: 100%; height: 100%"
    >
      <r-animation
        :show="show"
        :delay="show ? duration : 0"
        :entryClass="entryClass"
        :exitClass="exitClass"
        :duration="duration"
        :customStyle="{
          width: getWidth,
          height: getHeight,
          ...getRadius,
        }"
        :style="{
          width: getWidth,
          height: getHeight,
          ...getRadius,
        }"
      >
        <!-- safeBottom + 'px'  -->
        <view
          :style="{
            ...getContentPosition,
            width: getWidth,
            height: getHeight,
            background: 'var(--r-popup-background)',
            boxSizing: 'border-box',
            paddingLeft: 'var(--r-padding-xs)',
            paddingRight: 'var(--r-padding-xs)',
            paddingBottom:
              safeAreaInsetBottom && position == 'bottom'
                ? `calc(${safeBottom}px + var(--r-padding-xs))`
                : `var(--r-padding-xs)`,
            paddingTop:
              safeAreaInsetTop && position == 'top'
                ? `calc(${safeTop}px + var(--r-padding-xs))`
                : `var(--r-padding-xs)`,
            ...customStyle,
          }"
          :class="customClass"
          @click.stop="clickHandler"
        >
          <view
            v-if="closeable"
            :class="{
              'r-popup__close-icon': true,
              [`r-popup__close-icon--closeIconPosition`]: true,
            }"
            :style="{ ...getIconPosition }"
          >
            <r-icon
              @click="clickCloseIcon"
              :name="closeIcon"
              :prefix="iconPrefix"
              hoverClass="animate__fadeIn"
            ></r-icon>
          </view>
          <slot />
        </view>
      </r-animation>
    </view>
  </r-overlay>
</template>
<script setup>
import PopupProps from "./props.js";
import { getSystemInfo } from "@/uni_modules/r-utils/js_sdk/index.js";
import { CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import { computed, ref, inject, nextTick } from "vue";
const props = defineProps({ ...PopupProps });
const componentsName = "r-popup";
const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.value?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.value?.themeName;
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
  "click-overlay",
  "click-close-icon",
  "open",
  "close",
  "opened",
  "closed",
  "update:show",
]);

//进场动画
const entryClass = computed(() => {
  if (props.position == "center") {
    return "animate__fadeIn";
  }
  if (props.position == "left") {
    return "animate__slideInLeft";
  }
  if (props.position == "right") {
    return "animate__slideInRight";
  }
  if (props.position == "top") {
    return "animate__slideInDown";
  }
  if (props.position == "bottom") {
    return "animate__slideInUp";
  }
});
//退场动画
const exitClass = computed(() => {
  if (props.position == "center") {
    return "animate__fadeOut";
  }
  if (props.position == "left") {
    return "animate__slideOutLeft";
  }
  if (props.position == "right") {
    return "animate__slideOutRight";
  }
  if (props.position == "top") {
    return "animate__slideOutUp";
  }
  if (props.position == "bottom") {
    return "animate__slideOutDown";
  }
});
//设置对应的位置
const getPosition = computed(() => {
  const cssVars = {};
  if (props.position == "center") {
    cssVars.alignItems = "center";
    cssVars.justifyContent = "center";
  }
  if (props.position == "left") {
    cssVars.alignItems = "center";
    cssVars.justifyContent = "flex-start";
  }
  if (props.position == "right") {
    cssVars.alignItems = "center";
    cssVars.justifyContent = "flex-end";
  }
  if (props.position == "top") {
    cssVars.alignItems = "flex-start";
    cssVars.justifyContent = "center";
  }
  if (props.position == "bottom") {
    cssVars.alignItems = "flex-end";
    cssVars.justifyContent = "center";
  }
  return cssVars;
});
//获取圆角
const getRadius = computed(() => {
  const cssVars = {
    overflow: "hidden",
  };
  if (props.position == "center") {
    cssVars["border-radius"] = "var(--r-popup-round-radius)";
  }
  if (props.position == "left") {
    cssVars["border-top-right-radius"] = "var(--r-popup-round-radius)";
    cssVars["border-bottom-right-radius"] = "var(--r-popup-round-radius)";
  }
  if (props.position == "right") {
    cssVars["border-top-left-radius"] = "var(--r-popup-round-radius)";
    cssVars["border-bottom-left-radius"] = "var(--r-popup-round-radius)";
  }
  if (props.position == "top") {
    cssVars["border-bottom-left-radius"] = "var(--r-popup-round-radius)";
    cssVars["border-bottom-right-radius"] = "var(--r-popup-round-radius)";
  }
  if (props.position == "bottom") {
    cssVars["border-top-left-radius"] = "var(--r-popup-round-radius)";
    cssVars["border-top-right-radius"] = "var(--r-popup-round-radius)";
  }
  return cssVars;
});

// 设置对应的宽度
const getWidth = computed(() => {
  if (["left", "right", "center"].includes(props.position)) {
    return "auto";
  } else if (["top", "bottom"].includes(props.position)) {
    return "100%";
  }
});
// 设置对应的高度
const getHeight = computed(() => {
  if (["top", "bottom", "center"].includes(props.position)) {
    return "auto";
  } else if (["left", "right"].includes(props.position)) {
    return "100%";
  }
});
//获取主体内容的位置
const getContentPosition = computed(() => {
  const cssStyles = {};
  cssStyles.display = "flex";
  cssStyles.width = getWidth.value;
  cssStyles.height = getHeight.value;

  if (["top", "bottom", "center"].includes(props.position)) {
    if (["top-left", "top-right"].includes(props.closeIconPosition)) {
      cssStyles.flexDirection = "column";
    }
    if (["bottom-left", "bottom-right"].includes(props.closeIconPosition)) {
      cssStyles.flexDirection = "column-reverse";
    }
  }
  if (["left", "right"].includes(props.position)) {
    if (["top-left", "bottom-left"].includes(props.closeIconPosition)) {
      cssStyles.flexDirection = "row";
    }
    if (["bottom-right", "top-right"].includes(props.closeIconPosition)) {
      cssStyles.flexDirection = "row-reverse";
    }
  }

  return cssStyles;
});
//获取icon位置
const getIconPosition = computed(() => {
  const cssStyles = {};
  cssStyles.display = "flex";
  cssStyles.width = getWidth.value;
  cssStyles.height = getHeight.value;

  if (["top-left"].includes(props.closeIconPosition)) {
    cssStyles.justifyContent = "flex-start";
  }

  if (["top", "bottom", "center"].includes(props.position)) {
    if (["top-right", "bottom-right"].includes(props.closeIconPosition)) {
      cssStyles.justifyContent = "flex-end";
    }

    if (["top-left", "bottom-left"].includes(props.closeIconPosition)) {
      cssStyles.justifyContent = "flex-start";
    }
  }
  if (["left", "right"].includes(props.position)) {
    if (["top-left", "top-right"].includes(props.closeIconPosition)) {
      cssStyles.justifyContent = "flex-start";
    }
    if (["bottom-right", "bottom-left"].includes(props.closeIconPosition)) {
      cssStyles.justifyContent = "flex-end";
    }
  }
  return cssStyles;
});

// 关闭弹出层且动画结束后触发
const closed = () => {
  emit("closed");
};
// 关闭弹出层时立即触发
const close = () => {
  emit("close");
};
// 打开弹出层时立即触发
const open = () => {
  emit("open");
};
// 打开弹出层且动画结束后触发
const opened = () => {
  emit("opened");
};
// 点击弹出层
const clickHandler = (e) => {
  emit("click", e);
};
//点击遮罩层
const clickOverlay = (e) => {
  if (props.closeOnClickOverlay) {
    emit("update:show", false);
    nextTick(() => {
      emit("click-overlay", false);
    });
  } else {
    emit("click-overlay", e);
  }
};
//点击关闭icon
const clickCloseIcon = (e) => {
  emit("click-close-icon", e);
};
//安全顶部距离
const safeTop = ref(0);
//安全底部距离
const safeBottom = ref(0);
if (props.safeAreaInsetTop || props.safeAreaInsetBottom) {
  const data = getSystemInfo();
  safeTop.value = data?.statusBarHeight;
  safeBottom.value = data?.safeAreaInsets?.bottom;
}
</script>
