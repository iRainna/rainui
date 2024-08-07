# r-collapse-item

`r-collapse-item`折叠面板组件，将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。该组件为 [r-collapse](https://ext.dcloud.net.cn/plugin?id=18894)的子组件，导入[r-collapse](https://ext.dcloud.net.cn/plugin?id=18894)使用即可

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础使用</view>
      <r-collapse v-model:value="activeNames">
        <r-collapse-item title="标题1" name="1">
          代码是写出来给人看的，附带能在机器上运行。
        </r-collapse-item>
        <r-collapse-item title="标题2" name="2">
          技术无非就是那些开发它的人的共同灵魂。
        </r-collapse-item>
        <r-collapse-item title="标题3" name="3">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </r-collapse-item>
      </r-collapse>
      <view style="padding: 20px">手风琴</view>
      <r-collapse v-model:value="activeName2" accordion>
        <r-collapse-item title="标题1" name="1">
          代码是写出来给人看的，附带能在机器上运行。
        </r-collapse-item>
        <r-collapse-item title="标题2" name="2">
          技术无非就是那些开发它的人的共同灵魂。
        </r-collapse-item>
        <r-collapse-item title="标题3" name="3">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </r-collapse-item>
      </r-collapse>
      <view style="padding: 20px">禁用状态</view>
      <r-collapse v-model:value="activeNames3">
        <r-collapse-item title="标题1" name="1">
          代码是写出来给人看的，附带能在机器上运行。
        </r-collapse-item>
        <r-collapse-item title="标题2" name="2" disabled>
          技术无非就是那些开发它的人的共同灵魂。
        </r-collapse-item>
        <r-collapse-item title="标题3" name="3" disabled>
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </r-collapse-item>
      </r-collapse>
      <view style="padding: 20px">自定义标题内容</view>
      <r-collapse v-model:value="activeNames4">
        <r-collapse-item name="1">
          <template #title>
            <div>标题1 <r-icon name="question-o" /></div>
          </template>
          代码是写出来给人看的，附带能在机器上运行。
        </r-collapse-item>
        <r-collapse-item title="标题2" name="2" icon="shop-o">
          技术无非就是那些开发它的人的共同灵魂。
        </r-collapse-item>
      </r-collapse>
    </r-config-provider>
  </view>
</template>
<script setup>
import { ref } from "vue";
const activeNames = ref(["1"]);
const activeName2 = ref(["1"]);
const activeNames3 = ref(["1"]);
const activeNames4 = ref(["1"]);
const activeNames5 = ref(["1"]);
const collapse = ref(null);
const openAll = () => {
  collapse.value.toggleAll(true);
};
const toggleAll = () => {
  collapse.value.toggleAll();
};
</script>
```

## API

### Collapse Props

| 名称      | 说明                | 类型                      | 默认值  | 可选值 |
| --------- | ------------------- | ------------------------- | ------- | ------ |
| value     | 当前展开面板的 name | String \| Number \| Array | ''      | -      |
| accordion | 是否开启手风琴模式  | Boolean                   | false   |        |
| border    | 是否显示外边框      | Boolean                   | true    |        |
| themeName | r-theme 主题名称    | String                    | default |        |

### CollapseItem Props

| 名称       | 说明                                               | 类型             | 默认值  | 可选值 |
| ---------- | -------------------------------------------------- | ---------------- | ------- | ------ |
| name       | 唯一标识符，默认为索引值                           | String \| Number | -       | -      |
| icon       | 标题栏左侧图标名称，等同于 r-icon 组件的 name 属性 | String           |         |        |
| size       | 标题栏大小                                         | String           |         | large  |
| title      | 标题栏左侧内容                                     | String \| Number |         |        |
| value      | 标题栏右侧内容                                     | String \| Number |         |        |
| label      | 标题栏描述信息                                     | String \| Number |         |        |
| border     | 是否显示内边框                                     | Boolean          | true    |        |
| isLink     | 是否展示标题栏右侧箭头并开启点击反馈               | Boolean          | true    |        |
| disabled   | 是否禁用面板                                       | Boolean          | false   |        |
| readonly   | 是否为只读状态，只读状态下无法操作面板             | Boolean          | false   |        |
| titleClass | 左侧标题额外类名                                   | String           |         |        |
| valueClass | 右侧内容额外类名                                   | String           |         |        |
| labelClass | 描述信息额外类名                                   | String           |         |        |
| themeName  | r-theme 的主题名称                                 | String           | default |        |

### CollapseItem Slots

| 名称      | 说明                 |
| --------- | -------------------- |
| default   | 面板内容             |
| title     | 自定义标题栏左侧内容 |
| value     | 自定义标题栏右侧内容 |
| label     | 自定义标题栏左侧图标 |
| icon      | 默认插槽             |
| rightIcon | 自定义标题栏右侧图标 |

### Collapse Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |

### Collapse Events

| 名称         | 说明           | 回调参数                                 |
| ------------ | -------------- | ---------------------------------------- |
| update:value | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |
| change       | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)