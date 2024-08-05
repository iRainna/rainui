<template>
  <!-- width: '100vw', -->
  <view
    :class="{ 'r-tab': true, 'r-tab__panel': true }"
    :style="{
      ...getComponentThemeStyle,
    }"
  >
    <view
      class="r-tab-content"
      :style="{
        width: tabsWidth,
      }"
    >
      <slot v-if="$slots.default && show"></slot>
    </view>
  </view>
</template>

<script setup>
import {
  inject,
  computed,
  onMounted,
  ref,
  reactive,
  watch,
  nextTick,
} from "vue";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import {
  _,
  TABS_KEY,
  CONFIG_PROVIDER_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import TabProps from "./props.js";

const state = reactive({});

const { uniqueId, findIndex } = _;
const props = defineProps(TabProps);

const componentsName = "r-tab";
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

const id = uniqueId("tab-");

const parent = inject(TABS_KEY, {});
const index = computed(() => {
  return findIndex(parent.children.value, (i) => i.id == id);
});

const tabsWidth = computed(() => {
  return parent?.state?.tabsRect?.width
    ? parent.state.tabsRect.width + "px"
    : "auto";
});

const show = computed(() => parent?.state?.currentIndex == index.value);

const toRight = ref(false);
watch(
  () => parent.state.currentIndex,
  (value, oldValue) => {
    if (value > oldValue) {
      toRight.value = true;
    } else {
      toRight.value = false;
    }
  }
);
const setChildren = () => {
  parent?.setChildren({
    ...props,
    id,
  });
};

const changeChildren = () => {
  parent.changeChildren({
    ...props,
    id,
  });
};
watch(
  () => props.title,
  () => {
    changeChildren();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  nextTick(() => {
    state.mounted = true;
    setChildren();
  });
});
</script>

<style lang="scss" scoped>
.r-tab {
  &__panel {
    &,
    &-wrapper {
      flex-shrink: 0;
      box-sizing: border-box;
      width: 100%;
    }

    &-wrapper--inactive {
      height: 0;
      overflow: visible;
    }
  }
}
</style>
