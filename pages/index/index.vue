<template>
  <view class="content" style="padding: 0px; background-color: transparent">
    <r-config-provider>
      <view style="padding: 10px 0">
        <r-divider content-position="left">基本使用</r-divider>
        <r-cell-group inset>
          <r-cell is-link title="基础用法" @click="show = true" />
          <r-cell is-link title="展示图标" @click="show2 = true" />
          <r-cell is-link title="展示取消按钮" @click="show3 = true" />
          <r-cell is-link title="展示描述信息" @click="show4 = true" />
        </r-cell-group>

        <r-divider content-position="left">选项状态</r-divider>
        <r-cell-group inset>
          <r-cell is-link title="选项状态" @click="show5 = true" />
        </r-cell-group>

        <r-divider content-position="left">自定义面板</r-divider>
        <r-cell-group inset>
          <r-cell is-link title="自定义面板" @click="show6 = true" />
        </r-cell-group>
      </view>
    </r-config-provider>
    <r-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
    <r-action-sheet
      v-model:show="show2"
      :actions="actions2"
      @select="onSelect2"
    />

    <r-action-sheet
      v-model:show="show3"
      :actions="actions3"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
    />

    <r-action-sheet
      v-model:show="show4"
      :actions="actions4"
      cancel-text="取消"
      description="这是一段描述信息"
      close-on-click-action
    />

    <r-action-sheet
      v-model:show="show5"
      :actions="actions5"
      cancel-text="取消"
      close-on-click-action
    />

    <r-action-sheet v-model:show="show6" title="标题">
      <div style="padding: 16px 16px 160px">内容</div>
    </r-action-sheet>
  </view>
</template>
<script setup>
import { ref } from "vue";
const show = ref(false);
const actions = ref([
  { name: "选项一" },
  { name: "选项二" },
  { name: "选项三" },
]);
const onSelect = (item) => {
  show.value = false;
};

const show2 = ref(false);
const actions2 = ref([
  { name: "选项一", icon: "cart-o", prefix: "van-icon" },
  { name: "选项二", icon: "shop-o" },
  { name: "选项三", icon: "star-o" },
]);
const onSelect2 = (item) => {
  show2.value = false;
};

const show3 = ref(false);
const actions3 = ref([
  { name: "选项一" },
  { name: "选项二" },
  { name: "选项三" },
]);
const onCancel = () => {
  console.log("onCancel");
};

const show4 = ref(false);

const actions4 = ref([
  { name: "选项一" },
  { name: "选项二" },
  { name: "选项三", subname: "描述信息" },
]);

const show5 = ref(false);
const actions5 = ref([
  { name: "着色选项", color: "#ee0a24" },
  { name: "禁用选项", disabled: true },
  { name: "加载选项", loading: true },
]);

const show6 = ref(false);
</script>
