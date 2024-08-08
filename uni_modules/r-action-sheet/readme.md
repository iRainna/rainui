# r-action-sheet

`r-action-sheet` 动作面板，底部弹起的模态面板，包含与当前情境相关的多个选项。请在[r-popup](https://ext.dcloud.net.cn/plugin?id=18734)组件内部使用。[完整文档请前往](https://irainna.github.io/rainui/action/action-sheet.html)

## 示例

```vue
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
```

## API

### Props

| 名称        | 说明                                                                              | 类型    | 默认值     | 可选值     |
| ----------- | --------------------------------------------------------------------------------- | ------- | ---------- | ---------- |
| actions     | 面板选项列表(参数见下表)                                                          | Array   | []         | -          |
| title       | 顶部标题                                                                          | String  | -          | -          |
| cancelText  | 取消按钮文字                                                                      | String  | -          | -          |
| description | 选项上方的描述信息                                                                | String  | -          | -          |
| closeable   | 是否显示关闭图标                                                                  | Boolean | true       | false      |
| iconPrefix  | 前缀类名，相当于[r-icon](https://ext.dcloud.net.cn/plugin?id=18668)的 prefix 属性 | String  | `van-icon` | `iconfont` |
| closeIcon   | 关闭图标名称                                                                      | String  | `cross`    | -          |
| themeName   | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称                      | String  | `default`  |            |

### Action 数据结构

| 键名      | 说明                                                                                                        | 类型    |
| --------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| name      | 标题                                                                                                        | String  |
| subname   | 二级标题                                                                                                    | String  |
| color     | 选项文字颜色                                                                                                | String  |
| icon      | 选项图标名称                                                                                                | String  |
| prefix    | 前缀类名，相当于[r-icon](https://ext.dcloud.net.cn/plugin?id=18668)的 prefix 属性 不传使用 props.iconPrefix | String  |
| className | 为对应列添加额外的 class                                                                                    | String  |
| loading   | 是否为加载状态                                                                                              | Boolean |
| disabled  | 是否为禁用状态                                                                                              | Boolean |

### Events

| 名称        | 说明                                     | 回调参数     |
| ----------- | ---------------------------------------- | ------------ |
| select      | 点击选项时触发，禁用或加载状态下不会触发 | action,index |
| cancel      | 点击取消按钮时触发                       | -            |
| update:show | 显示状态改变时触发                       | show         |

### Slots

| 名称        | 说明                 | 参数           |
| ----------- | -------------------- | -------------- |
| default     | 自定义面板的展示内容 | -              |
| description | 自定义描述文案       | -              |
| cancel      | 自定义取消按钮内容   | -              |
| action      | 自定义选项内容       | {action,index} |
