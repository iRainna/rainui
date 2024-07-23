<template>
  <view
    :class="{
      'r-highlight': true,
    }"
    :style="getComponentThemeStyle"
  >
    <text
      v-for="(chunk, n) in highlightChunks"
      :key="n"
      :class="{
        'r-highlight__tag': chunk.highlight,
      }"
      :style="chunk.highlight ? highlightStyle : unhighlightStyle"
    >
      {{ sourceString.slice(chunk.start, chunk.end) }}
    </text>
  </view>
</template>
<script setup>
import { computed, inject } from "vue";
import { _, CONFIG_PROVIDER_KEY } from "@/uni_modules/r-utils/js_sdk/index.js";

import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({
  // 是否自动转义
  autoEscape: {
    type: Boolean,
    default: true,
  },
  //   是否区分大小写
  caseSensitive: {
    type: Boolean,
    default: false,
  },
  //   高亮元素的样式
  highlightStyle: {
    type: Object,
    default: () => {},
  },
  //   期望高亮的文本
  keywords: {
    type: [String, Array],
    default: () => [],
  },
  //   源文本
  sourceString: {
    type: String,
    default: "",
  },
  //   非高亮元素的样式
  unhighlightStyle: {
    type: Object,
    default: () => {},
  },
  //主题名称
  themeName: {
    type: String,
    default: "default",
  },
});

const componentsName = "r-highlight";
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

const highlightChunks = computed(() => {
  const { autoEscape, caseSensitive, keywords, sourceString } = props;
  const flags = caseSensitive ? "g" : "gi";
  const _keywords = Array.isArray(keywords) ? keywords : [keywords];

  // generate chunks
  let chunks = _keywords
    .filter((keyword) => keyword)
    .reduce((chunks, keyword) => {
      if (autoEscape) {
        keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      const regex = new RegExp(keyword, flags);

      let match;

      while ((match = regex.exec(sourceString))) {
        const start = match.index;
        const end = regex.lastIndex;

        if (start >= end) {
          regex.lastIndex++;
          continue;
        }

        chunks.push({
          start,
          end,
          highlight: true,
        });
      }

      return chunks;
    }, []);

  // merge chunks
  chunks = chunks
    .sort((a, b) => a.start - b.start)
    .reduce((chunks, currentChunk) => {
      const prevChunk = chunks[chunks.length - 1];

      if (!prevChunk || currentChunk.start > prevChunk.end) {
        const unhighlightStart = prevChunk ? prevChunk.end : 0;
        const unhighlightEnd = currentChunk.start;

        if (unhighlightStart !== unhighlightEnd) {
          chunks.push({
            start: unhighlightStart,
            end: unhighlightEnd,
            highlight: false,
          });
        }

        chunks.push(currentChunk);
      } else {
        prevChunk.end = Math.max(prevChunk.end, currentChunk.end);
      }

      return chunks;
    }, []);
  const lastChunk = chunks[chunks.length - 1];

  if (!lastChunk) {
    chunks.push({
      start: 0,
      end: sourceString.length,
      highlight: false,
    });
  }

  if (lastChunk && lastChunk.end < sourceString.length) {
    chunks.push({
      start: lastChunk.end,
      end: sourceString.length,
      highlight: false,
    });
  }

  return chunks;
});
</script>
<style lang="scss" scoped>
.r-highlight {
  &__tag {
    color: var(--r-highlight-tag-color);
  }
}
</style>
