<template>
  <r-form ref="formRef" :rules="rules" :value="formValue">
    <view
      class="r-form-edit"
      :style="{
        ...getComponentThemeStyle,
        gap,
      }"
    >
      <r-cell-group inset v-for="(arr, index) in formComp" :key="index">
        <template v-for="(m, n) in arr" :key="n">
          <r-field
            v-if="
              ['picker', 'calendar', 'datePicker'].includes(m.type) || !m.type
            "
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

          <r-field
            v-else
            :value="formValue[m.field]"
            :name="m.field"
            :label="m.label"
          >
            <template #input>
              <r-rate
                v-if="m.type == 'rate'"
                v-model:value="formValue[m.field]"
                :count="m?.rate?.count || 5"
                :size="m?.rate?.size || '40rpx'"
                :gutter="m?.rate?.gutter || '8rpx'"
                :delay="m?.rate?.delay || 0"
                :color="m?.rate?.color || '#ee0a24'"
                :voidColor="m?.rate?.voidColor || '#c8c9cc'"
                :disabledColor="m?.rate?.disabledColor || '#c8c9cc'"
                :icon="m?.rate?.icon || 'star'"
                :voidIcon="m?.rate?.voidIcon || 'star-o'"
                :iconPrefix="m?.rate?.iconPrefix || 'van-icon'"
                :allowHalf="m?.rate?.allowHalf"
                :clearable="m?.rate?.clearable"
                :readonly="m?.rate?.readonly"
                :disabled="m?.rate?.disabled"
                @change="(e) => onChange(e, m)"
              ></r-rate>

              <r-checkbox-group
                v-else-if="m.type == 'checkbox'"
                v-model:value="formValue[m.field]"
                :direction="m?.checkbox?.direction || 'horizontal'"
                :disabled="m?.checkbox?.disabled"
                :shape="m?.checkbox?.shape || 'square'"
                :iconSize="m?.checkbox?.iconSize || '40rpx'"
                :checkedColor="m?.checkbox?.checkedColor || '#1989fa'"
                @change="(e) => onChange(e, m)"
              >
                <template v-if="m.checkbox?.list?.length">
                  <r-checkbox
                    :name="item.value"
                    v-for="(item, index) in m.checkbox?.list"
                    :key="index"
                    >{{ item.label }}</r-checkbox
                  >
                </template>
              </r-checkbox-group>

              <r-radio-group
                v-else-if="m.type == 'radio'"
                v-model:value="formValue[m.field]"
                :direction="m?.radio?.direction || 'horizontal'"
                :disabled="m?.radio?.disabled"
                :shape="m?.radio?.shape || 'round'"
                :iconSize="m?.radio?.iconSize || '40rpx'"
                :checkedColor="m?.radio?.checkedColor || '#1989fa'"
                @change="(e) => onChange(e, m)"
              >
                <template v-if="m.radio?.list?.length">
                  <r-radio
                    :name="item.value"
                    v-for="(item, index) in m.radio?.list"
                    :key="index"
                  >
                    {{ item.label }}
                  </r-radio>
                  <!-- <r-radio name="2">单选框 2</r-radio> -->
                </template>
              </r-radio-group>

              <r-switch
                v-else-if="m.type == 'switch'"
                v-model:value="formValue[m.field]"
                :loading="m?.switch?.loading"
                :disabled="m?.switch?.disabled"
                :size="m?.switch?.size"
                :activeColor="m?.switch?.activeColor"
                :inactiveColor="m?.switch?.inactiveColor"
                :activeValue="m?.switch?.activeValue || true"
                :inactiveValue="m?.switch?.inactiveValue || false"
              />

              <slot
                v-else-if="m.type == 'slot'"
                :item="m"
                :value="formValue[m.field]"
              />
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

  <r-popup
    v-model:show="popupShow"
    position="bottom"
    :customStyle="{ '--r-padding-xs': 0 }"
  >
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
    />

    <r-calendar
      v-if="popupData.type == 'calendar'"
      :switch-mode="popupData?.calendar?.switchMode || 'none'"
      :type="popupData?.calendar?.type || 'single'"
      :color="popupData?.calendar?.color || '#1989fa'"
      :showConfirm="popupData?.calendar?.showConfirm || true"
      :confirmText="popupData?.calendar?.confirmText || '确定'"
      :confirmDisabledText="popupData?.calendar?.confirmDisabledText || '确定'"
      :firstDayOfWeek="popupData?.calendar?.firstDayOfWeek || 0"
      :defaultDate="getDefaultDate"
      @confirm="(data) => onCalendarConfirm(data, popupData)"
    />

    <r-date-picker
      v-if="popupData.type == 'datePicker'"
      :value="
        formValue[popupData.selectField]
          ? formValue[popupData.selectField].split(',').map((t) => Number(t))
          : []
      "
      :title="popupData?.datePicker?.title || ''"
      :loading="popupData?.datePicker?.loading"
      :formatter="popupData?.datePicker?.formatter || []"
      :columnsType="popupData?.datePicker?.columnsType || 'day'"
      :filter="popupData?.datePicker?.filter || []"
      :hideFields="popupData?.datePicker?.hideFields || []"
      @confirm="onDatePickerConfirm"
      @cancel="onDatePickerCancel"
    />
    <view
      style="width: 100%"
      :style="{
        height: safeBottom + 'px',
      }"
    ></view>
  </r-popup>
</template>
<script setup>
import {
  useComponentThemeStyle,
  _,
  dayjs,
  getSystemInfo,
} from "@/uni_modules/r-utils/js_sdk/index.js";

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

  btns: {
    type: Array,
    default: () => [],
  },
  themeName: {
    type: String,
    default: "default",
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

const getComponentThemeStyle = computed(() =>
  useComponentThemeStyle(props.themeName, "r-base")
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

//默认选中的时间
const getDefaultDate = computed(() => {
  const { calendar, selectField, type } = popupData.value;
  let data = formValue.value[selectField];

  if (data)
    if (["range", "multiple"].includes(calendar?.type))
      return data.split(",").map((t) => Number(t));
    else return Number(data);

  return null;
});

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
    formRef.value.validateField(item.field);
  }

  if (item.showSearch && value) {
    searchShow.value[item.field] = true;
  }
  emit("change", { value, item });
};

//点击输入框
const onClickInput = (item) => {
  if (["picker", "calendar", "datePicker"].includes(item.type)) {
    popupShow.value = true;
    popupData.value = item;
  }
};

//选中搜索框的数据
const onChoose = (cellItem, filedItem) => {
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

//点击选择器确认的事件
const onPickerConfirm = (data) => {
  const { selectedValues, selectedOptions, selectedIndexes } = data;
  formValue.value[popupData.value.field] = selectedOptions
    .map((t) => t.label)
    .join("/");
  formValue.value[popupData.value.selectField] = selectedValues.join(",");
  popupShow.value = false;
};

//点击日历确认按钮
const onCalendarConfirm = (data, item) => {
  const { calendar } = item;
  if (calendar?.type == "multiple") {
    formValue.value[popupData.value.field] = data
      .map((t) => dayjs(t).format("YYYY-MM-DD"))
      .join(",");

    formValue.value[popupData.value.selectField] = data
      .map((t) => dayjs(t).valueOf())
      .join(",");
  } else if (calendar?.type == "range") {
    formValue.value[popupData.value.field] = data
      .map((t) => dayjs(t).format("YYYY-MM-DD"))
      .join("~");

    formValue.value[popupData.value.selectField] = data
      .map((t) => dayjs(t).valueOf())
      .join(",");
  } else {
    formValue.value[popupData.value.field] = dayjs(data).format("YYYY-MM-DD");

    formValue.value[popupData.value.selectField] = dayjs(data).valueOf();
  }

  popupShow.value = false;
};

//点击picker取消按钮
const onPickerCancel = () => {
  popupShow.value = false;
};

//日期选择器确认按钮
const onDatePickerConfirm = (data) => {
  console.log("data", data, popupData.value);
  formValue.value[popupData.value.selectField] = data.selectedValues.join(",");

  formValue.value[popupData.value.field] = data.selectedOptions
    .map((t) => t.text)
    .join("/");

  popupShow.value = false;
};

//日期选择器取消按钮
const onDatePickerCancel = () => {
  onPickerCancel();
};
//点击右侧icon的事件
const onClickRightIcon = (m) => {
  if (m?.config?.onClickRightIcon) {
    m.config.onClickRightIcon(m);
  }
};

//安全底部距离
const safeBottom = ref(0);
const data = getSystemInfo();
safeBottom.value = data?.safeAreaInsets?.bottom;

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
