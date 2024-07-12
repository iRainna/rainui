<template>
  <r-config-provider>
    <view style="padding: 20px">
      <r-divider content-position="left">基础用法</r-divider>
      <r-space>
        <r-tag type="primary">标签</r-tag>
        <r-tag type="success">标签</r-tag>
        <r-tag type="danger">标签</r-tag>
        <r-tag type="warning">标签</r-tag>
      </r-space>

      <r-divider content-position="left">空心样式</r-divider>
      <r-space>
        <r-tag plain type="primary">标签</r-tag>
      </r-space>

      <r-divider content-position="left">圆角样式</r-divider>
      <r-space>
        <r-tag round type="primary">标签</r-tag>
      </r-space>

      <r-divider content-position="left">标记样式</r-divider>
      <r-space>
        <r-tag mark type="primary">标签</r-tag>
      </r-space>
      <r-divider content-position="left">可关闭标签</r-divider>

      <r-space>
        <r-tag
          :show="show"
          closeable
          size="medium"
          type="primary"
          @close="show = false"
        >
          标签
        </r-tag>
      </r-space>
      <r-divider content-position="left">标签大小</r-divider>

      <r-space>
        <r-tag type="primary">标签</r-tag>
        <r-tag type="primary" size="medium">标签</r-tag>
        <r-tag type="primary" size="large">标签</r-tag>
      </r-space>

      <r-divider content-position="left">自定义颜色</r-divider>
      <r-space>
        <r-tag color="#7232dd">标签</r-tag>
        <r-tag color="#ffe1e1" text-color="#ad0000">标签</r-tag>
        <r-tag color="#7232dd" plain>标签</r-tag>
      </r-space>
    </view>
  </r-config-provider>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
