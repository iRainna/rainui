let idCounter = 0;

export function uniqueId(prefix = "") {
  return `${prefix}${++idCounter}`;
}
export function uniqWith(array, comparator) {
  return array.filter((item, index, self) => {
    return self.findIndex((other) => comparator(item, other)) === index;
  });
}

export function findIndex(array, predicate) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
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

export function isEqual(value, other) {
  if (value === other) return true; // 基本类型直接比较

  if (
    typeof value !== "object" ||
    typeof other !== "object" ||
    value === null ||
    other === null
  ) {
    return false; // 非对象类型不相等
  }

  const keys1 = Object.keys(value);
  const keys2 = Object.keys(other);

  if (keys1.length !== keys2.length) return false; // 键数量不同

  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(value[key], other[key])) {
      return false; // 键或值不相等
    }
  }

  return true;
}
export function cloneDeep(obj, hash = new WeakMap()) {
  // 如果是基本类型或 null，直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 如果是 Date 类型，返回新的 Date 对象
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 如果是 RegExp 类型，返回新的 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 如果已经拷贝过该对象，直接返回
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 创建新对象或数组
  const cloneObj = Array.isArray(obj) ? [] : {};

  // 将当前对象存入哈希表，避免循环引用
  hash.set(obj, cloneObj);

  // 递归拷贝属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key], hash);
    }
  }

  return cloneObj;
}
