import { ref } from "vue";
import { isObject } from "@/uni_modules/r-utils/js_sdk/index.js";
export default function (toastRef) {
  // 展示提示
  const showToast = (value) => {
    closeToast();
    if (isObject(value)) {
      toastRef.value.setData({
        ...value,
        type: "text",
      });
    } else {
      toastRef.value.setData({
        message: value,
      });
    }

    return toastRef;
  };
  // 展示加载提示
  const showLoadingToast = (value) => {
    closeToast();
    if (isObject(value)) {
      toastRef.value.setData({
        ...value,
        type: "loading",
      });
    } else {
      toastRef.value.setData({
        message: value,
        type: "loading",
      });
    }

    return toastRef;
  };
  // 展示成功提示
  const showSuccessToast = (value) => {
    closeToast();
    if (isObject(value)) {
      toastRef.value.setData({
        ...value,
        type: "success",
      });
    } else {
      toastRef.value.setData({
        message: value,
        type: "success",
      });
    }
  };
  // 展示失败提示
  const showFailToast = (value) => {
    closeToast();
    if (isObject(value)) {
      toastRef.value.setData({
        ...value,
        type: "fail",
      });
    } else {
      toastRef.value.setData({
        message: value,
        type: "fail",
      });
    }
  };
  //关闭提示
  const closeToast = () => {
    console.log("toastRef", toastRef);
    toastRef.value.changeShow(false);
  };
  return {
    showToast,
    showLoadingToast,
    showSuccessToast,
    showFailToast,
    closeToast,
  };
}
