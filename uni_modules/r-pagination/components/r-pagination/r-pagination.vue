<template>
  <view class="r-pagination" :style="getComponentThemeStyle">
    <view class="r-pagination__items">
      <!-- renderPrevButton     -->
      <view
        v-if="showPrevButton"
        :class="{
          'r-pagination__item': true,
          'r-pagination__item--disabled': value === 1,
          'r-pagination__item--border': mode === 'simple',
          'r-pagination__item--prev': true,
        }"
        @click="updateModelValue(value - 1, true)"
      >
        <slot v-if="$slots.prevText" name="prevText" />
        <button class="r-pagination__item__button" v-else>
          {{ prevText }}
        </button>
      </view>
      <!--  props.mode === 'simple' renderDesc -->
      <template v-if="props.mode === 'simple'">
        <slot name="pageDesc" v-if="$slots.pageDesc"></slot>
        <view class="r-pagination__page-desc" v-else>
          {{ value + "/" + count }}
        </view>
      </template>
      <!-- props.mode !== 'simple' renderPages -->
      <template v-else>
        <view
          v-for="(page, index) in pages"
          :key="index"
          :class="{
            'r-pagination__item': true,
            'r-pagination__item--active': page.active,
            'r-pagination__item--page': true,
          }"
          @click="updateModelValue(page.number, true)"
        >
          <slot name="page" v-if="$slots.page" :item="page"></slot>
          <button v-else class="r-pagination__item__button">
            {{ page.text }}
          </button>
        </view>
      </template>
      <!-- renderNextButton -->
      <view
        v-if="showNextButton"
        :class="{
          'r-pagination__item': true,
          'r-pagination__item--disabled': value === count,
          'r-pagination__item--border': mode === 'simple',
          'r-pagination__item--next': true,
        }"
        @click="updateModelValue(value + 1, true)"
      >
        <slot v-if="$slots.nextText" name="nextText" />
        <button class="r-pagination__item__button" v-else>
          {{ nextText }}
        </button>
      </view>
    </view>
  </view>
</template>
<script setup>
import paginationProps from "./props";
import { computed, ref, inject } from "vue";

import {
  getThemeCssVar,
  getComponentThemeCssVar,
} from "@/uni_modules/r-theme/js_sdk/index.js";
import { _, CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";

const props = defineProps(paginationProps);
const { clamp } = _;
const componentsName = "r-pagination";
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

const emit = defineEmits(["update:value", "change"]);
const count = computed(() => {
  const { pageCount, totalItems, itemsPerPage } = props;
  const count = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
  return Math.max(1, count);
});
const makePage = (number, text, active) => ({ number, text, active });
const pages = computed(() => {
  const items = [];
  const pageCount = count.value;
  const showPageSize = +props.showPageSize;
  const { value, forceEllipses } = props;

  // Default page limits
  let startPage = 1;
  let endPage = pageCount;
  const isMaxSized = showPageSize < pageCount;

  // recompute if showPageSize
  if (isMaxSized) {
    // Current page is displayed in the middle of the visible ones
    startPage = Math.max(value - Math.floor(showPageSize / 2), 1);
    endPage = startPage + showPageSize - 1;

    // Adjust if limit is exceeded
    if (endPage > pageCount) {
      endPage = pageCount;
      startPage = endPage - showPageSize + 1;
    }
  }

  // Add page number links
  for (let number = startPage; number <= endPage; number++) {
    const page = makePage(number, number, number === value);
    items.push(page);
  }

  // Add links to move between page sets
  if (isMaxSized && showPageSize > 0 && forceEllipses) {
    if (startPage > 1) {
      const prevPages = makePage(startPage - 1, "...");
      items.unshift(prevPages);
    }

    if (endPage < pageCount) {
      const nextPages = makePage(endPage + 1, "...");
      items.push(nextPages);
    }
  }

  return items;
});

const updateModelValue = (value, emitChange = false) => {
  value = clamp(value, 1, count.value);

  if (props.value !== value) {
    emit("update:value", value);

    if (emitChange) {
      emit("change", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.r-pagination {
  font-size: var(--r-pagination-font-size);

  &__items {
    display: flex;
  }

  &__item,
  &__page-desc {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item {
    flex: 1;
    box-sizing: border-box;
    min-width: var(--r-pagination-item-width);
    height: var(--r-pagination-height);

    color: var(--r-pagination-item-default-color);
    background: var(--r-pagination-background);
    cursor: pointer;
    user-select: none;
    border-right: solid var(--r-border-width) var(--r-border-color);
    &:last-child {
      border-right: none;
    }

    &__button {
      flex: 1;
      color: inherit;
      height: var(--r-pagination-height);
      border: none;
      line-height: var(--r-pagination-height);
      font-size: 28rpx;
      padding: 0;
      background: transparent;
      &::after {
        content: none;
      }

      &[disabled] {
        cursor: not-allowed;
      }
    }

    &:active {
      color: var(--r-white);
      background-color: var(--r-pagination-item-default-color);
    }

    &:not(:last-child)::after {
      border-right-width: 0;
    }

    &--active {
      color: var(--r-white);
      background-color: var(--r-pagination-item-default-color);
    }

    &--page {
      flex-grow: 0;
    }

    &--prev,
    &--next {
      padding: 0 var(--r-padding-base);
      cursor: pointer;
    }

    &--border:first-child::after {
      border-right-width: var(--r-border-width);
    }

    &--disabled {
      &,
      &:active {
        color: var(--r-pagination-item-disabled-color);
        background-color: var(--r-pagination-item-disabled-background);
        opacity: var(--r-pagination-disabled-opacity);
      }
    }
  }

  &__page-desc {
    flex: 1;
    height: var(--r-pagination-height);
    color: var(--r-pagination-desc-color);
  }
}
</style>
