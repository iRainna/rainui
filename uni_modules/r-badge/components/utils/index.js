export const isDef = (val) => val !== undefined && val !== null;
export const isNumeric = (val) =>
  typeof val === "number" || /^\d+(\.\d+)?$/.test(val);