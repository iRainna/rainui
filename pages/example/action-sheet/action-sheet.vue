<template>
  <r-config-provider :themeName="themeName">
    <page-header title="动作面板"></page-header>
    <view style="padding: 10px 0">
      <r-divider content-position="left">基本使用</r-divider>
      <r-cell-group inset>
        <r-cell
          is-link
          title="基础用法"
          @click="
            open({
              actions: [
                { name: '选项一' },
                { name: '选项二' },
                { name: '选项三' },
              ],
            })
          "
        />
        <r-cell
          is-link
          title="展示图标"
          @click="
            open({
              actions: [
                { name: '选项一', icon: 'cart-o', prefix: 'van-icon' },
                { name: '选项二', icon: 'shop-o' },
                { name: '选项三', icon: 'star-o' },
              ],
            })
          "
        />
        <r-cell
          is-link
          title="展示取消按钮"
          @click="
            open({
              actions: [
                { name: '选项一', icon: 'cart-o', prefix: 'van-icon' },
                { name: '选项二', icon: 'shop-o' },
                { name: '选项三', icon: 'star-o' },
              ],
              cancelText: '取消',
              closeOnClickAction: true,
            })
          "
        />
        <r-cell
          is-link
          title="展示描述信息"
          @click="
            open({
              actions: [
                { name: '选项一' },
                { name: '选项二' },
                { name: '选项三', subname: '描述信息' },
              ],
              cancelText: '取消',
              closeOnClickAction: true,
              description: '这是一段描述信息',
            })
          "
        />
      </r-cell-group>

      <r-divider content-position="left">选项状态</r-divider>
      <r-cell-group inset>
        <r-cell
          is-link
          title="选项状态"
          @click="
            open({
              actions: [
                { name: '着色选项', color: '#ee0a24' },
                { name: '禁用选项', disabled: true },
                { name: '加载选项', loading: true },
              ],
              cancelText: '取消',
              closeOnClickAction: true,
            })
          "
        />
      </r-cell-group>

      <r-divider content-position="left">自定义面板</r-divider>
      <r-cell-group inset>
        <r-cell
          is-link
          title="自定义面板"
          @click="
            open({
              custom: 'true',
            })
          "
        />
      </r-cell-group>
    </view>
    <r-popup v-model:show="show" position="bottom" safeAreaInsetBottom>
      <r-action-sheet v-if="custom" title="标题" @cancel="onCancel">
        <div style="padding: 16px 16px 160px">内容</div>
      </r-action-sheet>
      <r-action-sheet
        v-else
        :actions="actions"
        @select="onSelect"
        :cancelText="cancelText"
        :closeOnClickAction="closeOnClickAction"
        @cancel="onCancel"
        :description="description"
      />
    </r-popup>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const show = ref(false);
const actions = ref([
  { name: "选项一" },
  { name: "选项二" },
  { name: "选项三" },
]);
const onSelect = (item) => {
  console.log("item,", item);
  show.value = false;
};
const custom = ref(false);
const cancelText = ref("");
const closeOnClickAction = ref(false);
const description = ref("");

const onCancel = () => {
  console.log("onCancel");
  show.value = false;
};

const open = (e) => {
  show.value = true;
  actions.value = e.actions;
  cancelText.value = e.cancelText || "";
  closeOnClickAction.value = e.closeOnClickAction || false;
  description.value = e.description || "";
  custom.value = e.custom || false;
};
</script>
