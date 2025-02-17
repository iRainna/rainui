export function cloneDeep(obj,hash = new WeakMap()) {
    // 如果是基本类型或 null，直接返回
     if (obj === null || typeof obj !== 'object') {
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
