<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */

::-webkit-scrollbar {
  width: 4px; /*  设置纵轴（y轴）轴滚动条 */
  height: 4px; /*  设置横轴（x轴）轴滚动条 */
}
/* 滚动条滑块（里面小方块） */
::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background: #969799;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  border-radius: 0;

  background: #c8c9cc;
}
</style>
