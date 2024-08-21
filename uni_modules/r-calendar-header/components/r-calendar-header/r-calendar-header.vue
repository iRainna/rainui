<template>
  <view
    :class="{
      'r-calendar__header': true,
    }"
    :style="getComponentThemeStyle"
  >
    <!-- renderTitle -->
    <view
      v-if="showSubtitle"
      :class="{
        'r-calendar__header-title': true,
      }"
    >
      <slot name="title"></slot>
    </view>
    <!-- renderSubtitle -->
    <view
      v-if="showSubtitle"
      :class="{
        'r-calendar__header-subtitle': true,
        'r-calendar__header-subtitle--with-swicth': switchMode !== 'none',
      }"
      @click="onClickSubtitle"
    >
      <template v-if="switchMode !== 'none'">
        <!-- renderAction ==> [YearAction, MonthAction] -->
        <!-- YearAction -->
        <view
          v-if="switchMode === 'year-month'"
          :class="{
            'r-calendar__header-action': true,
            'r-calendar__header-action--disabled': prevYearDisabled,
          }"
          @click="prevYearDisabled ? undefined : onYearChange(false)"
        >
          <slot
            name="prevYear"
            v-if="$slots.prevYear"
            :disabled="prevYearDisabled"
          ></slot>
        </view>
        <!-- MonthAction -->
        <view
          :class="{
            'r-calendar__header-action': true,
            'r-calendar__header-action--disabled': prevMonthDisabled,
          }"
          @click="prevMonthDisabled ? undefined : onMonthChange(false)"
        >
          <slot
            name="prevMonth"
            v-if="$slots.prevMonth"
            :disabled="prevMonthDisabled"
          ></slot>
        </view>

        <view
          :class="{
            'r-calendar__header-subtitle-text': true,
          }"
        >
          <slot v-if="$slots.subtitle" name="subtitle"></slot>
        </view>
        <!-- renderAction ==> [MonthAction, YearAction]-->
        <!-- MonthAction -->
        <view
          :class="{
            'r-calendar__header-action': true,
            'r-calendar__header-action--disabled': nextMonthDisabled,
          }"
          @click="nextMonthDisabled ? undefined : onMonthChange(true)"
        >
          <slot
            name="nextMonth"
            v-if="$slots.nextMonth"
            :disabled="nextMonthDisabled"
          ></slot>
        </view>

        <!-- YearAction -->
        <view
          v-if="switchMode === 'year-month'"
          :class="{
            'r-calendar__header-action': true,
            'r-calendar__header-action--disabled': nextYearDisabled,
          }"
          @click="nextYearDisabled ? undefined : onYearChange(true)"
        >
          <slot
            name="nextYear"
            v-if="$slots.nextYear"
            :disabled="nextYearDisabled"
          ></slot>
        </view>
      </template>
      <slot v-else-if="$slots.subtitle" name="subtitle"></slot>
    </view>
    <!-- renderWeekDays-->
    <view
      :class="{
        'r-calendar__weekdays': true,
      }"
    >
      <text
        :class="{
          'r-calendar__weekday': true,
        }"
        v-for="(text, index) in renderWeekDays"
        :key="index"
      >
        {{ text }}</text
      >
    </view>
  </view>
</template>
<script setup>
import { computed, inject } from "vue";
import {
  getPrevYear,
  dayjs,
  getPrevMonth,
  getNextMonth,
  getNextYear,
  CONFIG_PROVIDER_KEY,
  DAY,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
const props = defineProps({
  date: { type: [Number, Array, Object], default: 0 },
  maxDate: { type: Number, default: 0 },
  minDate: { type: Number, default: 0 },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  showSubtitle: { type: Boolean, default: false },
  switchMode: { type: String, default: "none" },
  firstDayOfWeek: { type: Number, default: 0 },
  weekdays: { type: Array, default: [] },
  themeName: { type: String, default: "default" },
});

const componentsName = "r-calendar";
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

const emit = defineEmits(["clickSubtitle", "panelChange"]);

const onPanelChange = (date) => emit("panelChange", date);

const renderWeekDays = computed(() => [
  ...props.weekdays.slice(props.firstDayOfWeek, 7),
  ...props.weekdays.slice(0, props.firstDayOfWeek),
]);

const prevMonthDisabled = computed(() => {
  const prevMonth = getPrevMonth(props.date).valueOf();

  return (
    props.minDate &&
    prevMonth < dayjs(props.minDate).valueOf() &&
    dayjs(props.minDate).format("YYYY-MM-DD") !==
      dayjs(prevMonth).format("YYYY-MM-DD")
  );
});
const prevYearDisabled = computed(() => {
  const prevYear = getPrevYear(props.date).valueOf();
  return props.minDate && prevYear < dayjs(props.minDate).valueOf();
});

const nextMonthDisabled = computed(() => {
  const nextMonth = getNextMonth(props.date).valueOf();
  return props.maxDate && nextMonth > dayjs(props.maxDate).valueOf();
});

const nextYearDisabled = computed(() => {
  const nextYear = getNextYear(props.date).valueOf();
  return props.maxDate && nextYear > dayjs(props.maxDate).valueOf();
});

const onYearChange = (isNext) => {
  if (isNext) {
    onPanelChange(getNextYear(props.date).valueOf());
  } else {
    onPanelChange(getPrevYear(props.date).valueOf());
  }
};

const onMonthChange = (isNext) => {
  if (isNext) {
    onPanelChange(getNextMonth(props.date).valueOf());
  } else {
    onPanelChange(getPrevMonth(props.date).valueOf());
  }
};

const onClickSubtitle = (e) => emit("clickSubtitle", e);
</script>
<style lang="scss" scoped>
.r-calendar {
  &__header {
    flex-shrink: 0;
    box-shadow: var(--r-calendar-header-shadow);
  }

  &__header-title,
  &__header-subtitle {
    color: var(--r-text-color);
    height: var(--r-calendar-header-title-height);
    font-weight: var(--r-font-bold);
    line-height: var(--r-calendar-header-title-height);
    text-align: center;
  }

  &__header-title {
    font-size: var(--r-calendar-header-title-font-size);
  }

  &__header-subtitle {
    font-size: var(--r-calendar-header-subtitle-font-size);

    &--with-swicth {
      display: flex;
      align-items: center;
      padding: 0 var(--r-padding-base);
    }
  }

  &__header-subtitle-text {
    flex: 1;
  }

  &__header-action {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--r-calendar-header-action-width);
    height: 100%;
    color: var(--r-calendar-header-action-color);
    cursor: pointer;

    &--disabled {
      color: var(--r-calendar-header-action-disabled-color);
      cursor: not-allowed;
    }
  }

  &__weekdays {
    display: flex;
  }

  &__weekday {
    flex: 1;
    font-size: var(--r-calendar-weekdays-font-size);
    line-height: var(--r-calendar-weekdays-height);
    text-align: center;
  }
}
</style>
