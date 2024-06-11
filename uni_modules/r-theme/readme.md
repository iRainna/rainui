# r-theme

`r-theme` 是一个为 `r-overlay` `r-icon` 等组件提供定制样式的 jssdk。

## API

| 名称        | 说明           | 类型     | 默认值                                                                 |
| ----------- | -------------- | -------- | ---------------------------------------------------------------------- |
| themeObject | 保存样式的数组 | Object   | index.js 内查看                                                        |
| getTheme    | 获取主题       | Function | (index = "default") => themeObject[index]                              |
| addTheme    | 增加主题       | String   | (name, object) =>{<br />themeObject.value[name] = object;<br /><br />} |
