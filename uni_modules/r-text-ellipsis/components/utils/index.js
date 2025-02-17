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

export function ceil(number, precision = 0) {
  const factor = Math.pow(10, precision);
  return Math.ceil(number * factor) / factor;
}

export function round(number, precision = 0) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}