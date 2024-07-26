<template>
  <view
    :class="{
      'r-grid-item': true,
      'r-grid-item--square': parentProps.square,
    }"
    :style="{
      ...getComponentThemeStyle,
      ...rootStyle,
    }"
    :hover-class="
      parentProps.clickable ? 'r-grid-item__content--clickable' : 'none'
    "
    @click="onClick"
  >
    <view
      :class="{
        'r-grid-item__content': true,
        'r-hairline': true,
        [`r-grid-item__content--${parentProps.direction}`]: true,
        'r-grid-item__content--center': parentProps.center,

        'r-grid-item__content--square': parentProps.square,
      }"
      :hover-class="
        parentProps.clickable ? 'r-grid-item__content--clickable' : 'none'
      "
      :style="contentStyle"
    >
      <!-- renderContent -->
      <slot v-if="$slots.default"></slot>
      <template v-else>
        <!-- renderIcon -->
        <r-badge
          :dot="dot"
          :content="badge"
          :color="badgeColor"
          :max="max"
          :showZero="showZero"
          :position="position"
        >
          <slot v-if="$slots.icon" name="icon"></slot>
          <view
            :class="{
              'r-grid-item__icon': true,
            }"
          >
            <r-icon
              :name="icon"
              :size="
                isNumeric(parentProps.iconSize)
                  ? parentProps.iconSize + 'px'
                  : parentProps.iconSize
              "
              :color="iconColor"
              :prefix="iconPrefix"
            ></r-icon>
          </view>
        </r-badge>
        <!-- renderText -->
        <slot name="text" v-if="!!$slots.text"></slot>
        <text
          v-else-if="text"
          :class="{
            'r-grid-item__text': true,
          }"
          :style="textStyle"
          >{{ text }}</text
        >
      </template>
    </view>
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
const emit = defineEmits(["click"]);
const { uniqueId, findIndex, floor } = _;
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
  cssVar.width = parentWidth / columnNum + "px";
  cssVar.opacity = parentWidth ? 1 : 0;
  if (square) {
    cssVar.paddingTop = parentWidth / columnNum + "px";
  } else if (gutter) {
    cssVar.width = (parentWidth - gutter) / columnNum + "px";
    cssVar.flexBasis = (parentWidth - gutter) / columnNum + "px";

    const gutterValue = isNumeric(gutter) ? gutter + "px" : gutter;
    cssVar.paddingRight = gutterValue;
    if (index.value >= +columnNum) {
      cssVar.marginTop = gutterValue;
    }
  }
  return cssVar;
});

const contentStyle = computed(() => {
  const cssVar = {};
  const { border, gutter, reverse, direction } = parentProps.value;
  if (border) {
    cssVar["border-width"] = `0 var(--r-border-width) var(--r-border-width) 0`;
  }
  if (border && gutter) {
    cssVar["border-width"] = `var(--r-border-width)`;
  }
  if (reverse) {
    if (direction == "horizontal") {
      cssVar["flex-direction"] = `row-reverse`;
    } else {
      cssVar["flex-direction"] = `column-reverse`;
    }
  }

  return cssVar;
});

const textStyle = computed(() => {
  const cssVar = {};
  const { reverse, direction } = parentProps.value;
  if (reverse) {
    if (direction == "horizontal") {
      cssVar["margin"] = `0 var(--r-padding-xs) 0 0`;
    } else {
      cssVar["margin"] = `0 0 var(--r-padding-xs)`;
    }
  }
  return cssVar;
});

const onClick = (e) => {
  emit("click", e);
};

onMounted(async () => {
  componentsId.value = uniqueId(componentsName + "-");
  parentInject.setChildren({
    id: componentsId.value,
  });
});
</script>
<style lang="scss" scoped>
.r-grid-item {
  position: relative;
  box-sizing: border-box;

  &--square {
    height: 0;
  }

  &__icon {
    font-size: var(--r-grid-item-icon-size);
  }

  &__text {
    color: var(--r-grid-item-text-color);
    font-size: var(--r-grid-item-text-font-size);
    line-height: 1.5;
    // https://github.com/vant-ui/vant/issues/3894
    word-break: break-all;
    text-align: center;
  }

  &__icon + &__text {
    margin-top: var(--r-padding-xs);
  }

  &__content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: var(--r-grid-item-content-padding);
    background: var(--r-grid-item-content-background);

    &::after {
      z-index: 1;
      border-width: 0 var(--r-border-width) var(--r-border-width) 0;
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

      .r-grid-item__text {
        margin: 0 0 0 var(--r-padding-xs);
      }
    }

    &--reverse {
      flex-direction: column-reverse;

      .r-grid-item__text {
        margin: 0 0 var(--r-padding-xs);
      }
    }

    &--horizontal &--reverse {
      flex-direction: row-reverse;

      .r-grid-item__text {
        margin: 0 var(--r-padding-xs) 0 0;
      }
    }

    &--surround {
      &::after {
        border-width: var(--r-border-width);
      }
    }

    &--clickable {
      cursor: pointer;

      &:active {
        background-color: var(--r-grid-item-content-active-color);
      }
    }
  }
}

.r-hairline {
  border: 0 solid var(--r-border-color);
}
</style>
