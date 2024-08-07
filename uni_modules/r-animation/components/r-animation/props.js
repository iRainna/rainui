/*
 * @Description: 
 * @Author: iRainna
 * @Date: 2023-07-28 11:19:47
 * @LastEditTime: 2023-08-01 16:04:35
 * @FilePath: \iR-ui\uni_modules\iR-ui\components\transition-animation\props.js
 */
export default {
  //加载动画的显隐
  show: {
    type: Boolean,
    default: false,
  },
  //入场动画
  entryClass: {
    type: String,
    default: "animate__fadeIn",
  },
  //退场动画
  exitClass: {
    type: String,
    default: "animate__fadeOut",
  },
  //持续时间
  duration: {
    type: Number,
    default: 1000,
  },
  //延迟时间
  delay: {
    type: Number,
    default: 0,
  },
  //自定义样式
  customStyle: {
    type: Object,
    default: () => {},
  },
};
