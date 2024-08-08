<template>
  <r-config-provider :themeName="themeName">
    <page-header title="选择器"></page-header>
    <view style="padding: 20rpx 0">
      <r-cell-group inset>
        <r-cell
          title="使用单列"
          is-link
          @click="
            open({
              columns: [
                { text: '杭州', value: 'Hangzhou' },
                { text: '宁波', value: 'Ningbo' },
                { text: '温州', value: 'Wenzhou' },
                { text: '绍兴', value: 'Shaoxing' },
                { text: '湖州', value: 'Huzhou' },
              ],
              title: '使用单列',
            })
          "
        ></r-cell>
        <r-cell
          title="加载状态"
          is-link
          @click="
            open({
              columns: [
                { text: '杭州', value: 'Hangzhou' },
                { text: '宁波', value: 'Ningbo' },
                { text: '温州', value: 'Wenzhou' },
                { text: '绍兴', value: 'Shaoxing' },
                { text: '湖州', value: 'Huzhou' },
              ],
              loading: true,
              title: '加载状态',
            })
          "
        ></r-cell>
        <r-cell
          title="使用多列"
          is-link
          @click="
            open({
              columns: [
                // 第一列
                [
                  { text: '周一', value: 'Monday' },
                  { text: '周二', value: 'Tuesday' },
                  { text: '周三', value: 'Wednesday' },
                  { text: '周四', value: 'Thursday' },
                  { text: '周五', value: 'Friday' },
                ],
                // 第二列
                [
                  { text: '上午', value: 'Morning' },
                  { text: '下午', value: 'Afternoon' },
                  { text: '晚上', value: 'Evening' },
                ],
              ],

              title: '使用多列',
            })
          "
        ></r-cell>
        <r-cell
          title="使用级联"
          is-link
          @click="
            open({
              columns: region,
              columnsFieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
              },
              title: '使用级联',
            })
          "
        ></r-cell>
      </r-cell-group>
    </view>

    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-picker
          :show="show"
          :title="title"
          :columns="columns"
          :loading="loading"
          :columnsFieldNames="columnsFieldNames"
          v-model:value="pickerValues"
          @change="onChange"
          @confirm="confirm"
          @cancel="cancel"
        ></r-picker>
      </view>
    </r-popup>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";

import { region } from "@/uni_modules/r-region/js_sdk/region.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();

const columns = ref(region);
const loading = ref(false);
const title = ref("");
const pickerValues = ref([]);

const columnsFieldNames = ref({});
const show = ref(false);
const onChange = (e) => {
  console.log("e", e);
};
const confirm = (e) => {
  console.log("e", e);
  show.value = false;
};
const cancel = () => {
  show.value = false;
};

const open = (e) => {
  pickerValues.value = [];
  show.value = true;
  columns.value = e.columns || [];
  loading.value = e.loading || false;
  title.value = e.title || "";
  columnsFieldNames.value = e.columnsFieldNames;
};
</script>
