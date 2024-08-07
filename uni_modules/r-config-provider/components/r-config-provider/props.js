export default {
  themeName: {
    type: String,
    default: "default",
  },
  customStyle: {
    type: Object,
    default: () => {},
  },
};
