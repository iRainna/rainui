<template>
  <r-config-provider :themeName="themeName">
    <page-header title="级联选择"></page-header>
    <view style="padding: 20rpx">
      <r-divider content-position="left">基础使用</r-divider>
      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value1.text"
          @click="
            open({
              field: 'value1',
              options: [
                {
                  text: '浙江省',
                  value: '330000',
                  children: [{ text: '杭州市', value: '330100' }],
                },
                {
                  text: '江苏省',
                  value: '320000',
                  children: [{ text: '南京市', value: '320100' }],
                },
              ],
              fieldNames: {
                text: 'text',
                value: 'value',
                children: 'children',
              },
              activeColor: '#1989fa',
            })
          "
          is-link
        />
      </r-cell-group>

      <r-divider content-position="left">省市区数据</r-divider>
      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value2?.text"
          @click="
            open({
              field: 'value2',
              options: region,
              fieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
              },
              activeColor: '#1989fa',
            })
          "
          is-link
        />
      </r-cell-group>

      <r-divider content-position="left">自定义颜色</r-divider>
      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value3?.text"
          @click="
            open({
              field: 'value3',
              options: [
                {
                  text: '浙江省',
                  value: '330000',
                  children: [{ text: '杭州市', value: '330100' }],
                },
                {
                  text: '江苏省',
                  value: '320000',
                  children: [{ text: '南京市', value: '320100' }],
                },
              ],
              fieldNames: {
                text: 'text',
                value: 'value',
                children: 'children',
              },
              activeColor: '#ee0a24',
            })
          "
          is-link
        />
      </r-cell-group>

      <r-divider content-position="left">自定义选项上方内容</r-divider>

      <r-cell-group>
        <r-cell
          title="地区"
          :value="data.value4?.text"
          @click="
            open({
              field: 'value4',
              options: region,
              fieldNames: {
                text: 'label',
                value: 'value',
                children: 'children',
              },
              activeColor: '#1989fa',
            })
          "
          is-link
        />
      </r-cell-group>
    </view>

    <r-popup v-model:show="show" round position="bottom">
      <r-cascader
        :show="show"
        v-model:value="data[changeField].value"
        title="请选择所在地区"
        :options="options"
        :field-names="fieldNames"
        :active-color="activeColor"
        @close="onClose"
        @finish="onFinish"
      >
        <template #optionsTop="{ tabIndex }" v-if="changeField == 'value4'">
          <view class="current-level">当前为第 {{ tabIndex + 1 }} 级</view>
        </template>
      </r-cascader>
    </r-popup>
  </r-config-provider>
</template>

<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
import { region } from "@/uni_modules/r-region/js_sdk/region.js";
const { themeName } = useTheme();
const show = ref(false);
const options = ref([]);
const activeColor = ref("");
const changeField = ref("value1");
const fieldNames = ref({});
const data = ref({
  value1: {
    value: "",
    text: "请选择",
  },
  value2: {
    value: "",
    text: "请选择",
  },
  value3: {
    value: "",
    text: "请选择",
  },
  value4: {
    value: "",
    text: "请选择",
  },
});

const onFinish = ({ selectedOptions }) => {
  show.value = false;

  data.value[changeField.value].text = selectedOptions
    .map((option) => option[fieldNames.value.text])
    .join("/");
};

const open = (o) => {
  changeField.value = o.field;
  options.value = o.options;
  fieldNames.value = o.fieldNames;
  activeColor.value = o.activeColor;
  show.value = true;
};

const onClose = () => {
  show.value = false;
};
</script>
