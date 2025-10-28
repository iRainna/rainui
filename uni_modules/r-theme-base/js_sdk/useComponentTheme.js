import baseData from "./baseCssVar";

export const getThemeCssVar = (name = "default",datas) => {
  const useTheme =
    datas[Object.keys(datas).find((m) => m.indexOf(name) >= 0)];

  let cssVar = {};
  if (useTheme) {
    let keys = Object.keys(useTheme);

    keys.forEach((t) => {
      cssVar[`--${t}`] = useTheme[t];
    });
  }

  return cssVar;
};

export const getComponentThemeCssVar = (
  themeName = "default",
  componentName,
  datas
) => {
  const useTheme =
    datas[
      Object.keys(datas).find((m) => m.indexOf(themeName) >= 0)
    ];

  let cssVar = {};
  if (componentName != "r-base") {
    let keys = Object.keys(useTheme).filter(
      (m) => m.indexOf(componentName) >= 0
    );

    keys.forEach((t) => {
      cssVar[`--${t}`] = useTheme[t];
    });
  } else {
    let keys = Object.keys(useTheme).filter((m) =>
      Object.keys(baseData.value).some((t) => t == m)
    );

    keys.forEach((t) => {
      cssVar[`--${t}`] = useTheme[t];
    });
  }

  return cssVar;
};
