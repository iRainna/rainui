// 查询节点信息
export const GetRect = (selector, _this, all) => {
  return new Promise((resolve) => {
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
      })
      .exec();
  });
};
