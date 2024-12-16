# r-number-keyboard

`r-number-keyboard`虚拟数字键盘，可以配合自定义的输入框组件使用。

## 示例

```vue
<template>
  <r-config-provider :themeName="themeName">
    <page-header title="数字键盘"></page-header>

    <view style="padding-top: 20px">
      <r-cell-group inset>
        <r-cell title="弹窗默认键盘" @click="open({})" />
        <r-cell
          title="弹出带右侧栏的键盘"
          @click="
            open({
              theme: 'custom',
              extraKey: '.',
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出身份证号键盘"
          @click="
            open({
              extraKey: 'X',
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出带标题的键盘"
          @click="
            open({
              title: '键盘标题',
              extraKey: '.',
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出配置多个按键的键盘"
          @click="
            open({
              theme: 'custom',
              extraKey: ['00', '.'],
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出配置随机数字的键盘"
          @click="
            open({
              randomKeyOrder: true,
            })
          "
        />
        <r-cell title="双向绑定" :value="value" />
      </r-cell-group>
    </view>
  </r-config-provider>
  <r-number-keyboard
    v-model:show="show"
    :closeButtonText="item.closeButtonText"
    :theme="item.theme || 'default'"
    :extra-key="item.extraKey"
    :close-button-text="item.closeButtonText"
    :title="item.title"
    :random-key-order="item.randomKeyOrder"
    v-model:value="value"
  ></r-number-keyboard>
</template>

<script setup>
import useTheme from "@/hooks/useTheme";
import { ref } from "vue";
const { themeName } = useTheme();
const onClickLeft = () => {
  uni.navigateBack();
};

const show = ref(false);
const item = ref({});
const value = ref("");

const open = (data = {}) => {
  show.value = true;
  item.value = data;
};
</script>
```

## API

### Props

| 名称                | 说明                                                         | 类型             | 默认值     | 可选值   |
| ------------------- | ------------------------------------------------------------ | ---------------- | ---------- | -------- |
| value               | 当前输入值                                                   | String           | -          | -        |
| show                | 是否显示键盘                                                 | Boolean          | false      |          |
| title               | 键盘标题                                                     | String           | -          | -        |
| theme               | 样式风格                                                     | String           | `default`  | `custom` |
| maxlength           | 输入值最大长度                                               | Number \| String | `Infinity` | -        |
| zIndex              | 键盘 z-index 层级                                            | Number \| String | `100`      | -        |
| extraKey            | 底部额外按键的内容                                           | String \| Array  | -          | -        |
| closeButtonText     | 关闭按钮文字，空则不展示                                     | String           | -          | -        |
| deleteButtonText    | 删除按钮文字，空则展示删除图标                               | String           | -          | -        |
| closeButtonLoading  | 是否将关闭按钮设置为加载中状态，仅在 theme="custom" 时有效   | Boolean          | false      | true     |
| showDeleteKey       | 是否展示删除图标                                             | Boolean          | true       | false    |
| blurOnClose         | 是否在点击关闭按钮时触发 blur 事件                           | Boolean          | true       | false    |
| hideOnClickOutside  | 是否在点击外部时收起键盘                                     | Boolean          | true       | false    |
| safeAreaInsetBottom | 是否开启底部安全区适配                                       | Boolean          | true       | false    |
| randomKeyOrder      | 是否将通过随机顺序展示按键                                   | Boolean          | false      | true     |
| themeName           | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String           | `default`  |          |

### Slots

| 名称      | 说明                 |
| --------- | -------------------- |
| delete    | 自定义删除按键内容   |
| extraKey  | 自定义左下角按键内容 |
| titleLeft | 自定义标题栏左侧内容 |

### Events

| 名称         | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| input        | 点击按键时触发     | value    |
| delete       | 点击删除键时触发   | -        |
| close        | 点击关闭按钮时触发 | -        |
| blur         | 点击关闭按钮       | -        |
| update:show  | 显示状态变化时触发 | flag     |
| update:value | value 变化时触发   | value    |

更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)
