<template>
  <r-config-provider :themeName="themeName">
    <page-header title="日期选择"></page-header>
    <view style="padding: 20rpx 0">
      <r-cell-group inset>
        <r-cell
          title="基本使用"
          is-link
          @click="
            open({
              title: '基本使用',
            })
          "
        ></r-cell>

        <r-cell
          title="加载中"
          is-link
          @click="
            open({
              title: '加载中',
              loading: true,
            })
          "
        ></r-cell>

        <r-cell
          title="使用年"
          is-link
          @click="
            open({
              title: '使用年',
              columnsType: 'year',
            })
          "
        ></r-cell>
        <r-cell
          title="使用年月"
          is-link
          @click="
            open({
              title: '使用年月',
              columnsType: 'month',
            })
          "
        ></r-cell>

        <r-cell
          title="使用时间到秒"
          is-link
          @click="
            open({
              title: '使用时间到秒',
              columnsType: 'second',
            })
          "
        ></r-cell>

        <r-cell
          title="格式化"
          is-link
          @click="
            open({
              title: '格式化',
              formatter: [
                {
                  type: 'year',
                  fn: (e) => {
                    e.item[e.fields.text] = e.item[e.fields.text] + '年';
                    return e.item;
                  },
                },
                {
                  type: 'month',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '月';
                    // console.log(&quot;e&quot;, e);
                    return e.item;
                  },
                },
                {
                  type: 'day',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '日';
                    return e.item;
                  },
                },

                {
                  type: 'hour',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '时';
                    return e.item;
                  },
                },

                {
                  type: 'minute',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '分';
                    return e.item;
                  },
                },
                {
                  type: 'second',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '秒';
                    return e.item;
                  },
                },
              ],
            })
          "
        ></r-cell>

        <r-cell
          title="使用过滤"
          is-link
          @click="
            open({
              title: '使用过滤',
              filter: [
                {
                  type: 'year',
                  fn: (e) => {
                    return e.item[e.fields.value] >= dayjs().year();
                  },
                },
                {
                  type: 'month',
                  fn: (e) => {
                    return e.item[e.fields.value] % 2;
                  },
                },
              ],
            })
          "
        ></r-cell>

        <r-cell
          title="使用时分秒且格式化"
          is-link
          @click="
            open({
              title: '使用时分秒且格式化',
              columnsType: 'second',
              formatter: [
                {
                  type: 'year',
                  fn: (e) => {
                    e.item[e.fields.text] = e.item[e.fields.text] + '年';
                    return e.item;
                  },
                },
                {
                  type: 'month',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '月';
                    // console.log(&quot;e&quot;, e);
                    return e.item;
                  },
                },
                {
                  type: 'day',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '日';
                    return e.item;
                  },
                },

                {
                  type: 'hour',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '时';
                    return e.item;
                  },
                },

                {
                  type: 'minute',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '分';
                    return e.item;
                  },
                },
                {
                  type: 'second',
                  fn: (e) => {
                    e.item[e.fields.text] =
                      (e.item[e.fields.text] < 10
                        ? '0' + e.item[e.fields.text]
                        : e.item[e.fields.text]) + '秒';
                    return e.item;
                  },
                },
              ],
              filter: [
                {
                  type: 'year',
                  fn: (e) => {
                    return e.item[e.fields.value] >= dayjs().year();
                  },
                },
                {
                  type: 'month',
                  fn: (e) => {
                    return e.item[e.fields.value] % 2;
                  },
                },
              ],
              hideFields: ['year', 'month', 'day'],
            })
          "
        ></r-cell>
      </r-cell-group>
    </view>

    <r-popup v-model:show="show" position="bottom">
      <view style="width: 100%">
        <r-date-picker
          v-model:value="currentDate"
          :title="title"
          :loading="loading"
          :formatter="formatter"
          :columnsType="columnsType"
          :filter="filter"
          :hideFields="hideFields"
          @change="change"
          @confirm="confirm"
          @cancel="cancel"
        />
      </view>
    </r-popup>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import { _, dayjs } from "@/uni_modules/r-utils/js_sdk/index.js";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();

const currentDate = ref([]);
const title = ref("");
const loading = ref(false);
const columnsType = ref("day");
const show = ref(false);
const formatter = ref([]);
const hideFields = ref([]);
const filter = ref([]);

const open = (e) => {
  show.value = true;
  title.value = e.title || "";
  loading.value = e.loading || false;
  columnsType.value = e.columnsType || "day";
  formatter.value = e.formatter || [];
  filter.value = e.filter || [];
  hideFields.value = e.hideFields || [];
};
const change = (e) => {
  console.log("e", e);
};
const confirm = (e) => {
  console.log("e", e);
  show.value = false;
};
const cancel = () => {
  show.value = false;
};
</script>
