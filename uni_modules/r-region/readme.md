# r-region

`r-region` 导出了一个省市区code的json，可以配合r-picker进行省市区三级联动选择。

## 示例

```vue
<template>
    <r-picker
        title="标题"
        :columns="columns"
        v-model:value="pickerValues"
        :columnsFieldNames="{
          text: 'label',
          value: 'value',
          children: 'children',
        }"
        @change="changeData"
        @confirm="confirm"
      ></r-picker>
</template>
<script setup>
import {ref} from 'vue'
import { region } from "@/uni_modules/r-region/js_sdk/region.js";
const columns = ref(region); 
const pickerValues = ref([])
const changeData = e=>{
    console.log('e',e)
}

const confirm = e=>{
     console.log('e',e)
}
</script>

```

[r-picker文档](https://ext.dcloud.net.cn/plugin?id=18989)

