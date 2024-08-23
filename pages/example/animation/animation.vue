<template>
  <r-config-provider :themeName="themeName">
    <page-header title="动画"></page-header>

    <view style="padding: 20rpx 0">
      <r-cell-group inset>
        <r-cell title="持续时间(ms)">
          <template #value>
            <r-stepper v-model:value="duration" :max="10000" :min="0" />
          </template>
        </r-cell>
        <r-cell title="延迟时间(ms)">
          <template #value>
            <r-stepper v-model:value="delay" :max="10000" :min="0" />
          </template>
        </r-cell>
        <r-cell title="使用单列" is-link @click="open({})"></r-cell>
      </r-cell-group>
    </view>

    <r-overlay
      :show="show"
      @opened="
        () => {
          animationShow = true;
        }
      "
    >
      <r-animation
        :exitClass="exitClass"
        :entryClass="entryClass"
        :duration="duration"
        :delay="delay"
        :show="animationShow"
        @opened="
          () => {
            animationShow = false;
          }
        "
        @closed="
          () => {
            show = false;
          }
        "
      >
      </r-animation>
    </r-overlay>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const duration = ref(500);
const delay = ref(0);
const show = ref(false);
const animationShow = ref(false);
const exitClass = ref("");
const entryClass = ref("");
</script>
