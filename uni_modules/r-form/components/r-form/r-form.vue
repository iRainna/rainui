<template>
  <form class="r-form">
    <slot />
  </form>
</template>

<script setup>
import {
  FORM_KEY,
  CELL_GROUP_KEY,
  _,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import FormProps from "./props.js";
import {
  provide,
  defineProps,
  ref,
  watch,
  defineEmits,
  defineExpose,
} from "vue";
const emit = defineEmits(["submit"]);
const props = defineProps({ ...FormProps });
// const validate = new Schema(props.rules);
//校验的list
const validateList = ref([]);
const addRowInValidate = (i) => {
  validateList.value = [...validateList.value, i];
};
//错误
const errorData = ref({
  errors: [],
  fields: {},
});

provide(FORM_KEY, {
  addRowInValidate,
  errorData,
  ...props,
});

const { cloneDeep, uniqWith, isEqual } = _;
const children = ref([]);
const setChildren = (v) => {
  const arr = cloneDeep([...children.value, v]);
  children.value = uniqWith(arr, isEqual);
};

provide(CELL_GROUP_KEY, {
  children,
  setChildren,
});

const validate = async () => {
  let flag = true;
  for (let i of validateList.value) {
    try {
      await validateField(i.name);
    } catch (error) {
      const { errors, fields } = error;
      errorData.value = {
        errors: [
          ...new Set(
            [...errorData.value.errors, ...errors].map((i) => JSON.stringify(i))
          ),
        ].map((i) => JSON.parse(i)),
        fields: { ...errorData.value.fields, ...fields },
      };
      // [...errors.value, error];
      flag = false;
    }
  }

  return flag;
};
const validateField = (field) =>
  new Promise((resolve, reject) => {
    if (validateList.value.filter((i) => i.name == field).length)
      validateList.value
        .filter((i) => i.name == field)[0]
        .validate()
        .then((req) => {
          resolve(req);
        })
        .catch((err) => {
          reject(err);
        });
  });
const clearValidateField = (field) => {
  const { errors, fields } = errorData.value;
  delete fields[field];
  errorData.value = {
    errors: errors.filter((i) => i.field != field),
    fields,
  };

  validateList.value.filter((i) => i.name == field)[0].clearValidate();
};

const clearValidate = () => {
  for (let i of validateList.value) {
    clearValidateField(i.name);
  }
};
const resetFields = (field) => {
  const { errors, fields } = errorData.value;
  delete fields[field];
  errorData.value = {
    errors: errors.filter((i) => i.field != field),
    fields,
  };

  validateList.value.filter((i) => i.name == field)[0].resetFields();
};

const resetForm = () => {
  for (let i of validateList.value) {
    resetFields(i.name);
  }
};

watch(
  () => validateList.value,
  () => {},
  { deep: true }
);

defineExpose({
  validate,
  validateField,
  clearValidate,
  clearValidateField,
  resetForm,
  resetFields,
});
</script>
