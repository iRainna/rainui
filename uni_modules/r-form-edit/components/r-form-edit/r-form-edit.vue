<template>
  <r-form ref="formRef" :rules="rules" :value="formValue">
    <view
      class="r-form-edit"
      :style="{
        gap,
      }"
    >
      <r-cell-group inset v-for="(arr, index) in formComp" :key="index">
        <template v-for="(m, n) in arr" :key="n">
          <r-field
            v-model:value="formValue[m.field]"
            :name="m.field"
            :label="m.label"
            :placeholder="m.placeholder || m.label || ''"
            :maxlength="m?.config?.maxlength || 140"
            :type="m?.config?.type || 'text'"
            :isLink="m?.config?.isLink || false"
            :readonly="m?.config?.readonly || false"
            :clearable="m?.config?.clearable || false"
            :left-icon="m?.config?.leftIcon || null"
            :rigth-icon="m?.config?.rigthIcon || null"
            @clickInput="onClickInput(m)"
            @change="(e) => onChange(e, m)"
            @focus="onFocus(m)"
            @blur="onBlur(m)"
          >
            <template
              #button
              v-if="
                m?.button?.name || m?.config?.rigthIcon || m?.config?.clearable
              "
            >
              <r-button
                :size="m?.button?.size || 'mini'"
                :disabled="m?.button?.disabled || false"
                :type="m?.button?.type || 'primary'"
                @click="onClickButton(m)"
                style="display: flex"
                v-if="m?.button?.name"
                >{{ m.button.name }}</r-button
              >

              <r-icon
                :name="m.config.rigthIcon"
                :size="m?.config?.iconSize || '32rpx'"
                v-if="m?.config?.rigthIcon"
                @click="onClickRightIcon(m)"
              ></r-icon>
            </template>
          </r-field>
          <view
            v-if="
              m.showSearch &&
              m?.cell?.list?.length &&
              searchShow[m.field] &&
              focusKeys == m.field
            "
            class="r-form-edit__search-item"
          >
            <view class="r-form-edit__search-item-close">
              <r-icon
                name="close"
                size="36rpx"
                @click="searchShow[m.field] = false"
              />
            </view>

            <r-cell
              v-for="(item, index) in getCellList(m)"
              :key="index"
              :title="item.title"
              :label="item.label"
              :value="item.value"
              :icon="item.icon"
              :iconPrefix="item.iconPrefix"
              :customStyle="{
                '--r-cell-background': 'var(--r-gray-2)',
              }"
              @click="onChoose(item, m)"
            ></r-cell>
          </view>
        </template>
      </r-cell-group>
      <view
        class="r-form-edit__btns"
        :style="{
          gap,
        }"
      >
        <r-button
          :block="m.block"
          :round="m.round"
          :type="m.type"
          v-for="(m, n) in btns"
          :key="n"
          @click="onClickBottomBtn(m)"
          >{{ m.text }}</r-button
        >
      </view>
    </view>
  </r-form>

  <r-popup v-model:show="popupShow" position="bottom">
    <r-picker
      v-if="popupData.type == 'picker'"
      :title="popupData?.picker?.title || ''"
      :columns="popupData?.picker?.columns || []"
      :loading="popupData?.picker?.loading || false"
      :columnsFieldNames="
        popupData?.picker?.columnsFieldNames || {
          text: 'text',
          value: 'value',
          children: 'children',
        }
      "
      :value="
        formValue[popupData.selectField]
          ? formValue[popupData.selectField].split(',')
          : []
      "
      @confirm="onPickerConfirm"
      @cancel="onPickerCancel"
    ></r-picker>
  </r-popup>
</template>
<script setup>
import {
  useComponentThemeStyle,
  _,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { split } from "postcss/lib/list";
import { ref, computed, watch } from "vue";
const { reduce } = _;
const props = defineProps({
  form: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: Object,
    default: () => {},
  },
  gap: {
    type: [String],
    default: "24rpx",
  },
  confirm: {
    type: [String],
    default: "提交",
  },
  cancelText: {
    type: String,
    default: "取消",
  },
  btns: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits([
  "clickButton",
  "change",
  "update:value",
  "focus",
  "blur",
]);
//弹出层显示
const popupShow = ref(false);
//弹出层数据
const popupData = ref({});
//表单显示对象
const formComp = computed(() => {
  if (Array.isArray(props.form) && props.form?.every((m) => Array.isArray(m)))
    return props.form;
  return [props.form];
});
const componentsName = "r-address-edit";
const getComponentThemeStyle = computed(() =>
  useComponentThemeStyle(props.themeName, componentsName)
);
//表单数据
const formValue = computed({
  get: () => props.value,
  set: (v) => emit("update:value", v),
});
//表单示例
const formRef = ref(null);
//搜索列表显示对象
const searchShow = ref({});
//聚焦字段
const focusKeys = ref("");
//获取搜索列表数据
const getCellList = (m) => {
  let list = [];
  if (
    m.showSearch &&
    m?.cell?.list?.length &&
    searchShow.value[m.field] &&
    focusKeys.value == m.field
  ) {
    list = m?.cell?.list || [];
  }
  return list;
};
//聚焦事件
const onFocus = (item) => {
  focusKeys.value = item.field;
  let keys = Object.keys(searchShow.value);
  keys.map((t) => {
    if (t == item.field) {
      searchShow.value[t] = true;
    } else {
      searchShow.value[t] = false;
    }
  });
  emit("focus", item);
};
//失焦事件
const onBlur = (item) => emit("blur", item);

//输入框数据改变的事件
const onChange = (value, item) => {
  formValue.value[item.field] = value;
  //校验
  const keys = Object.keys(props.rules);
  if (keys.includes(item.field)) {
    formRef.value
      .validateField(item.field)
      .then((req) => {
        console.log("req", req);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  if (item.showSearch && value) {
    searchShow.value[item.field] = true;
  }
  emit("change", { value, item });
};
//点击输入框
const onClickInput = (item) => {
  console.log("e", item);
  if (["picker"].includes(item.type)) {
    popupShow.value = true;
    popupData.value = item;
  }
};
//选中搜索框的数据
const onChoose = (cellItem, filedItem) => {
  console.log("ce", cellItem, filedItem);
  onChange(cellItem.label || cellItem.title, filedItem);
  searchShow.value[filedItem.field] = false;
};
//点击输入框内部右侧按钮
const onClickButton = (m) => {
  emit("clickButton", m);
};
//点击底部按钮
const onClickBottomBtn = (m) => {
  if (m.onClick) m.onClick(m);
};
const onPickerConfirm = (data) => {
  const { selectedValues, selectedOptions, selectedIndexes } = data;
  formValue.value[popupData.value.field] = selectedOptions
    .map((t) => t.label)
    .join("/");
  formValue.value[popupData.value.selectField] = selectedValues.join(",");
  popupShow.value = false;
};
//点击picker取消按钮
const onPickerCancel = () => {
  popupShow.value = false;
};
//点击右侧icon的事件
const onClickRightIcon = (m) => {
  if (m?.config?.onClickRightIcon) {
    m.config.onClickRightIcon(m);
  }
};
//表单校验的方法
const validate = async () => await formRef.value.validate();
const validateField = async (name) => await formRef.value.validateField(name);
const clearValidate = async () => await formRef.value.clearValidate();
const clearValidateField = async (name) =>
  await formRef.value.clearValidateField(name);
const resetFields = async (name) => await formRef.value.resetFields(name);
const resetForm = async () => await formRef.value.resetForm();

defineExpose({
  validate,
  validateField,
  clearValidate,
  clearValidateField,
  resetFields,
  resetForm,
});
</script>
<style lang="scss" scoped>
.r-form-edit {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--r-padding-xs) 0;
  &__btns {
    padding: var(--r-padding-md);
    display: flex;
    flex-direction: column;
  }
  &__search-item {
    position: relative;
    &-close {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      z-index: 2;
    }
  }
}
</style>
