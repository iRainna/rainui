<script setup>
  import {pathName} from '../components/hooks/usePath'
  pathName.value = 'pages/example/action-sheet/action-sheet'
 </script>

# r-action-sheet

`r-action-sheet` 动作面板，底部弹起的模态面板，包含与当前情境相关的多个选项。

## 示例

```vue
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
```

## API

### Props

| 名称                | 说明                                                                              | 类型    | 默认值     | 可选值     |
| ------------------- | --------------------------------------------------------------------------------- | ------- | ---------- | ---------- |
| show                | 是否显示动作面板                                                                  | Boolean | false      | true       |
| actions             | 面板选项列表(参数见下表)                                                          | Array   | []         | -          |
| title               | 顶部标题                                                                          | String  | -          | -          |
| cancelText          | 取消按钮文字                                                                      | String  | -          | -          |
| description         | 选项上方的描述信息                                                                | String  | -          | -          |
| closeable           | 是否显示关闭图标                                                                  | Boolean | true       | false      |
| iconPrefix          | 前缀类名，相当于[r-icon](https://ext.dcloud.net.cn/plugin?id=18668)的 prefix 属性 | String  | `van-icon` | `iconfont` |
| closeIcon           | 关闭图标名称                                                                      | String  | `cross`    | -          |
| duration            | 动画时长(ms)                                                                      | Number  | 300        | -          |
| zIndex              | 将面板的 z-index 层级设置为一个固定值                                             | Number  | 2000       |            |
| round               | 是否显示圆角                                                                      | Boolean | true       | false      |
| overlay             | 是否显示遮罩层                                                                    | Boolean | true       | false      |
| overlayClass        | 自定义遮罩层类名                                                                  | String  | -          | -          |
| overlayStyle        | 自定义遮罩层样式                                                                  | Object  | {}         | -          |
| lockScroll          | 是否锁定背景滚动                                                                  | Boolean | true       | false      |
| closeOnClickAction  | 是否在点击选项后关闭                                                              | Boolean | true       | false      |
| closeOnClickOverlay | 是否在点击遮罩层后关闭                                                            | Boolean | true       | false      |
| safeAreaInsetBottom | 是否开启底部安全区适配                                                            | Boolean | true       | false      |
| themeName           | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称                      | String  | `default`  |            |

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

| 名称         | 说明                                     | 回调参数     |
| ------------ | ---------------------------------------- | ------------ |
| select       | 点击选项时触发，禁用或加载状态下不会触发 | action,index |
| cancel       | 点击取消按钮时触发                       | -            |
| open         | 打开面板时触发                           | -            |
| close        | 关闭面板时触发                           | -            |
| opened       | 打开面板且动画结束后触发                 | -            |
| closed       | 关闭面板且动画结束后触发                 | -            |
| clickOverlay | 点击遮罩层时触发                         | -            |
| update:show  | 显示状态改变时触发                       | show         |

### Slots

| 名称        | 说明                 | 参数           |
| ----------- | -------------------- | -------------- |
| default     | 自定义面板的展示内容 | -              |
| description | 自定义描述文案       | -              |
| cancel      | 自定义取消按钮内容   | -              |
| action      | 自定义选项内容       | {action,index} |

###
