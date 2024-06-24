<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider :theme="theme">
      <!-- <view style="width: 92vw; margin: 0 auto">
        <r-collapse v-model:value="activeNames">
          <r-collapse-item title="标题1" name="1">
            技术无非就是那些开发它的人的共同灵魂。
          </r-collapse-item>
        </r-collapse>
      </view>

       -->
      <r-space>
        <r-button @click="openToast(0)">打开</r-button>
        <r-button @click="openToast(1)">打开失败</r-button>
        <r-button @click="openToast(2)">打开成功</r-button>
        <r-button @click="openToast(3)">打开加载</r-button>
      </r-space>

      <r-toast ref="toastRef"></r-toast>

      <!-- <r-checkbox v-model:value="checked">复选框</r-checkbox>
      <r-checkbox v-model:value="checked" disabled>复选框</r-checkbox>
      <r-checkbox-group v-model:value="checkList" shape="square">
        <r-checkbox name="a">复选框 a</r-checkbox>
        <r-checkbox name="b">复选框 b</r-checkbox>
      </r-checkbox-group>
      <r-checkbox-group
        v-model:value="checkList"
        direction="horizontal"
        shape="round"
      >
        <r-checkbox name="check1">复选框</r-checkbox>
        <r-checkbox name="check2">复选2</r-checkbox>
      </r-checkbox-group>
      <r-checkbox v-model:value="checked" checked-color="#ee0a24"
        >复选框</r-checkbox
      >
      <r-checkbox v-model:value="checked" icon-size="24px">复选框</r-checkbox>

      <r-checkbox v-model:value="checked">
        自定义图标
        <template #icon="props">
          <image
            style="height: 20px; width: 20px"
            :src="
              props.checked
                ? 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png'
                : 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
            "
          />
        </template>
      </r-checkbox>

      <r-checkbox v-model:value="checked" label-position="left"
        >复选框</r-checkbox
      >
      <r-checkbox v-model:value="checked" label-disabled>复选框</r-checkbox>

      <r-checkbox-group v-model:value="checkList" direction="vertical">
        <r-checkbox name="a">复选框 a</r-checkbox>
        <r-checkbox name="b">复选框 b</r-checkbox>
      </r-checkbox-group> -->
      <!-- //宽度跟随外层盒子
      <r-cell-group>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
      //单独使用在小程序上要加个宽度
      <r-cell title="单元格" is-link />
      <r-cell title="单元格" value="内容" /> -->
      <!-- <view @click="cShow = !cShow">打开 {{ fieldValue }}</view> -->
      <!-- <view style="width: 100%">
        <r-button type="primary">主要按钮</r-button>
        <r-button type="success">成功按钮</r-button>
        <r-button type="default">默认按钮</r-button>
        <r-button type="danger">危险按钮</r-button>
        <r-button type="warning">警告按钮</r-button>

        <r-button plain type="primary">朴素按钮</r-button>
        <r-button plain type="success">朴素按钮</r-button>

        <r-button disabled type="primary">禁用状态</r-button>
        <r-button disabled type="success">禁用状态</r-button>

        <r-button loading type="primary" />
        <r-button loading type="primary" loading-type="spinner" />
        <r-button loading type="success" loading-text="加载中..." />

        <r-button square type="primary">方形按钮</r-button>
        <r-button round type="success">圆形按钮</r-button>

        <r-button icon="plus" type="primary" />
        <r-button icon="plus" type="primary">按钮</r-button>

        <r-button type="primary" size="large">大号按钮</r-button>
        <r-button type="primary" size="normal">普通按钮</r-button>
        <r-button type="primary" size="small">小型按钮</r-button>
        <r-button type="primary" size="mini">迷你按钮</r-button>

        <r-button type="primary" block>块级元素</r-button>

        <r-button color="#7232dd">单色按钮</r-button>
        <r-button color="#7232dd" plain>单色按钮</r-button>
        <r-button color="linear-gradient(to right, #ff6034, #ee0a24)">
          渐变色按钮
        </r-button>
      </view> -->
    </r-config-provider>
    <!-- <view style="display: flex; flex-direction: column;width: 100%;margin: 0 auto;height: 80vh;background-color: darkgray;">
      <r-cell-group>
        <r-cell title="单元格" value="内容" />
        <r-cell title="单元格" value="内容" label="描述信息" />
      </r-cell-group>
    </view>
		 <r-cell title="单元格" value="内容" label="描述信息" /> -->

    <!-- <r-collapse v-model:value="activeNames">
      <r-collapse-item title="标题1" name="1">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题2" name="2">
        技术无非就是那些开发它的人的共同灵魂。
      </r-collapse-item>
      <r-collapse-item title="标题3" name="3">
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </r-collapse-item>
    </r-collapse> -->

    <!-- <view style="width: 700rpx; margin: 0 auto">
      <r-tabs v-model:active="tabActive">
        <r-tab title="标签 1" name="tab1"> </r-tab>
        <r-tab title="标签 21111" name="tab2">内容 2<br />22222</r-tab>
        <r-tab title="标签 3" name="tab3">内容 3</r-tab>
        <r-tab title="标签 4" name="tab4">内容 4</r-tab>
        <r-tab title="标签 5" name="tab5">内容 5</r-tab>
        <r-tab title="标签 6" name="tab6">内容 6</r-tab>
        <r-tab title="标签 7" name="tab7">内容 7</r-tab>
        <r-tab title="标签 8" name="tab8">内容 8</r-tab>
        <r-tab title="标签 9" name="tab9">内容 9</r-tab>
        <r-tab title="标签 0" name="tab0">内容 0</r-tab>
      </r-tabs>
    </view> -->
    <!-- <r-image
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      mode="heightFix"
      radius="20rpx"
      draggable
    >
    </r-image> -->

    <!-- <r-switch v-model:value="checked" @change="changeSwitch" />
    <r-switch v-model:value="checked" disabled />
    <r-switch v-model:value="checked" loading />
    <r-switch v-model:value="checked" size="22px" />
    <r-switch
      v-model:value="checked"
      active-color="#ee0a24"
      inactive-color="#dcdee0"
    />
    <r-switch v-model:value="checked">
      <template #node>
        <r-icon
          prefix="iconfont"
          :name="checked ? 'icon-smile' : 'icon-frown'"
        />
      </template>
    </r-switch> -->

    <!-- <r-icon name="star" prefix="r-icon" hoverClass="animate__bounce"></r-icon> -->
    <!-- <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <r-icon name="star" prefix="r-icon" hoverClass="animate__bounce"></r-icon>

    <r-rate v-model:value="rateValue" />
    <r-rate v-model:value="rateValue" icon="like" void-icon="like-o" />
    <r-rate
      v-model:value="rateValue"
      size="50rpx"
      color="#ffd21e"
      void-icon="star"
      void-color="#eee"
    />
    <r-rate v-model:value="rateValue" allow-half />
    <r-rate v-model:value="rateValue" :count="6" />
    <r-rate v-model:value="rateValue" clearable />
    <r-rate v-model:value="rateValue" disabled />
    <r-rate v-model:value="rateValue" readonly />
    <r-rate v-model:value="rateValue" readonly allow-half />
    <r-rate v-model:value="rateValue" />

    <r-loading type="circular" v-if="flag"></r-loading>
    <r-loading type="spinner" v-if="flag"></r-loading>
    <r-loading type="circular" v-if="flag">
      <template #icon>
        <r-icon name="icon-left-circle" hoverClass="animate__fadeIn" />
      </template>
    </r-loading>
    <r-loading type="circular" v-if="flag" color="red">加载中。。。</r-loading>
    <r-loading type="spinner" v-if="flag" color="red" vertical
      >加载中。。。</r-loading
    >
    <r-loading type="circular" v-if="flag" size="24rpx"></r-loading>
    <r-loading type="spinner" v-if="flag" size="24rpx"></r-loading>
    <view style="width: 100%">
      <r-row gutter="20rpx" v-if="flag" wrap>
        <r-col span="8">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="8">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="8">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
      </r-row>
    </view>
    <view style="width: 100%">
      <r-row gutter="20rpx" v-if="flag" wrap>
        <r-col span="24">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="24">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
        <r-col span="24">
          <view style="background-color: aqua; height: 100px"></view>
        </r-col>
      </r-row>
    </view> -->
    <!-- <r-stepper v-model:value="stepperValue" ></r-stepper> -->

    <!-- <r-popup v-model:show="cShow" round position="bottom">
      <view style="height: 100px; background-color: #fff">11111</view>
    </r-popup> -->

    <r-popup v-model:show="cShow" round position="bottom">
      <r-cascader
        v-if="cShow"
        v-model:value="cascaderValue"
        title="请选择所在地区"
        :options="options"
        @close="cShow = false"
        @finish="onFinish"
      />
    </r-popup>

    <!-- <view @click="cShow = !cShow">打开</view> -->
    <!-- <r-overlay v-model:show="cShow" round position="bottom">
      <view style="height: 100px; background-color: #fff"></view>
    </r-overlay> -->
  </view>
</template>
<script setup>
import { ref } from "vue";
import useToast from "@/uni_modules/r-toast/components/r-toast/useToast";
const toastRef = ref(null);

const {
  showToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  closeToast,
} = useToast(toastRef);
const openToast = (type) => {
  if (type == 1) {
    showFailToast("失败了");
  } else if (type == 2) {
    showSuccessToast("成功了");
  } else if (type == 3) {
    showLoadingToast("加载中");
  } else {
    showToast("打开了弹窗");
  }
};
</script>
<!-- <script>
import { addTheme } from "@/uni_modules/r-theme/js_sdk/index.js";

export default {
  data() {
    return {
      cShow: false,
      cascaderValue: "",
      options: [
        {
          text: "浙江省",
          value: "330000",
          children: [
            {
              text: "杭州市",
              value: "330100",
              children: [
                {
                  text: "经开区",
                  value: "331110",
                },
              ],
            },
          ],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [
            {
              text: "南京市",
              value: "320100",
              children: [
                {
                  text: "经开区",
                  value: "320110",
                },
              ],
            },
          ],
        },
      ],
      tabActive: "tab1",
      title: "Hello",
      activeNames: [],
      rateValue: 1.8,
      stepperValue: 1,
      radioData: "",
      flag: true,
      checked: false,
      checkList: [],
      fieldValue: "",
      theme: "dark",
    };
  },
  mounted() {
    addTheme("dark", {
      "r-background": "var(--r-red)",
      "r-background-2": "var(--r-green)",
      "r-badge-color": "black",
    });
  },
  onLoad() {},
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.cShow = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    changeSwitch(e) {
      console.log("e", e);
    },
  },
};
</script> -->

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

<style>
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}

.r-badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}

.list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  grid-gap: 60rpx;
  padding: 60rpx;
}
</style>
