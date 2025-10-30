<template>
  <r-config-provider :themeName="themeName">
    <page-header title="数字键盘"></page-header>

    <view style="padding-top: 20px">
      <r-cell-group inset>
        <r-cell title="弹窗默认键盘" @click="open({})" />
        <r-cell
          title="弹出带右侧栏的键盘"
          @click="
            open({
              theme: 'custom',
              extraKey: '.',
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出身份证号键盘"
          @click="
            open({
              extraKey: 'X',
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出带标题的键盘"
          @click="
            open({
              title: '键盘标题',
              extraKey: '.',
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出配置多个按键的键盘"
          @click="
            open({
              theme: 'custom',
              extraKey: ['00', '.'],
              closeButtonText: '完成',
            })
          "
        />
        <r-cell
          title="弹出配置随机数字的键盘"
          @click="
            open({
              randomKeyOrder: true,
            })
          "
        />
        <r-cell title="双向绑定" :value="value" />
      </r-cell-group>
    </view>
	
	<r-number-keyboard
	  v-model:show="show"
	  :closeButtonText="item.closeButtonText"
	  :theme="item.theme || 'default'"
	  :extra-key="item.extraKey"
	  :close-button-text="item.closeButtonText"
	  :title="item.title"
	  :random-key-order="item.randomKeyOrder"
	  v-model:value="value"
	></r-number-keyboard>
  </r-config-provider>

</template>

<script setup>
import useTheme from "@/hooks/useTheme";
import { ref } from "vue";
const { themeName } = useTheme();
const onClickLeft = () => {
  uni.navigateBack();
};

const show = ref(false);
const item = ref({});
const value = ref("");

const open = (data = {}) => {
  show.value = true;
  item.value = data;
};
</script>
