export const POPUP_KEY = Symbol("r-popup");
export const getSystemInfo = () => {
  try {
    return uni.getSystemInfoSync();
  } catch (error) {
    return {};
  }
};