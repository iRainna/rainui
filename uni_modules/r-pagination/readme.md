# r-pagination

`r-pagination`分页组件,数据量过多时，采用分页的形式将数据分隔，每次只加载一个页面。

## 示例

```vue
<template>
  <r-config-provider>
    <view style="padding: 20rpx">
      <view style="padding: 20rpx 0">基础用法</view>
      <r-pagination
        v-model:value="currentPage"
        :total-items="24"
        :items-per-page="5"
      />
      <view style="padding: 20rpx 0">简单模式 </view>
      <r-pagination
        v-model:value="currentPage"
        :page-count="12"
        mode="simple"
      />
      <view style="padding: 20rpx 0">显示省略号 </view>
      <r-pagination
        v-model:value="currentPage"
        :total-items="125"
        :show-page-size="3"
        force-ellipses
      />
      <view style="padding: 20rpx 0">自定义按钮 </view>
      <r-pagination
        v-model:value="currentPage"
        :total-items="50"
        :show-page-size="5"
      >
        <template #prevText>
          <r-icon name="arrow-left" color="inherit" />
        </template>
        <template #nextText>
          <r-icon name="arrow" color="inherit" />
        </template>
        <template #page="{ item }">{{ item.text }}</template>
      </r-pagination>
    </view>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
const currentPage = ref(1);
</script>

```

## API

### Props

| 名称           | 说明                                                         | 类型    | 默认值    | 可选值   |
| -------------- | ------------------------------------------------------------ | ------- | --------- | -------- |
| value          | 当前页码                                                     | Number  | 1         | -        |
| mode           | 显示模式                                                     | String  | `multi`   | `simple` |
| prevText       | 上一页按钮文字                                               | String  | `上一页`  | -        |
| nextText       | 下一页按钮文字                                               | String  | `下一页`  | -        |
| pageCount      | 总页数                                                       | Number  | -         | -        |
| totalItems     | 总记录数                                                     | Number  | 0         | -        |
| itemsPerPage   | 每页记录数                                                   | Number  | 10        |          |
| showPageSize   | 显示的页码个数                                               | Number  | 5         |          |
| forceEllipses  | 是否显示省略号                                               | Boolean | false     | true     |
| showPrevButton | 是否展示上一页按钮                                           | Boolean | true      | false    |
| showNextButton | 是否展示下一页按钮                                           | Boolean | true      | false    |
| themeName      | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661)主题名称 | String  | `default` |          |

### Slots

| 名称     | 说明                 | 参数   |
| -------- | -------------------- | ------ |
| page     | 自定义页码           | {item} |
| prevText | 自定义上一页按钮文字 | -      |
| nextText | 自定义下一页按钮文字 | -      |
| pageDesc | 简单模式内容插槽     | -      |

### Events

| 名称         | 说明           | 回调参数 |
| ------------ | -------------- | -------- |
| change       | 页码改变时触发 | value    |
| update:value | 页码改变时触发 | value    |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)