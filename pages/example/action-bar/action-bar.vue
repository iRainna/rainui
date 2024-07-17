<template>
  <view>
    <r-config-provider>
      <r-cell-group inset>
        <r-cell title="基础用法" isLink @click="show = 1"></r-cell>
        <r-cell title="徽标提示" isLink @click="show = 2"></r-cell>
        <r-cell title="自定义图标颜色" isLink @click="show = 3"></r-cell>
        <r-cell title="自定义按钮颜色" isLink @click="show = 4"></r-cell>
      </r-cell-group>
    </r-config-provider>
    <r-action-bar v-if="show == 1">
      <r-action-bar-icon icon="chat-o" text="客服" />
      <r-action-bar-icon icon="cart-o" text="购物车" />
      <r-action-bar-icon icon="shop-o" text="店铺" />

      <r-action-bar-button
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button type="danger" text="立即购买" style="width: 100%" />
    </r-action-bar>

    <r-action-bar v-if="show == 2">
      <r-action-bar-icon icon="chat-o" text="客服" dot />
      <r-action-bar-icon icon="cart-o" text="购物车" badge="5" />
      <r-action-bar-icon icon="shop-o" text="店铺" badge="12" />
      <r-action-bar-button
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button type="danger" text="立即购买" style="width: 100%" />
    </r-action-bar>

    <r-action-bar v-if="show == 3">
      <r-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <r-action-bar-icon icon="cart-o" text="购物车" />
      <r-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <r-action-bar-button
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button type="danger" text="立即购买" style="width: 100%" />
    </r-action-bar>

    <r-action-bar v-if="show == 4">
      <r-action-bar-icon icon="chat-o" text="客服" />
      <r-action-bar-icon icon="shop-o" text="店铺" />
      <r-action-bar-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        style="width: 100%"
      />
      <r-action-bar-button
        color="#7232dd"
        type="danger"
        text="立即购买"
        style="width: 100%"
      />
    </r-action-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";
const show = ref(1);
</script>
