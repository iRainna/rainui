import { computed } from "vue";
import { baseData } from "./base";

export const stepsData = computed(() => ({
  "r-steps-background": baseData.value["r-background-2"],
}));
