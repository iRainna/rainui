import { ref, computed } from "vue";
import { data, moduleData } from "./theme/default/index.js";
import {
  data as darkData,
  moduleData as darkModuleData,
} from "./theme/dark/index.js";

export const themeObject = ref({});
export const themeObjectComp = computed(() => ({
  default: data.value,
  dark: Object.keys({
    ...data.value,
    ...darkData.value,
  })
    .map((t) => {
      if (Object.keys(darkData.value).includes(t)) {
        return {
          key: t,
          value: darkData.value[t],
        };
      }
      return {
        key: t,
        value: data.value[t],
      };
    })
    .reduce((obj, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {}),
  ...themeObject.value,
}));
export const themeModuleObject = ref({});
export const themeModuleObjectComp = computed(() => {
  return {
    default: moduleData.value,
    dark: Object.keys({ ...moduleData.value, ...darkModuleData.value })
      .map((t) => {
        if (Object.keys(darkModuleData.value).includes(t)) {
          return {
            key: t,
            value: {
              ...moduleData.value[t],
              ...darkModuleData.value[t],
            },
          };
          //  { ...moduleData.value[t], ...darkModuleData.value[t] };
        }
        return {
          key: t,
          value: moduleData.value[t],
        };
      })
      .reduce((obj, item) => {
        obj[item.key] = item.value;
        return obj;
      }, {}),
    // merge(moduleData.value, darkModuleData.value)
    ...themeModuleObject.value,
  };
});

export const getThemeCssVar = (name = "default") => {
  let value = themeObjectComp.value[name];
  let cssVar = {};
  if (value) {
    let keys = Object.keys(value);

    keys.forEach((t) => {
      cssVar[`--${t}`] = value[t];
    });
  }

  return cssVar;
};

export const getComponentThemeCssVar = (
  themeName = "default",
  compoentName
) => {
  let value = themeModuleObjectComp.value[themeName]
    ? themeModuleObjectComp.value[themeName][compoentName]
    : {};
  if (compoentName == "r-action-bar") {
    console.log(value, compoentName, themeName);
  }

  let cssVar = {};
  if (value) {
    let keys = Object.keys(value);

    keys.forEach((t) => {
      cssVar[`--${t}`] = value[t];
    });
  }

  return cssVar;
};

export const addTheme = (name, object) => {
  themeObject.value[name] = object;
};
