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
const { uniqueId, debounce } = _;
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
const canvasRect = ref({});
const devicePixelRatio = computed(() => {
  const data = getSystemInfo();
  return data?.devicePixelRatio || 1;
});
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
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.draw();
  }
};
const initialize = async () => {
  try {
    await nextTick();
    const canvas = await GetRect(".canvas", proxy);
    const wrap = await GetRect(".r-signature__content", proxy);

    canvasWidth.value = canvas.width =
      (wrap.width || 0) * devicePixelRatio.value;

    canvasHeight = canvas.height = (wrap.height || 0) * devicePixelRatio.value;
    ctx.value?.scale(devicePixelRatio.value, devicePixelRatio.value);

    setCanvasBgColor(ctx.value);
  } catch (error) {}
};
const touchStart = async () => {
  isEmpty.value = false;
  ctx.value.beginPath();

  ctx.value.beginPath();
  ctx.value.lineWidth = props.lineWidth;
  ctx.value.strokeStyle = props.penColor;

  canvasRect.value = await GetRect(".canvas", proxy);
  console.log("ctx", ctx.value);
  emit("start");
};
const draw = debounce(() => {
  ctx.value.draw(true);
}, 20);
const touchMove = (event) => {
  try {
    event.preventDefault();
    const touch = event.touches[0];
    const mouseX = touch.clientX - (canvasRect.value?.left || 0);
    const mouseY = touch.clientY - (canvasRect.value?.top || 0);

    ctx.value.setLineCap("round");
    ctx.value.setLineJoin("round");
    ctx.value.lineTo(mouseX, mouseY);
    ctx.value.stroke();
    console.log("ctx", ctx.value);
    draw();
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
  setCanvasBgColor(ctx.value);
  ctx.value.draw();

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

  // emit("submit", {
  //   image,
  // });
};
defineExpose({
  clear,
  submit,
});
onMounted(() => {
  console.log("ctx", ctx);
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
