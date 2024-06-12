export const isNumeric = (val) =>
  typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
