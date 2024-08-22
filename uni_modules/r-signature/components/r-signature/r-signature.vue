<template>
  <view
    :class="{
      'r-signature': true,
    }"
    :style="getComponentThemeStyle"
  >
    <view
      :class="{
        'r-signature__content': true,
      }"
    >
      <canvas
        class="canvas"
        :canvas-id="componentsId"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      ></canvas>
    </view>
    <view
      :class="{
        'r-signature__footer': true,
      }"
    >
      <r-button
        :customStyle="{
          padding: `0 var(--r-padding-md)`,
          marginTop: `var(--r-padding-xs)`,
          marginLeft: `var(--r-padding-xs)`,
        }"
        size="small"
        @click="clear"
        >{{ clearButtonText }}</r-button
      >
      <r-button
        :customStyle="{
          padding: `0 var(--r-padding-md)`,
          marginTop: `var(--r-padding-xs)`,
          marginLeft: `var(--r-padding-xs)`,
        }"
        type="primary"
        size="small"
        @click="submit"
        >{{ confirmButtonText }}</r-button
      >
    </view>
  </view>
</template>
<script setup>
import {
  CONFIG_PROVIDER_KEY,
  _,
  getSystemInfo,
  GetRect,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import {
  inject,
  computed,
  ref,
  onMounted,
  getCurrentInstance,
  nextTick,
} from "vue";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const { uniqueId } = _;
const emit = defineEmits(["start", "signing", "end", "submit", "clear"]);
const props = defineProps({
  type: {
    type: String,
    default: "png",
  },
  penColor: {
    type: String,
    default: "#000",
  },
  lineWidth: {
    type: Number,
    default: 3,
  },
  backgroundColor: {
    type: String,
  },
  clearButtonText: {
    type: String,
    default: "清空",
  },
  confirmButtonText: {
    type: String,
    default: "确认",
  },
  themeName: {
    type: [String],
    default: "default",
  },
});
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const isEmpty = ref(true);

const moveStartX = ref(0);
const moveStartY = ref(0);
const canvasRect = ref({});

const componentsName = "r-signature";
const componentsId = ref(uniqueId(componentsName + "-"));

const ctx = computed(() => {
  try {
    return uni.createCanvasContext(componentsId.value, proxy);
  } catch (error) {
    return null;
  }
});

const themeInject = inject(CONFIG_PROVIDER_KEY, {});

const getComponentThemeStyle = computed(() => {
  let themeName = props.themeName;

  if (themeInject?.value?.themeName) {
    //传递过来的有就用传递了
    themeName = themeInject?.value?.themeName;
  }
  if (props.themeName != "default") {
    //单独设置了组件的 就用单独设置的
    themeName = props.themeName;
  }

  return {
    ...getComponentThemeCssVar(themeName, "r-base"),
    ...getComponentThemeCssVar(themeName, componentsName),
  };
});
const setCanvasBgColor = (ctx) => {
  if (ctx && props.backgroundColor) {
    ctx.fillStyle = props.backgroundColor;
    ctx.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
    ctx.draw();
  }
};
const initialize = async () => {
  try {
    await nextTick();
    const canvas = await GetRect(".canvas", proxy);
    canvasRect.value = canvas;

    canvasWidth.value = canvas.width;

    canvasHeight.value = canvas.height;

    setCanvasBgColor(ctx.value);
  } catch (error) {}
};
const touchStart = async (event) => {
  event.preventDefault();
  isEmpty.value = false;
  ctx.value.beginPath();

  ctx.value.lineWidth = props.lineWidth;
  ctx.value.strokeStyle = props.penColor;

  const touch = event.changedTouches[0];
  moveStartX.value = touch.x;
  moveStartY.value = touch.y;

  emit("start");
};

const touchMove = (event) => {
  try {
    event.preventDefault();

    const touch = event.changedTouches[0];
    const mouseX = touch.x;

    const mouseY = touch.y;
    ctx.value.moveTo(moveStartX.value, moveStartY.value);
    ctx.value.lineTo(mouseX, mouseY);
    ctx.value.setLineCap("round");
    ctx.value.setLineJoin("round");
    ctx.value.stroke();
    ctx.value.draw(true);
    moveStartX.value = mouseX;
    moveStartY.value = mouseY;
  } catch (error) {
    console.log("e", error);
  }

  emit("signing", event);
};
const touchEnd = (event) => {
  event.preventDefault();

  emit("end");
};
const clear = () => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  ctx.value.closePath();
  ctx.value.draw(true);
  setCanvasBgColor(ctx.value);

  isEmpty.value = true;
  emit("clear");
};
const submit = () => {
  if (isEmpty.value) {
    emit("submit", {
      image: "",
      canvas: canvasRect.value,
    });
  } else {
    uni.canvasToTempFilePath(
      {
        canvasId: componentsId.value,
        fileType: props.type,
        success: (res) => {
          console.log("res", res);
          emit("submit", {
            image: res.tempFilePath,
            canvas: canvasRect.value,
          });
        },
      },
      proxy
    );
  }
};
defineExpose({
  clear,
  submit,
});
onMounted(() => {
  initialize();
});
</script>
<style lang="scss" scoped>
.r-signature {
  padding: var(--r-signature-padding);

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--r-signature-content-height);
    background-color: var(--r-signature-content-background);
    border: var(--r-signature-content-border);
    border-radius: var(--r-radius-lg);
    overflow: hidden;

    canvas {
      width: 100%;
      height: 100%;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
