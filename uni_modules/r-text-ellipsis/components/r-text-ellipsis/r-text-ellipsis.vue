<template>
  <!-- 展示的数据 -->
  <view
    :class="{
      'r-text-ellipsis': true,
      'r-text-ellipsis--real': true,
    }"
    :style="{
      ...getComponentThemeStyle,
      fontSize: fontSize + 'px',
    }"
  >
    <text v-if="expanded">{{ content }}</text>
    <text v-else>{{ text }}</text>
    <!-- renderAction -->
    <text
      v-if="hasAction && actionText"
      :class="{
        'r-text-ellipsis__action': true,
      }"
      @click="onClickAction"
    >
      {{ actionText }}
    </text>
    <view
      v-if="!!$slots.action && hasAction"
      :class="{
        'r-text-ellipsis__action': true,
      }"
      @click="onClickAction"
    >
      <slot :expanded="expanded" name="action"></slot>
    </view>
  </view>
  <!-- 获取数据原始高度 -->
  <view
    :class="{
      'r-text-ellipsis': true,
      'r-text-ellipsis--shadow': true,
    }"
    :style="{
      ...getComponentThemeStyle,
      fontSize: fontSize + 'px',
      width: realRectWidth + 'px',
    }"
  >
    <text>{{ content }}</text>
  </view>
  <!-- 获取数据动态变化的高度 -->
  <view
    :class="{
      'r-text-ellipsis': true,
      'r-text-ellipsis--change-shadow': true,
    }"
    :style="{
      ...getComponentThemeStyle,
      fontSize: fontSize + 'px',
      width: realRectWidth + 'px',
    }"
  >
    <text>
      {{ changeContent }}
    </text>
  </view>
</template>
<script setup>
import {
  computed,
  inject,
  ref,
  nextTick,
  getCurrentInstance,
  provide,
  onMounted,
} from "vue";
import {
  _,
  CONFIG_PROVIDER_KEY,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { round, ceil } = _;
const { proxy } = getCurrentInstance();
const emit = defineEmits(["clickAction"]);
const props = defineProps({
  // 展示的行数
  rows: {
    type: Number,
    default: 1,
  },
  // 需要展示的文本
  content: {
    type: String,
    default: "",
  },
  // 展开操作的文案
  expandText: {
    type: String,
    default: "",
  },
  // 收起操作的文案
  collapseText: {
    type: String,
    default: "",
  },
  // 省略号的文本内容
  dots: {
    type: String,
    default: "...",
  },
  //字号
  fontSize: {
    type: Number,
    default: 16,
  },

  // 省略位置，可选值为 start middle
  position: {
    type: String,
    default: "end",
  },
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-text-ellipsis";
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

const text = ref("");
const expanded = ref(false);
const hasAction = ref(false);
const actionText = computed(() =>
  expanded.value ? props.collapseText : props.expandText
);
const realRect = ref(null);
const realRectWidth = computed(() => {
  return realRect.value?.width || 0;
});
const changeContent = ref("");
const calcEllipsised = async () => {
  const calcEllipsisText = async (container, maxHeight) => {
    const { content, position, dots } = props;
    const end = content.length;

    const calcEllipse = async () => {
      let index = 0;
      // calculate the former or later content
      const tail = async (left, right) => {
        if (right - left <= 1) {
          if (position === "end") {
            return content.slice(0, left) + dots;
          }
          return dots + content.slice(right, end);
        }

        const middle = round((left + right) / 2);

        // Set the interception location
        if (position === "end") {
          changeContent.value =
            content.slice(0, middle) + dots + actionText.value;
        } else {
          changeContent.value =
            dots + content.slice(middle, end) + actionText.value;
        }

        index++;

        await nextTick();

        container = await GetRect(".r-text-ellipsis--change-shadow", proxy);

        if (container.height > maxHeight) {
          if (position === "end") {
            return tail(left, middle);
          }

          return tail(middle, right);
        }
        if (position === "end") {
          // return

          return tail(middle, right);
        }

        // return
        return tail(left, middle);
      };

      //

      changeContent.value = await tail(0, end);
    };

    const middleTail = async (leftPart, rightPart) => {
      if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
        return (
          content.slice(0, leftPart[0]) +
          dots +
          content.slice(rightPart[1], end)
        );
      }

      const leftMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
      const rightMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);

      changeContent.value =
        props.content.slice(0, leftMiddle) +
        props.dots +
        props.content.slice(rightMiddle, end) +
        props.expandText;
      await nextTick();
      container = await GetRect(".r-text-ellipsis--change-shadow", proxy);
      if (container.height >= maxHeight) {
        return middleTail(
          [leftPart[0], leftMiddle],
          [rightMiddle, rightPart[1]]
        );
      }

      return middleTail([leftMiddle, leftPart[1]], [rightPart[0], rightMiddle]);
    };

    const middle = (0 + end) >> 1;

    if (props.position === "middle") {
      changeContent.value = await middleTail([0, middle], [middle, end]);
    } else {
      await calcEllipse();
    }

    return changeContent.value;
  };
  await nextTick();
  // Calculate the interceptional text
  const container = await GetRect(".r-text-ellipsis--shadow", proxy);

  const maxHeight = ceil(
    Number(props.rows) *
      getComponentThemeStyle.value["--r-text-ellipsis-line-height"] *
      Number(props.fontSize)
  );

  console.log("maxHeight", maxHeight);

  if (maxHeight < container.height) {
    hasAction.value = true;

    text.value = await calcEllipsisText(container, maxHeight);
  } else {
    hasAction.value = false;
    text.value = props.content;
  }
};
const toggle = (isExpanded = !expanded.value) => {
  expanded.value = isExpanded;
};

const onClickAction = (event) => {
  toggle();
  emit("clickAction", event);
};

onMounted(async () => {
  realRect.value = await GetRect(".r-text-ellipsis--real", proxy);

  calcEllipsised();
});

defineExpose({
  toggle,
});
</script>
<style lang="scss" scoped>
.r-text-ellipsis {
  line-height: var(--r-text-ellipsis-line-height);
  white-space: pre-wrap;
  overflow-wrap: break-word;

  &__action {
    cursor: pointer;
    color: var(--r-text-ellipsis-action-color);

    &:active {
      opacity: var(--r-active-opacity);
    }
  }
  &--shadow {
    position: fixed;
    z-index: -9999;
    top: -9999px;
    height: auto;
    min-height: auto;
    max-height: auto;
  }
  &--change-shadow {
    position: fixed;
    z-index: -9999;
    top: -9999px;
    // z-index: 2;
    // top: 300px;
    height: auto;
    min-height: auto;
    max-height: auto;
  }
}
</style>
