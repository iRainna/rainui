<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础用法</view>
      <r-cell-group>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      <view style="padding: 20px">卡片风格</view>
      <r-cell-group inset>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      <view style="padding: 20px">单元格大小</view>
      <r-cell title="单元格" value="内容" size="large" />
      <r-cell title="单元格" value="内容" size="large" label="描述信息" />

      <view style="padding: 20px">展示图标</view>
      <r-cell title="单元格" icon="location-o" />

      <view style="padding: 20px">展示箭头</view>
      <r-cell title="单元格" is-link />
      <r-cell title="单元格" is-link value="内容" />
      <r-cell title="单元格" is-link arrow-direction="down" value="内容" />

      <view style="padding: 20px">分组标题</view>
      <r-cell-group title="分组1">
        <r-cell title="单元格" value="内容" />
      </r-cell-group>
      <r-cell-group title="分组2">
        <r-cell title="单元格" value="内容" />
      </r-cell-group>
      <!--  -->
      <view style="padding: 20px">使用插槽</view>
      <r-cell value="内容" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">单元格</span>
          <r-tag type="primary">标签</r-tag>
        </template>
      </r-cell>
    </r-config-provider>
  </view>
</template>
