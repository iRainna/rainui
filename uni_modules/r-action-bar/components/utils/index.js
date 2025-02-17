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

export const getSystemInfo = () => {
  try {
    return uni.getSystemInfoSync();
  } catch (error) {
    return {};
  }
};

export const ACTION_BAR_KEY = Symbol("r-action-bar");
