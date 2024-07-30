<template>
  <r-config-provider :themeName="themeName">
    <page-header title="弹出层"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">弹出位置 </r-divider>
      <r-cell-group>
        <r-cell
          is-link
          title="顶部弹出"
          @click="
            open({
              position: 'top',
            })
          "
        />
        <r-cell
          is-link
          title="底部弹出"
          @click="
            open({
              position: 'bottom',
            })
          "
        />
        <r-cell
          is-link
          title="左侧弹出"
          @click="
            open({
              position: 'left',
            })
          "
        />
        <r-cell
          is-link
          title="右侧弹出"
          @click="
            open({
              position: 'right',
            })
          "
        />
        <r-cell
          is-link
          title="居中弹出"
          @click="
            open({
              position: 'center',
            })
          "
        />
      </r-cell-group>

      <r-divider content-position="left">关闭图标 </r-divider>

      <r-cell-group>
        <r-cell
          is-link
          title="关闭图标"
          @click="
            open({
              closeable: true,
            })
          "
        />
        <r-cell
          is-link
          title="自定义图标"
          @click="
            open({
              closeable: true,
              closeIcon: 'close',
            })
          "
        />
        <r-cell
          is-link
          title="图标位置"
          @click="
            open({
              closeable: true,
              closeIconPosition: 'top-left',
            })
          "
        />
      </r-cell-group>

      <r-divider content-position="left">圆角弹窗 </r-divider>
      <r-cell-group>
        <r-cell
          is-link
          title="圆角弹窗（居中）"
          @click="
            open({
              round: true,
              position: 'center',
            })
          "
        />
        <r-cell
          is-link
          title="圆角弹窗（底部）"
          @click="
            open({
              round: true,
              position: 'bottom',
            })
          "
        />
      </r-cell-group>
    </view>

    <r-popup
      v-model:show="show"
      :round="popupParams.round"
      :position="popupParams.position || 'bottom'"
      :closeable="popupParams.closeable"
      :close-icon="popupParams.closeIcon || 'cross'"
      :close-icon-position="popupParams.closeIconPosition || 'top-right'"
      @click-close-icon="show = false"
      safeAreaInsetTop
      safeAreaInsetBottom
      :customStyle="{
        marginTop: !['bottom', 'center'].includes(popupParams.position)
          ? '92rpx'
          : '0',
      }"
    >
      <view style="height: 100px; background-color: #fff">11111</view>
    </r-popup>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const show = ref(false);
const popupParams = ref({});
const open = (e) => {
  popupParams.value = e;
  show.value = true;
};
</script>
