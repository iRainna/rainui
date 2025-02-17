let idCounter = 0;

export function uniqueId(prefix = "") {
  return `${prefix}${++idCounter}`;
}
