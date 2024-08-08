import DefaultTheme from "vitepress/theme";
import SimulatorH5 from "../../components/SimulatorH5.vue";
import MyLayout from "../../components/MyLayout.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Simulator", SimulatorH5);
  },
  // Layout: MyLayout, //暂时关闭后续使用
};
