import { dayjs } from "@/uni_modules/iRainna-dayjs/js_sdk/dayjs.min.js";
export * from "@/uni_modules/iRainna-dayjs/js_sdk/dayjs.min.js";

export const CALENDAR_KEY = Symbol("r-calendar");

export const DAY = 1000 * 60 * 60 * 24;
export const compareMonth = (date1, date2) => {
  if (dayjs(date1).year() == dayjs(date2).year()) {
    return dayjs(date1).month() == dayjs(date2).month()
      ? 0
      : dayjs(date1).month() > dayjs(date2).month()
      ? 1
      : -1;
  }

  return dayjs(date1).year() > dayjs(date2).year() ? 1 : -1;
};

export const compareDay = (day1, day2) => {
  const compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    return dayjs(day1).date() === dayjs(day2).date()
      ? 0
      : dayjs(day1).date() > dayjs(day2).date()
      ? 1
      : -1;
  }
  return compareMonthResult;
};

export const cloneDate = (date) => dayjs(date);

export const cloneDates = (dates) =>
  Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);

export function getTimeByOffset(date, offset, type = "day") {
  if (offset >= 0) {
    return dayjs(date).add(Math.abs(offset), type);
  } else {
    return dayjs(date).subtract(Math.abs(offset), type);
  }
}

export const getPrevDay = (date) => getTimeByOffset(date, -1, "day");
export const getNextDay = (date) => getTimeByOffset(date, 1, "day");

export const getPrevMonth = (date) => getTimeByOffset(date, -1, "month");
export const getNextMonth = (date) => getTimeByOffset(date, 1, "month");

export const getPrevYear = (date) => getTimeByOffset(date, -1, "year");
export const getNextYear = (date) => getTimeByOffset(date, 1, "year");

export const getToday = () =>
  dayjs().hour(0).minute(0).second(0).millisecond(0);

export function calcDateNum(date = [0, 0]) {
  const day1 = dayjs(date[0]).valueOf();
  const day2 = dayjs(date[1]).valueOf();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}

export const isNumeric = (val) =>
  typeof val === "number" || /^\d+(\.\d+)?$/.test(val);

export const isFunction = (val) => typeof val === "function";
export function reduce(collection, iteratee, accumulator) {
  let result = accumulator !== undefined ? accumulator : collection[0];
  const startIndex = accumulator !== undefined ? 0 : 1;

  for (let i = startIndex; i < collection.length; i++) {
    result = iteratee(result, collection[i], i, collection);
  }

  return result;
}

export function debounce(func, wait) {
  let timeout = null;

  return function (...args) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export const GetRect = (selector, _this, all) => {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .in(_this)
      [all ? "selectAll" : "select"](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        }
        if (!all && rect) {
          resolve(rect);
        }
        reject(rect);
      })
      .exec();
  });
};

let idCounter = 0;

export function uniqueId(prefix = "") {
  return `${prefix}${++idCounter}`;
}

export function findIndex(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}
