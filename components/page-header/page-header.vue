<template>
  <r-nav-bar
    :title="title"
    :leftArrow="leftArrow"
    :themeName="themeName"
    fixed
    placeholder
    safe-area-inset-top
    @clickLeft="onClickLeft"
  >
  </r-nav-bar>
</template>

<script>
export default {
  name: "page-header",
};
</script>
<script setup>
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();
const themeName = computed(() => themeStore.theme);
const onClickLeft = () => {
  uni.navigateBack();
};
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  leftArrow: {
    type: Boolean,
    default: true,
  },
});
</script>
