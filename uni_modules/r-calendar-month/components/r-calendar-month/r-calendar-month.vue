<template>
  <view
    :class="{
      'r-calendar__month': true,
    }"
    :style="{
		...getComponentThemeStyle,
		width:componentWidth
	}"
  >
    <!-- renderTitle -->
    <view
      v-if="showMonthTitle"
      :class="{
        'r-calendar__month-title': true,
      }"
    >
      <slot name="monthTitle" v-if="$slots.monthTitle"></slot>
    </view>
    <!-- renderDays -->
    <view
      :class="{
        'r-calendar__days': true,
      }"
    >
      <!-- renderMark -->
      <view
        v-if="showMark && shouldRender"
        :class="{
          'r-calendar__month-mark': true,
        }"
      >
        {{ dayjs(date).month() + 1 }}
      </view>
      <!-- renderDay v-for(renderList)-->
      <r-calendar-day
        v-for="(item, index) in renderList"
        :key="index"
        :index="index"
        :item="item"
        :color="color"
        :offset="offset"
        :rowHeight="rowHeight"
        :parentWidth="daysRect?.width || 0"
        @click="onClick"
        @clickDisabledDate="onClickDisabledDate"
      ></r-calendar-day>
    </view>
  </view>
</template>
<script setup>
import {
  inject,
  computed,
  ref,
  getCurrentInstance,
  onMounted,
  nextTick,
  watch,
} from "vue";
import {
  dayjs,
  CALENDAR_KEY,
  CONFIG_PROVIDER_KEY,
  compareDay,
  GetRect,
  _,
  getPrevDay,
  isFunction,
  getNextDay,
  POPUP_KEY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const { proxy } = getCurrentInstance();
const { uniqueId, findIndex } = _;
const emit = defineEmits(["click", "clickDisabledDate"]);
const props = defineProps({
  date: {
    type: [Number, Array, Object],
    default: 0,
  },
  componentWidth:{
	  type:String,
	  default:'100vw'
  },
  currentDate: {
    type: [Number, Array, Object],
    default: 0,
  },
  showMonthTitle: {
    type: Boolean,
    default: false,
  },
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  lazyRender: {
    type: Boolean,
    default: false,
  },
  maxDate: {
    type: Number,
    default: 0,
  },
  minDate: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: "single",
  },
  color: {
    type: String,
    default: "#1989fa",
  },
  showMark: {
    type: Boolean,
    default: false,
  },
  formatter: {
    type: Function,
    default: (e) => e,
  },
  rowHeight: {
    type: [String, Number],
    default: 64,
  },
  showSubtitle: {
    type: Boolean,
    default: false,
  },
  allowSameDay: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  //r-theme主题名称
  themeName: {
    type: String,
    default: "default",
  },
});
const onClick = (e) => {
  emit("click", e);
};
const onClickDisabledDate = (e) => emit("clickDisabledDate", e);

const componentsName = "r-calendar";
const componentsId = ref("");
const themeInject = inject(CONFIG_PROVIDER_KEY, {});
const index = computed(() => {
  let list = [];
  if (parentInject?.children?.value?.length) {
    list = parentInject?.children?.value;
  }
  return findIndex(list, (t) => t.id == componentsId.value);
});
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
const popupInject = inject(POPUP_KEY, {});
const parentInject = inject(CALENDAR_KEY, {});

const offset = computed(() => {
  const date = dayjs(props.date).date();
  const day = dayjs(props.date).day();
  const realDay = (day - (date % 7) + 8) % 7;

  if (props.firstDayOfWeek) {
    return (realDay + 7 - props.firstDayOfWeek) % 7;
  }

  return realDay;
});
const totalDay = computed(() => dayjs(props.date).endOf("month").date());

const getMultipleDayType = (day) => {
  const isSelected = (date) =>
    props.currentDate.some((item) => compareDay(item, date) === 0);

  if (isSelected(day)) {
    const prevDay = getPrevDay(day);
    const nextDay = getNextDay(day);
    const prevSelected = isSelected(prevDay);
    const nextSelected = isSelected(nextDay);

    if (prevSelected && nextSelected) {
      return "multiple-middle";
    }
    if (prevSelected) {
      return "end";
    }
    if (nextSelected) {
      return "start";
    }
    return "multiple-selected";
  }

  return "";
};
const getRangeDayType = (day) => {
  const [startDay, endDay] = props.currentDate;

  if (!startDay) {
    return "";
  }

  const compareToStart = compareDay(day, startDay);

  if (!endDay) {
    return compareToStart === 0 ? "start" : "";
  }

  const compareToEnd = compareDay(day, endDay);

  if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
    return "start-end";
  }
  if (compareToStart === 0) {
    return "start";
  }
  if (compareToEnd === 0) {
    return "end";
  }
  if (compareToStart > 0 && compareToEnd < 0) {
    return "middle";
  }

  return "";
};
const getDayType = (day) => {
  const { type, minDate, maxDate, currentDate } = props;

  if (
    (minDate && compareDay(day, minDate) < 0) ||
    (maxDate && compareDay(day, maxDate) > 0)
  ) {
    return "disabled";
  }

  if (currentDate === null) {
    return "";
  }

  if (Array.isArray(currentDate)) {
    if (type === "multiple") {
      return getMultipleDayType(day);
    }
    if (type === "range") {
      return getRangeDayType(day);
    }
  } else if (type === "single") {
    return compareDay(day, currentDate) === 0 ? "selected" : "";
  }

  return "";
};

const getBottomInfo = (dayType) => {
  if (props.type === "range") {
    if (dayType === "start") return "开始";
    if (dayType === "end") return "结束";
    if (dayType === "start-end") return `开始/结束`;
  }
};
const placeholders = computed(() => {
  const count = Math.ceil((totalDay.value + offset.value) / 7);
  return Array(count).fill({ type: "placeholder" });
});
const days = computed(() => {
  const days = [];
  const year = dayjs(props.date).year();
  const month = dayjs(props.date).month();

  for (let day = 1; day <= totalDay.value; day++) {
    const date = dayjs().year(year).month(month).date(day);
    const type = getDayType(date);

    let config = {
      date,
      type,
      text: day,
      bottomInfo: getBottomInfo(type),
    };

    if (props?.formatter && isFunction(props.formatter)) {
      config = props.formatter(config);
    }

    days.push(config);
  }

  return days;
});

const disabledDays = computed(() =>
  days.value.filter((day) => day.type === "disabled")
);

const shouldRender = computed(() => props.visible || !props.lazyRender);
const renderList = computed(() =>
  shouldRender.value ? days.value : placeholders.value
);
const daysRect = ref({});
const itemRect = ref({});

const setRect = async () => {
  try {
    await nextTick();
    daysRect.value = await GetRect(".r-calendar__days", proxy);
    await nextTick();
    itemRect.value = await GetRect(".r-calendar__month", proxy);

    componentsId.value = uniqueId(componentsName + "-");
    if (daysRect.value.width && itemRect.value.width) {
      if (parentInject) {
        parentInject.setChildren({
          id: componentsId.value,
          itemRect: itemRect.value,
          props: props,
          disabledDays: disabledDays.value,
        });
      }
    }
  } catch (error) {}
};

watch(
  () => [popupInject],
  async () => {
    if (
      popupInject?.value?.show &&
      daysRect?.value?.width == 0 &&
      itemRect?.value?.width == 0
    ) {
      setRect();
    }
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  setRect();
});
//
</script>
<style lang="scss" scoped>
.r-calendar {
	
  &__month-title {
    color: var(--r-text-color);
    height: var(--r-calendar-header-title-height);
    font-weight: var(--r-font-bold);
    line-height: var(--r-calendar-header-title-height);
    text-align: center;
  }

  &__month-title {
    font-size: var(--r-calendar-month-title-font-size);
  }
  &__month-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    color: var(--r-calendar-month-mark-color);
    font-size: var(--r-calendar-month-mark-font-size);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &__days {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    user-select: none;
  }
}
</style>
