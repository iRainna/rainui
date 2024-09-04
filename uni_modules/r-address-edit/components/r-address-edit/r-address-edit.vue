<template>
  <view
    :style="getComponentThemeStyle"
    :class="{
      'r-address-edit': true,
    }"
  >
    <r-form ref="formRef" :rules="rules" :value="form">
      <r-cell-group inset>
        <r-field
          v-model:value="form[fromCustomField.name.field]"
          :name="fromCustomField.name.field"
          :label="fromCustomField.name.label"
          :placeholder="fromCustomField.name.label"
          @change="validateField(fromCustomField.name.field)"
        ></r-field>

        <r-field
          v-model:value="form[fromCustomField.tel.field]"
          :name="fromCustomField.tel.field"
          :label="fromCustomField.tel.label"
          :placeholder="fromCustomField.tel.label"
          @change="validateField(fromCustomField.tel.field)"
        ></r-field>

        <r-field
          :value="form[fromCustomField.areaCode.field]"
          :name="fromCustomField.areaCode.field"
          :label="fromCustomField.areaCode.label"
          :placeholder="fromCustomField.areaCode.label"
          @change="validateField(fromCustomField.areaCode.field)"
          isLink
          readonly
          clearable
          @click-input="open"
        >
        </r-field>

        <r-field
          v-model:value="form[fromCustomField.addressDetail.field]"
          :name="fromCustomField.addressDetail.field"
          :label="fromCustomField.addressDetail.label"
          :placeholder="fromCustomField.addressDetail.label"
          @change="validateField(fromCustomField.addressDetail.field)"
        ></r-field>
      </r-cell-group>

      <r-cell-group> </r-cell-group>
    </r-form>
  </view>

  <r-popup v-model:show="pickerData.show" position="bottom">
    <view style="width: 100%">
      <r-picker
        :title="pickerData.title"
        :columns="pickerData.columns"
        :loading="false"
        :columnsFieldNames="pickerData.columnsFieldNames"
        v-model:value="pickerData.pickerValues"
        @change="onChange"
        @confirm="confirm"
        @cancel="cancel"
      ></r-picker>
    </view>
  </r-popup>
</template>
<script setup>
import {
  useComponentThemeStyle,
  _,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { ref, computed } from "vue";
const { reduce } = _;
const props = defineProps({
  fromCustomField: {
    type: Object,
    default: () => ({
      name: {
        field: "name",
        label: "姓名",
      },
      tel: {
        field: "tel",
        label: "电话",
      },
      areaCode: {
        field: "areaCode",
        label: "地区",
      },
      addressDetail: {
        field: "addressDetail",
        label: "详细地址",
      },
      isDefault: {
        field: "isDefault",
        label: "设为默认收货地址",
      },
    }),
  },
  rulesMessage: {
    type: Object,
    default: () => ({
      name: "请填写姓名",
      tel: "请填写正确的电话",
      areaCode: "请选择地区",
      addressDetail: "请填写详细地址",
    }),
  },
  columns: {
    type: Array,
    default: () => [],
  },
  columnsFieldNames: {
    type: Object,
    default: () => ({
      text: "text",
      value: "value",
      children: "children",
    }),
  },
});
const form = ref(
  (() => {
    const keys = Object.keys(props.fromCustomField);

    return reduce(
      keys.map((t) => props.fromCustomField[t]),
      (s, n) => {
        s[n.field] = null;
        return s;
      },
      {}
    );
  })()
);

const formRef = ref(null);

const pickerData = ref({
  show: false,
  title: "",
  columns: [],
  columnsFieldNames: [],
  pickerValues: [],
});

const componentsName = "r-address-edit";
const getComponentThemeStyle = computed(() =>
  useComponentThemeStyle(props.themeName, componentsName)
);

const rules = ref(
  (() => {
    const keys = Object.keys(props.fromCustomField);
    console.log(
      "rrrr",
      reduce(
        keys
          .filter((m) => m != "isDefault")
          .map((t) => props.fromCustomField[t]),
        (s, n) => {
          s[n.field] = [
            {
              required: true,
              message: props.rulesMessage[n.field],
            },
          ];
          return s;
        },
        {}
      )
    );
    return reduce(
      keys.filter((m) => m != "isDefault").map((t) => props.fromCustomField[t]),
      (s, n) => {
        s[n.field] = {
          required: true,
          message: props.rulesMessage[n.field],
        };
        return s;
      },
      {}
    );
  })()
);

const validateField = (name) => {
  formRef.value
    .validateField(name)
    .then((req) => {
      console.log("req", req);
    })
    .catch((e) => {
      console.log("e", e);
    });
};
const open = () => {
  console.log("clickInput", pickerData.value);
  pickerData.value.show = true;
  pickerData.value.title = "";
  pickerData.value.columns = props.columns;
  pickerData.value.columnsFieldNames = props.columnsFieldNames;
};
const onChange = (e) => {};
const confirm = (e) => {};
const cancel = (e) => {};
</script>
<style lang="scss" scoped>
.r-address-edit {
  padding: var(--r-address-edit-padding);

  &__fields {
    overflow: hidden;
    border-radius: var(--r-padding-xs);

    .r-field__label {
      width: 4.1em;
    }
  }

  &__default {
    margin-top: var(--r-padding-sm);
    overflow: hidden;
    border-radius: var(--r-padding-xs);
  }

  &__buttons {
    padding: var(--r-address-edit-buttons-padding);
  }

  &__button {
    margin-bottom: var(--r-address-edit-button-margin-bottom);
    font-size: var(--r-address-edit-button-font-size);
  }

  &-detail__search-item {
    background: var(--r-gray-2);
  }
}
</style>
