import defaultData from "@/uni_modules/r-theme-base/js_sdk/baseCssVar.js";
import { ref } from "vue";

const files = import.meta.glob("./modules/*.js", { eager: true });

const datas = ref(
  (() => ({
    ...defaultData.value,
    ...Object.keys(files).reduce(
      (pre, key) => ({ ...pre, ...files[key].default?.value }),
      []
    ),
  }))()
);

export default datas;
