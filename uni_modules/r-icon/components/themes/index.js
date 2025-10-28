import { ref } from "vue";
import baseData from "./theme/default/modules/base";

const files = import.meta.glob("./theme/*/index.js", { eager: true });
export const datas = ref(
  (() =>
    Object.keys(files).reduce(
      (pre, key) => ({ ...pre, [key]: files[key].default?.value }),
      []
    ))()
);

