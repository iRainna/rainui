<template>
  <r-config-provider :themeName="themeName">
    <page-header title="图片"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基础使用</r-divider>
      <r-image
        width="200rpx"
        height="200rpx"
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      />
      <r-divider content-position="left">填充模式 </r-divider>
      <r-cell-group inset>
        <r-field name="checkbox" label="缩放模式">
          <template #input>
            <r-radio-group v-model:value="radio" direction="horizontal">
              <r-radio
                :name="item.id"
                v-for="item in modes.filter((t, index) => index < 5)"
                :key="item.id"
                >{{ item.value }}</r-radio
              >
            </r-radio-group>
          </template>
        </r-field>
        <r-field name="checkbox" label="裁剪模式">
          <template #input>
            <r-radio-group v-model:value="radio" direction="horizontal">
              <r-radio
                :name="item.id"
                v-for="item in modes.filter((t, index) => index >= 5)"
                :key="item.id"
                >{{ item.value }}</r-radio
              >
            </r-radio-group>
          </template>
        </r-field>

        <r-image
          :mode="mode"
          width="200rpx"
          height="200rpx"
          src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
        />
      </r-cell-group>

      <r-divider content-position="left">圆形图片 </r-divider>
      <r-image
        round
        width="200rpx"
        height="200rpx"
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      />

      <r-divider content-position="left">加载中提示 </r-divider>
      <r-image
        width="200rpx"
        height="200rpx"
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      >
        <template v-slot:loading>
          <r-loading type="spinner" size="20" />
        </template>
      </r-image>

      <r-divider content-position="left">加载失败提示 </r-divider>
      <r-image
        src="https://mp-ba18cd8e-6818-4b52-a63d-2ce352e908bd.cdn.bspapp.com/cloudstorage/test.jpg"
      >
        <template v-slot:error>加载失败</template>
      </r-image>
    </view>
  </r-config-provider>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { _ } from "@/uni_modules/r-utils/js_sdk/index.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const { uniqueId } = _;

const modes = ref(
  [
    "scaleToFill",
    "aspectFit",
    "aspectFill",
    "widthFix",
    "heightFix",
    "top",
    "bottom",
    "center",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right	",
  ].map((t) => ({
    id: uniqueId(),
    value: t,
  }))
);
const radio = ref(modes.value[0].id);
const mode = computed(() => {
  return modes.value.find((t) => t.id == radio.value).value;
});
</script>
