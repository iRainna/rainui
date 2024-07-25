<template>
  <view
    :class="{
      'van-grid-item': true,
      'van-grid-item--square': parentProps.square,
    }"
    :style="{
      ...getComponentThemeStyle,
      ...rootStyle,
    }"
  >
    <view
      :class="{
        'van-grid-item__content': true,
        'r-hairline': true,
        [`van-grid-item__content--${parentProps.direction}`]: true,
        'van-grid-item__content--center': parentProps.center,
        'van-grid-item__content--square': parentProps.square,
      }"
      :style="contentStyle"
    ></view>
    r-grid-item
  </view>
</template>
<script setup>
import { computed, ref, inject, onMounted } from "vue";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  _,
  CONFIG_PROVIDER_KEY,
  GRID_KEY,
  isNumeric,
} from "@/uni_modules/r-utils/js_sdk/index.js";

const { uniqueId, findIndex } = _;
const props = defineProps({
  // 文字
  text: {
    type: String,
    default: "",
  },
  //   图标名称
  icon: {
    type: String,
    default: "",
  },
  //   图标类名前缀
  iconPrefix: {
    type: String,
    default: "van-icon",
  },
  //   图标颜色
  iconColor: {
    type: String,
    default: "",
  },
  //   是否显示图标右上角小红点
  dot: {
    type: Boolean,
    default: false,
  },
  //   图标右上角徽标的内容
  badge: {
    type: [Number, String],
    default: "",
  },

  //   徽标背景颜色
  badgeColor: {
    type: [String],
    default: "#ee0a24",
  },
  //   最大值，超过最大值会显示 {max}+，仅当 content 为数字时有效
  max: {
    type: [String, Number],
  },
  //   设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量，默认单位为 px
  offset: {
    type: Array,
  },
  //   当 content 为数字 0 或字符串 '0' 时，是否展示徽标
  showZero: {
    type: Boolean,
    default: true,
  },
  //   徽标位置，可选值为 top-left bottom-left bottom-right
  position: {
    type: [String],
    default: "top-right",
  },
  //主题名称
  themeName: {
    type: [String],
    default: "default",
  },
});
const componentsId = ref("");
const componentsName = "r-grid-item";

const parentInject = inject(GRID_KEY, {});
const parentProps = computed(() => {
  return parentInject && parentInject.props
    ? parentInject.props
    : {
        value: {},
      };
});
const index = computed(() => {
  let list = [];
  if (parentInject?.children?.value?.length) {
    list = parentInject?.children?.value;
  }
  return findIndex(list, (t) => t.id == componentsId.value);
});

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

const rootStyle = computed(() => {
  const cssVar = {
    boxSizing: "border-box",
  };
  const parentWidth = parentInject?.gridRect?.value?.width || 0;

  const { square, gutter, columnNum } = parentProps.value;

  cssVar.flexBasis = parentWidth / columnNum + "px";
  if (square) {
    cssVar.paddingTop = parentWidth / columnNum + "px";
  } else if (gutter) {
    const gutterValue = isNumeric(gutter) ? gutter + "px" : gutter;
    cssVar.paddingRight = gutterValue;
    if (index.value >= +columnNum) {
      style.marginTop = gutterValue;
    }
  }
  return cssVar;
});

const contentStyle = computed(() => {
  const cssVar = {};
  const { border, gutter } = parentProps.value;
  if (border) {
    cssVar["border-width"] = `0 var(--r-border-width) var(--r-border-width) 0`;
  }
  if (border && gutter) {
    cssVar["border-width"] = `var(--van-border-width)`;
  }

  return cssVar;
});

onMounted(async () => {
  console.log("parentInject", parentInject);

  componentsId.value = uniqueId(componentsName + "-");
  parentInject.setChildren({
    id: componentsId.value,
  });
});
</script>
<style lang="scss" scoped>
.van-grid-item {
  position: relative;
  box-sizing: border-box;

  &--square {
    height: 0;
  }

  &__icon {
    font-size: var(--van-grid-item-icon-size);
  }

  &__text {
    color: var(--van-grid-item-text-color);
    font-size: var(--van-grid-item-text-font-size);
    line-height: 1.5;
    // https://github.com/vant-ui/vant/issues/3894
    word-break: break-all;
  }

  &__icon + &__text {
    margin-top: var(--van-padding-xs);
  }

  &__content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: var(--van-grid-item-content-padding);
    background: var(--van-grid-item-content-background);

    &::after {
      z-index: 1;
      border-width: 0 var(--van-border-width) var(--van-border-width) 0;
    }

    &--square {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }

    &--center {
      align-items: center;
      justify-content: center;
    }

    &--horizontal {
      flex-direction: row;

      .van-grid-item__text {
        margin: 0 0 0 var(--van-padding-xs);
      }
    }

    &--reverse {
      flex-direction: column-reverse;

      .van-grid-item__text {
        margin: 0 0 var(--van-padding-xs);
      }
    }

    &--horizontal &--reverse {
      flex-direction: row-reverse;

      .van-grid-item__text {
        margin: 0 var(--van-padding-xs) 0 0;
      }
    }

    &--surround {
      &::after {
        border-width: var(--van-border-width);
      }
    }

    &--clickable {
      cursor: pointer;

      &:active {
        background-color: var(--van-grid-item-content-active-color);
      }
    }
  }
}

.r-hairline {
  border: 0 solid var(--r-border-color);
}
</style>
