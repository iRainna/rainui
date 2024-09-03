<template>
  <view
    :style="getComponentThemeStyle"
    :class="{
      'r-calendar': true,
    }"
  >
    <!-- CalendarHeader -->
    <r-calendar-header
      :date="canSwitch ? currentPanelDate : months[scrollIndex]"
      :maxDate="maxDate"
      :minDate="minDate"
      :showTitle="showTitle"
      :showSubtitle="showSubtitle"
      :switchMode="switchMode"
      :firstDayOfWeek="firstDayOfWeek"
      :weekdays="weekdays"
      @clickSubtitle="onClickSubtitle"
      @panelChange="onPanelChange"
    >
      <template #title>
        <slot v-if="$slots.title" name="title"></slot>
        <text v-else-if="title">{{ title }}</text>
      </template>
      <template #subtitle>
        <slot
          name="subtitle"
          v-if="$slots.subtitle"
          :date="canSwitch ? currentPanelDate : months[scrollIndex]"
          :text="
            canSwitch
              ? formatMonthTitle(
                  dayjs(currentPanelDate).year(),
                  dayjs(currentPanelDate).month() + 1
                )
              : formatMonthTitle(
                  months && months.length
                    ? dayjs(months[scrollIndex]).year()
                    : 0,
                  months && months.length
                    ? dayjs(months[scrollIndex]).month() + 1
                    : 0
                )
          "
        ></slot>
        <text v-else>{{
          canSwitch
            ? formatMonthTitle(
                dayjs(currentPanelDate).year(),
                dayjs(currentPanelDate).month() + 1
              )
            : formatMonthTitle(
                months && months.length ? dayjs(months[scrollIndex]).year() : 0,
                months && months.length
                  ? dayjs(months[scrollIndex]).month() + 1
                  : 0
              )
        }}</text>
      </template>
      <template #nextYear="{ disabled }">
        <slot
          name="nextYear"
          v-if="$slots.nextYear"
          :disabled="disabled"
        ></slot>

        <view
          v-else
          :class="{
            'r-haptics-feedback': !disabled,
          }"
        >
          <r-icon
            name="arrow-double-right"
            size="inherit"
            color="inherit"
          ></r-icon>
        </view>
      </template>
      <template #nextMonth="{ disabled }">
        <slot
          name="nextMonth"
          v-if="$slots.nextMonth"
          :disabled="disabled"
        ></slot>
        <view
          v-else
          :class="{
            'r-haptics-feedback': !disabled,
          }"
        >
          <r-icon name="arrow" size="inherit" color="inherit"></r-icon>
        </view>
      </template>

      <template #prevMonth="{ disabled }">
        <slot
          name="prevMonth"
          v-if="$slots.prevMonth"
          :disabled="disabled"
        ></slot>
        <view
          v-else
          :class="{
            'r-haptics-feedback': !disabled,
          }"
        >
          <r-icon name="arrow-left" size="inherit" color="inherit"></r-icon>
        </view>
      </template>

      <template #prevYear="{ disabled }">
        <slot
          name="prevYear"
          v-if="$slots.prevYear"
          :disabled="disabled"
        ></slot>
        <view
          v-else
          :class="{
            'r-haptics-feedback': !disabled,
          }"
        >
          <r-icon
            name="arrow-double-left"
            size="inherit"
            color="inherit"
          ></r-icon>
        </view>
      </template>
    </r-calendar-header>
    <!-- renderMonth -->
    <scroll-view
      @scroll="onScroll"
      scroll-y
      :scroll-top="scrollTop"
      :style="{
        height: isNumeric(canSwitch ? MonthContentHeight : contentHeight)
          ? (canSwitch ? MonthContentHeight : contentHeight) + 'px'
          : canSwitch
          ? MonthContentHeight
          : contentHeight,
      }"
    >
      <view
        :class="{
          'r-calendar__body': true,
        }"
      >
        <template v-if="canSwitch">
          <!-- renderMonth(currentPanelDate.value, 0) -->
          <r-calendar-month
            :date="dayjs(currentPanelDate).valueOf()"
            :currentDate="currentDate"
			      :componentWidth="componentWidth"
            :showMonthTitle="!showSubtitle"
            :showMark="showMark"
            :firstDayOfWeek="firstDayOfWeek"
            :lazyRender="canSwitch ? false : lazyRender"
            :maxDate="maxDate"
            :minDate="minDate"
            :type="type"
            :color="color"
            :formatter="formatter"
            :rowHeight="rowHeight"
            :showSubtitle="showSubtitle"
            :allowSameDay="allowSameDay"
            @click="onClickDay"
            @clickDisabledDate="onClickDisabledDate"
          >
            <template #monthTitle>
              <slot v-if="$slots.monthTitle" name="monthTitle"></slot>
              <text v-else>
                {{
                  formatMonthTitle(
                    dayjs(currentPanelDate).year(),
                    dayjs(currentPanelDate).month() + 1
                  )
                }}
              </text>
            </template>
          </r-calendar-month>
        </template>
        <template v-else>
          <!-- months.value.map(renderMonth) -->
          <r-calendar-month
            v-for="(date, index) in months"
            :key="index"
			      :componentWidth="componentWidth"
            :date="dayjs(date).valueOf()"
            :currentDate="currentDate"
            :showMonthTitle="index !== 0 || !showSubtitle"
            :showMark="showMark"
            :firstDayOfWeek="firstDayOfWeek"
            :lazyRender="canSwitch ? false : lazyRender"
            :maxDate="maxDate"
            :minDate="minDate"
            :type="type"
            :color="color"
            :formatter="formatter"
            :rowHeight="rowHeight"
            :showSubtitle="showSubtitle"
            :allowSameDay="allowSameDay"
            :visible="visibleIndexs.includes(index)"
            @click="onClickDay"
            @clickDisabledDate="onClickDisabledDate"
          >
            <template #monthTitle>
              <slot v-if="$slots.monthTitle" name="monthTitle"></slot>
              <text v-else>
                {{
                  formatMonthTitle(dayjs(date).year(), dayjs(date).month() + 1)
                }}
              </text>
            </template>
          </r-calendar-month>
        </template>
      </view>
    </scroll-view>

    <!-- renderFooter -->
    <view
      :class="{
        'r-calendar__footer': true,
      }"
    >
      <!-- renderFooterButton -->
      <slot name="footer" v-if="$slots.footer"></slot>
      <view
        v-else-if="showConfirm"
        :class="{
          'r-calendar__confirm': true,
        }"
      >
        <r-button
          round
          block
          type="primary"
          :color="color"
          :disabled="buttonDisabled"
          @click="onConfirm"
        >
          <slot
            v-if="$slots.confirmText"
            name="confirmText"
            :disabled="buttonDisabled"
          ></slot>
          <text v-else>
            {{ buttonDisabled ? confirmDisabledText : confirmText }}
          </text>
        </r-button>
      </view>
    </view>
  </view>

  <r-toast ref="toastRef"></r-toast>
</template>
<script setup>
import {
  ref,
  watch,
  computed,
  inject,
  provide,
  onMounted,
  getCurrentInstance,
  nextTick,
} from "vue";
import { getComponentThemeCssVar } from "@/uni_modules/r-theme/js_sdk/index.js";
import useToast from "@/uni_modules/r-toast/components/r-toast/useToast";
import {
  dayjs,
  getToday,
  getPrevDay,
  getNextDay,
  compareDay,
  cloneDate,
  getTimeByOffset,
  CALENDAR_KEY,
  CONFIG_PROVIDER_KEY,
  compareMonth,
  cloneDates,
  isNumeric,
  _,
  calcDateNum,
  isFunction,
} from "@/uni_modules/r-utils/js_sdk/index.js";
import { GetRect } from "../../../r-utils/js_sdk";

const toastRef = ref(null);

const { showToast } = useToast(toastRef);
const { reduce, debounce } = _;
const { proxy } = getCurrentInstance();
const emit = defineEmits([
  "clickDisabledDate",
  "confirm",
  "overRange",
  "select",
  "unselect",
  "clickSubtitle",
  "panelChange",
]);

const props = defineProps({
  // 选择类型：single 表示选择单个日期，multiple 表示选择多个日期，range 表示选择日期区间
  type: {
    type: String,
    default: "single",
  },
  // 切换模式：none 平铺展示所有月份，不展示切换按钮，month 支持按月切换，展示上个月/下个月按钮，year-month 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮
  switchMode: {
    type: String,
    default: "none",
  },
  componentWidth:{
	  type:String,
	  default:'100vw'
  },
  // 日历标题
  title: {
    type: String,
    default: "日期选择",
  },
  // 主题色，对底部按钮和选中日期生效
  color: {
    type: String,
    default: "#1989fa",
  },
  // 可选择的最小日期
  minDate: {
    type: [Number],
    default: dayjs().valueOf(),
  },
  // 可选择的最大日期
  maxDate: {
    type: [Number],
    default: dayjs().add(6, "month").valueOf(),
  },
  // 默认选中的日期，type 为 multiple 或 range 时为数组，传入 null 表示默认不选择
  defaultDate: {
    type: [Number, Array],
    default: null,
  },
  // 日期行高(px)
  rowHeight: {
    type: [String, Number],
    default: 64,
  },
  //日期内容的高度(px)
  contentHeight: {
    type: [Number],
    default: 400,
  },
  // 日期格式化函数
  formatter: {
    type: Function,
    default: (e) => e,
  },
  //标题格式化函数
  formatMonthTitle: {
    type: Function,
    default: (year, month) => `${year}年${month}月`,
  },
  // 是否只渲染可视区域的内容
  lazyRender: {
    type: Boolean,
    default: true,
  },
  // 是否显示月份背景水印
  showMark: {
    type: Boolean,
    default: true,
  },
  // 是否展示日历标题
  showTitle: {
    type: Boolean,
    default: true,
  },
  // 是否展示日历副标题（年月）
  showSubtitle: {
    type: Boolean,
    default: true,
  },
  // 是否展示确认按钮
  showConfirm: {
    type: Boolean,
    default: true,
  },
  // 是否为只读状态，只读状态下不能选择日期
  readonly: {
    type: Boolean,
    default: false,
  },
  // 确认按钮的文字
  confirmText: {
    type: String,
    default: "确定",
  },
  // 确认按钮处于禁用状态时的文字
  confirmDisabledText: {
    type: String,
    default: "确定",
  },
  // 设置周起始日	0-6
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  //星期的文案
  weekdays: {
    type: Array,
    default: ["日", "一", "二", "三", "四", "五", "六"],
  },
  //r-theme主题名称
  themeName: {
    type: String,
    default: "default",
  },

  // 日期区间最多可选天数 当 Calendar 的 type 为 range | multiple 时，支持
  maxRange: {
    type: [String, Number],
  },
  // 范围选择超过最多可选天数时的提示文案 当 Calendar 的 type 为 range 或 multiple 时，支持
  rangePrompt: {
    type: Function,
    default: (num) => `最多选择 ${num} 天`,
  },
  // 范围选择超过最多可选天数时，是否展示提示文案 当 Calendar 的 type 为 range 时，支持
  showRangePrompt: {
    type: Boolean,
    default: true,
  },
  // 是否允许日期范围的起止时间为同一天 当 Calendar 的 type 为 range 时，支持
  allowSameDay: {
    type: Boolean,
    default: false,
  },
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
const formatMonthTitle = (year, month) => {
  if (props.formatMonthTitle && isFunction(props.formatMonthTitle)) {
    return props.formatMonthTitle(year, month);
  }
  return `${year}年${month}月`;
};
const children = ref([]);

const bodyHeight = ref(0);

const scrollTop = ref(0);
const scrollIndex = ref(0);
const visibleIndexs = ref([]);
const canSwitch = computed(() => props.switchMode !== "none");
const minDate = computed(() => {
  if (!props.minDate && !canSwitch.value) {
    return getToday().valueOf();
  }

  return props.minDate;
});

const maxDate = computed(() => {
  if (!props.maxDate && !canSwitch.value) {
    return getTimeByOffset(getToday(), 6, "month").valueOf();
  }

  return props.maxDate;
});

const MonthContentHeight = computed(() => {
  return children?.value?.length ? children.value[0].height : 0;
});

const limitDateRange = (date, min = minDate.value, max = maxDate.value) => {
  if (min && compareDay(date, min) === -1) {
    return min;
  }
  if (max && compareDay(date, max) === 1) {
    return max;
  }
  return date;
};
const getInitialDate = (defaultDate = props.defaultDate) => {
  const { type, allowSameDay } = props;

  if (defaultDate === null) {
    return defaultDate;
  }

  const now = getToday();

  if (type === "range") {
    if (!Array.isArray(defaultDate)) {
      defaultDate = [];
    }

    const min = minDate.value;
    const max = maxDate.value;

    const start = limitDateRange(
      defaultDate[0] || now,
      min,
      max ? (allowSameDay ? max : getPrevDay(max)) : undefined
    );

    const end = limitDateRange(
      defaultDate[1] || (allowSameDay ? now : getNextDay(now)),
      min ? (allowSameDay ? min : getNextDay(min)) : undefined
    );

    return [start, end];
  }

  if (type === "multiple") {
    if (Array.isArray(defaultDate)) {
      return defaultDate.map((date) => limitDateRange(date));
    }

    return [limitDateRange(now)];
  }

  if (!defaultDate || Array.isArray(defaultDate)) {
    defaultDate = now;
  }
  return limitDateRange(defaultDate);
};
const currentDate = ref(getInitialDate());

const buttonDisabled = computed(() => {
  if (currentDate.value) {
    if (props.type === "range") {
      return !currentDate.value[0] || !currentDate.value[1];
    }
    if (props.type === "multiple") {
      return !currentDate.value.length;
    }
  }
  return !currentDate.value;
});

const getInitialPanelDate = () => {
  const date = Array.isArray(currentDate.value)
    ? currentDate.value[0]
    : currentDate.value;

  return date ? dayjs(date).valueOf() : limitDateRange(getToday());
};
const currentPanelDate = ref(getInitialPanelDate());

const months = computed(() => {
  let months = [];

  if (!minDate.value || !maxDate.value) {
    return months;
  }
  let min = dayjs(minDate.value).valueOf();
  let max = dayjs(maxDate.value).valueOf();

  while (min < max) {
    months.push(min);
    min = dayjs(min).add(1, "month").valueOf();
  }
  months = months.filter((t) => t <= max);

  return months;
});

const disabledDays = computed(() => {
  let list = [];
  if (children?.value?.length) {
    list = children.value.map((t) => t.disabledDays);
  }

  return reduce(list, (sum, item) => [...sum, ...item], []);
});
const onScroll = debounce(async (e) => {
  const top = e?.detail?.scrollTop || 0;
  // scrollTop.value = top;
  let list = children?.value || [];
  let length = list?.length || 0;

  // 找到在哪一个内部
  let t = 0;
  //找到这个和上面已经滚动了的高度和
  let startViewReduceHeight = 0;
  for (t = 0; t < length; t++) {
    startViewReduceHeight = reduce(
      list.filter((item, index) => index <= t),
      (sum, n) => (sum += n?.itemRect?.height || 0),
      0
    );
    if (startViewReduceHeight > top) break;
  }
  scrollIndex.value = Number(t);

  visibleIndexs.value = [t];

  //找到 t 还显示多少像素
  let firstLastHeight = startViewReduceHeight - top;
  //找到内容区域还剩多少像素
  let contentLastHeight = Number(props.contentHeight) - firstLastHeight;

  for (let n = t + 1; n < length; n++) {
    if (
      reduce(
        list.filter((item, index) => index <= n),
        (sum, n) => (sum += n?.itemRect?.height || 0),
        0
      ) > contentLastHeight
    ) {
      visibleIndexs.value = [...visibleIndexs.value, n];
      break;
    }
  }
}, 0);
const scrollToDate = async (targetDate) => {
  if (canSwitch.value) {
    currentPanelDate.value = targetDate;
  } else {
    await nextTick();
    months.value.some((month, index) => {
      if (compareMonth(month, targetDate) === 0) {
        if (index == 0) {
          scrollTop.value = 0;
        } else if (index > 0) {
          const needScrollChildren = children.value.filter((t, i) => i < index);
          scrollTop.value = reduce(
            needScrollChildren,
            (sum, n) => (sum += n?.itemRect?.height || 0),
            0
          );
        }

        return true;
      }
      return false;
    });

    onScroll({
      detail: {
        scrollTop: scrollTop.value,
      },
    });
  }
};
const scrollToCurrentDate = () => {
  if (props.poppable && !props.show) {
    return;
  }

  if (currentDate.value) {
    const targetDate =
      props.type === "single" ? currentDate.value : currentDate.value[0];

    if (targetDate) {
      scrollToDate(targetDate);
    }
  } else if (!canSwitch.value) {
    // setTimeout(() => {
    onScroll({
      detail: {
        scrollTop: scrollTop.value,
      },
    });
    // }, 0);
  }
};

const getDisabledDate = (disabledDays, startDay, date) =>
  disabledDays.find(
    (day) =>
      compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1
  )?.date;
const init = async () => {
  if (props.poppable && !props.show) {
    return;
  }

  await nextTick();
  if (!canSwitch.value) {
    nextTick(async () => {
      const bodyRect = await GetRect(".r-calendar__body", proxy);
      bodyHeight.value = bodyRect.height;
    });
  }

  scrollToCurrentDate();
};

const onClickSubtitle = (e) => emit("clickSubtitle", e);
const onPanelChange = (date) => {
  currentPanelDate.value = date;
  emit("panelChange", { date });
};
const onConfirm = () =>
  emit("confirm", currentDate.value ?? cloneDates(currentDate.value));
const checkRange = (date) => {
  const { maxRange, rangePrompt, showRangePrompt } = props;

  if (maxRange && calcDateNum(date) > +maxRange) {
    if (showRangePrompt) {
      showToast(rangePrompt(maxRange));
    }
    emit("overRange");
    return false;
  }

  return true;
};
const select = (date, complete) => {
  const setCurrentDate = (date) => {
    currentDate.value = date;
    emit("select", cloneDates(date));
  };

  if (complete && props.type === "range") {
    const valid = checkRange(date);

    if (!valid) {
      // auto selected to max range
      setCurrentDate([
        date[0],
        getTimeByOffset(date[0], +props.maxRange - 1, "day"),
      ]);
      return;
    }
  }

  setCurrentDate(date);

  if (complete && !props.showConfirm) {
    onConfirm();
  }
};
const onClickDay = (item) => {
  if (props.readonly || !item.date) {
    return;
  }

  const { date } = item;
  const { type } = props;

  if (type === "range") {
    if (!currentDate.value) {
      select([date]);
      return;
    }

    const [startDay, endDay] = currentDate.value;

    if (startDay && !endDay) {
      const compareToStart = compareDay(date, startDay);

      if (compareToStart === 1) {
        const disabledDay = getDisabledDate(disabledDays.value, startDay, date);

        if (disabledDay) {
          const endDay = getPrevDay(disabledDay);
          if (compareDay(startDay, endDay) === -1) {
            select([startDay, endDay]);
          } else {
            select([date]);
          }
        } else {
          select([startDay, date], true);
        }
      } else if (compareToStart === -1) {
        select([date]);
      } else if (props.allowSameDay) {
        select([date, date], true);
      }
    } else {
      select([date]);
    }
  } else if (type === "multiple") {
    if (!currentDate.value) {
      select([date]);
      return;
    }

    const dates = currentDate.value || [];

    const selectedIndex = dates.findIndex(
      (dateItem) => compareDay(dateItem, date) === 0
    );

    if (selectedIndex !== -1) {
      const [unselectedDate] = dates.splice(selectedIndex, 1);
      emit("unselect", cloneDate(unselectedDate));
    } else if (props.maxRange && dates.length >= +props.maxRange) {
      showToast(props.rangePrompt(props.maxRange));
    } else {
      select([...dates, date]);
    }
  } else {
    select(date, true);
  }
};
const onClickDisabledDate = (item) => {
  emit("clickDisabledDate", item);
};
const setChildren = (e) => {
  children.value = [...children.value, e];
};

provide(CALENDAR_KEY, { children, setChildren });
watch(
  () => [props.type, props.defaultDate],
  () => {
    currentDate.value = getInitialDate();
  }
);
onMounted(async () => {
  await nextTick();
  init();
});
</script>
<style lang="scss" scoped>
.r-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--r-calendar-background);

  &__popup {
    &.r-popup--top,
    &.r-popup--bottom {
      height: var(--r-calendar-popup-height);
    }

    &.r-popup--left,
    &.r-popup--right {
      height: 100%;
    }

    .r-popup__close-icon {
      top: 11px;
    }
  }

  &__body {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    flex-shrink: 0;
    padding-left: var(--r-padding-md);
    padding-right: var(--r-padding-md);
  }

  &__confirm {
    height: var(--r-calendar-confirm-button-height);
    margin: var(--r-calendar-confirm-button-margin);
  }
}

.r-haptics-feedback {
  cursor: pointer;

  &:active {
    opacity: var(--r-active-opacity);
  }
}
</style>
