<template>
  <scroll-view
    :class="{
      'r-tabs': true,
      [`r-tabs--${type}`]: true,
    }"
    :style="{
      ...getThemeCssVar(themeName),
      position: 'relative',
    }"
    :scroll-y="scrollspy || sticky"
  >
    <!-- renderHeader -->
    <!-- -->
    <view
      :style="{
        position: sticky ? 'sticky' : 'static',
        top: 0,
      }"
    >
      <!-- renderHeader -->
      <!-- style="position: sticky; top: 0; z-index: 2" -->
      <view
        :class="{
          'r-tabs__wrap': true,
        }"
      >
        <!-- :style="{
            width: getNavWidth + 'px',
          }" -->
        <scroll-view
          class="tab-scroll-box"
          style="height: 100%"
          :scroll-x="true"
          :scroll-left="tabScrollLeft"
          :show-scrollbar="false"
          scroll-with-animation
        >
          <view
            :class="{
              'r-tabs__nav': true,
              [`r-tabs__nav--${type}`]: true,
              [`r-tabs__nav--${type}--shrink`]: shrink,
              [`r-tabs__nav--${type}--complete`]: scrollable,
            }"
            :style="navStyle"
          >
            <slot name="navLeft"></slot>
            <!-- renderTitle -->
            <view
              v-for="(m, n) in children"
              :key="n"
              class="tab-title"
              @click="(e) => onClickTab(n, e)"
              :class="{
                'r-tab': true,
                [`r-tab--${type}`]: true,
                'r-tab--grow': scrollable && !shrink,
                'r-tab--shrink': shrink,
                'r-tab--active': m.active,
                'r-tab--disabled': m.disabled,
              }"
              :style="m.childrenStyle"
            >
              <!-- renderText -->
              <r-badge
                v-if="m.dot || (isDef(m.badge) && m.badge !== '')"
                :dot="m.dot"
                :content="m.badge"
                :showZero="m.showZeroBadge"
              >
                <text
                  :class="{
                    'r-tab__text': true,
                    'r-tab__text--ellipsis': scrollable,
                  }"
                >
                  <!-- <text v-if="m.slots?.title"> {{ m.slots?.title() }}</text> -->

                  <slot v-if="$slots.title" name="title" :item="m"></slot>
                  {{ !$slots.title ? m.title : "" }}
                </text>
              </r-badge>
              <text
                v-else
                :class="{
                  'r-tab__text': true,
                  'r-tab__text--ellipsis': scrollable,
                }"
              >
                <!-- <text v-if="m.slots?.title"> {{ m.slots?.title() }}</text>  -->
                <slot v-if="$slots.title" :item="m" name="title"></slot>
                {{ !$slots.title ? m.title : "" }}
              </text>
            </view>
            <!-- renderLine -->
            <view
              :class="{
                'r-tabs__line': true,
              }"
              :style="state.lineStyle"
            ></view>
            <slot name="navRight"></slot>
          </view>
        </scroll-view>
      </view>
      <slot v-if="$slots.navBottom" name="navBottom"></slot>
    </view>

    <view class="r-tabs__content" :style="tabsContentStyle">
      <slot />
    </view>
  </scroll-view>
</template>

<script setup>
import {
  defineProps,
  ref,
  provide,
  reactive,
  computed,
  nextTick,
  watch,
  getCurrentInstance,
  defineEmits,
} from "vue";
import TabsProps from "./props.js";

import {
  _,
  TABS_KEY,
  GetRect,
  isDef,
  callInterceptor,
} from "@/uni_modules/r-utils/js_sdk/index.js";

import { getThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const props = defineProps(TabsProps);
const emit = defineEmits(["rendered", "update:active", "change", "clickTab"]);

const tabScrollLeft = ref(0);
const { uniqueId, uniqWith, cloneDeep, isEqual, reduce } = _;
const id = uniqueId("tabs-");

const state = reactive({
  inited: false,
  position: "",
  lineStyle: {},
  currentIndex: -1,
  tabsRect: null,
  tabRect: [],
});

const children = ref([]);

const setChildren = (v) => {
  const arr = cloneDeep([...children.value, v]);
  children.value = uniqWith(arr, isEqual);
};

const changeChildren = (v) => {
  children.value = children.value.map((i) => {
    if (i.id == v.id) return v;
    return i;
  });

  nextTick(async () => {
    state.tabsRect = await GetRect(".r-tabs", proxy);
    state.tabRect = await GetRect(".tab-title", proxy, true);

    init();
  });
};
const tabsWidth = computed(() => state?.tabsRect?.width || 0);

const tabsContentStyle = computed(() => {
  const css = {};
  const left = state.currentIndex * tabsWidth.value;
  css.transform = `translateX(-${left}px) `;
  css.transitionDuration = "300ms";
  return css;
});
const scrollable = computed(
  () =>
    children.value.length > +props.swipeThreshold ||
    !props.ellipsis ||
    props.shrink
);
const getNavWidth = computed(() => {
  if (state.tabRect) {
    return reduce(state.tabRect, (sum, i) => (sum += i.width), 0);
  } else {
    return "auto";
  }
});
const navStyle = computed(() => ({
  borderColor: props.color,
  background: props.background,
  width: Math.max(getNavWidth.value, state.tabsRect?.width) + "px",
}));

const getTabName = (tab, index) => tab.name ?? index;

const init = () => {
  setCurrentIndexByName(props.active, true);
  nextTick(() => {
    state.inited = true;
    scrollIntoView(true);
  });
};

// correct the index of active tab
const setCurrentIndexByName = (name, skipScrollIntoView) => {
  const matched = children.value.find(
    (tab, index) => getTabName(tab, index) === name
  );

  const index = matched ? children.value.indexOf(matched) : 0;

  setCurrentIndex(index, skipScrollIntoView);
};
// update nav bar style
const setLine = () => {
  const shouldAnimate = state.inited;

  nextTick(() => {
    const title = state.tabRect[state.currentIndex];
    const tabsLeft = state?.tabsRect?.left || 0;

    const { lineWidth, lineHeight } = props;
    const left = title.left + title.width / 2 - tabsLeft;

    const lineStyle = {
      width: lineWidth,
      backgroundColor: props.color,
      transform: `translateX(${left}px) translateX(-50%)`,
    };

    if (shouldAnimate) {
      lineStyle.transitionDuration = `${props.duration}ms`;
    }

    if (isDef(lineHeight)) {
      const height = lineHeight;
      lineStyle.height = height;
      lineStyle.borderRadius = height;
    }

    state.lineStyle = lineStyle;
  });
};
const findAvailableTab = (index) => {
  const diff = index < state.currentIndex ? -1 : 1;

  while (index >= 0 && index < children.value.length) {
    if (!children.value[index].disabled) {
      return index;
    }

    index += diff;
  }
};

// scroll active tab into view
const scrollIntoView = (immediate) => {
  const tabRectItem = state.tabRect[state.currentIndex];

  const leftWidth = (state.tabsRect.width - tabRectItem.width) / 2;

  tabScrollLeft.value = tabRectItem.left - leftWidth;
};

const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
  const newIndex = findAvailableTab(currentIndex);

  if (!isDef(newIndex)) {
    return;
  }

  const newTab = children.value[newIndex];
  const newName = getTabName(newTab, newIndex);
  const shouldEmitChange = state.currentIndex !== null;

  if (state.currentIndex !== newIndex) {
    state.currentIndex = newIndex;

    if (!skipScrollIntoView) {
      scrollIntoView();
    }
    setLine();
  }

  if (newName !== props.active) {
    emit("update:active", newName);

    if (shouldEmitChange) {
      emit("change", newName, newTab.title);
    }
  }
};

// emit event when clicked
const onClickTab = (index, event) => {
  const { title, disabled } = children.value[index];
  const name = getTabName(children.value[index], index);

  if (!disabled) {
    callInterceptor(props.beforeChange, {
      args: [name],
      done: () => {
        setCurrentIndex(index);
      },
    });
  }

  emit("clickTab", {
    name,
    title,
    event,
    disabled,
  });
};
const onRendered = (name, title) => emit("rendered", name, title);
provide(TABS_KEY, {
  children,
  setChildren,
  changeChildren,
  props,
  id,
  state,
  onRendered,
  onClickTab,
});
watch(
  () => children.value,
  (value, oldVal) => {
    if (value.length != oldVal.length) {
      nextTick(async () => {
        state.tabsRect = await GetRect(".r-tabs", proxy);
        state.tabRect = await GetRect(".tab-title", proxy, true);
        init();
      });
    }
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.r-tab {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 var(--r-padding-base);
  color: var(--r-tab-text-color);
  font-size: var(--r-tab-font-size);
  line-height: var(--r-tab-line-height);
  cursor: pointer;

  &--active {
    color: var(--r-tab-active-text-color);
    font-weight: var(--r-font-bold);
  }

  &--disabled {
    color: var(--r-tab-disabled-text-color);
    cursor: not-allowed;
  }

  &--grow {
    flex: 1 0 auto;
    padding: 0 var(--r-padding-sm);
  }

  &--shrink {
    flex: none;
    padding: 0 var(--r-padding-xs);
  }

  &--card {
    color: var(--r-tabs-default-color);
    border-right: var(--r-border-width) solid var(--r-tabs-default-color);

    &:last-child {
      border-right: none;
    }

    &.r-tab--active {
      color: var(--r-white);
      background-color: var(--r-tabs-default-color);
    }

    &--disabled {
      color: var(--r-tab-disabled-text-color);
    }
  }

  &__text {
    &--ellipsis {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}

.r-tabs {
  position: relative;

  &__wrap {
    overflow: hidden;

    &--page-top {
      position: fixed;
    }

    &--content-bottom {
      top: auto;
      bottom: 0;
    }
  }
  &__nav {
    position: relative;
    display: flex;
    background: var(--r-tabs-nav-background);
    user-select: none;

    &--complete {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &--line {
      box-sizing: content-box;
      height: 100%;
      padding-bottom: 15px; /* 15px padding to hide scrollbar in mobile safari */
      // &--line
      // &--line
      &--shrink,
      &--complete {
        padding-right: var(--r-padding-xs);
        padding-left: var(--r-padding-xs);
      }
    }

    &--card {
      box-sizing: border-box;
      height: var(--r-tabs-card-height);
      margin: 0 var(--r-padding-md);
      border: var(--r-border-width) solid var(--r-tabs-default-color);
      border-radius: var(--r-border-radius-sm);
      &--shrink {
        display: inline-flex;
      }
    }

    // &--card
  }

  &__line {
    position: absolute;
    bottom: 15px;
    left: 0;
    // z-index: 1;
    width: var(--r-tabs-bottom-bar-width);
    height: var(--r-tabs-bottom-bar-height);
    background: var(--r-tabs-bottom-bar-color);
    border-radius: var(--r-tabs-bottom-bar-height);
  }

  &__track {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    will-change: left;
  }

  &__content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    &--animated {
      overflow: hidden;
    }
  }

  &--line {
    .r-tabs__wrap {
      height: var(--r-tabs-line-height);
    }
  }

  &--card {
    > .r-tabs__wrap {
      height: var(--r-tabs-card-height);
    }
  }
}
</style>
