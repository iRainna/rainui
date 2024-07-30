<template>
  <r-config-provider :themeName="themeName">
    <page-header title="输入框"></page-header>
    <view style="padding: 20px">基础用法</view>
    <r-cell-group inset>
      <r-field v-model:value="value" label="文本" placeholder="请输入用户名" />
    </r-cell-group>
    <view style="padding: 20px">自定义类型</view>
    <r-cell-group inset>
      <!-- 输入任意文本 -->
      <r-field v-model:value="text" label="文本" />
      <!-- 输入手机号，调起手机号键盘 -->
      <r-field v-model:value="tel" type="tel" label="手机号" />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <r-field v-model:value="digit" type="digit" label="整数" />
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <r-field v-model:value="number" type="number" label="数字" />
      <!-- 输入密码 -->
      <r-field v-model:value="password" type="password" label="密码" />
    </r-cell-group>

    <view style="padding: 20px">禁用输入框</view>
    <r-cell-group inset>
      <r-field label="文本" v-model:value="readonlyValue" readonly />
      <r-field label="文本" v-model:value="disabledValue" disabled />
    </r-cell-group>
    <view style="padding: 20px">显示图标</view>
    <r-cell-group inset>
      <r-field
        v-model:value="value1"
        label="文本"
        left-icon="smile-o"
        right-icon="warning-o"
        placeholder="显示图标"
      />
      <r-field
        v-model:value="value2"
        clearable
        label="文本"
        left-icon="music-o"
        placeholder="显示清除图标"
      />
    </r-cell-group>

    <view style="padding: 20px">必填星号</view>
    <r-cell-group inset>
      <r-field
        v-model:value="username"
        required
        label="用户名"
        placeholder="请输入用户名"
      />
      <r-field
        v-model:value="phone"
        required
        label="手机号"
        placeholder="请输入手机号"
      />
    </r-cell-group>

    <view style="padding: 20px">自动展示星号</view>
    <r-form>
      <r-field
        v-model:value="username"
        name="username"
        :rules="[{ required: true }]"
        label="用户名"
        placeholder="请输入用户名"
      />
      <r-field
        v-model:value="phone"
        name="phone"
        :rules="[{ required: false }]"
        label="手机号"
        placeholder="请输入手机号"
      />
    </r-form>
    <view style="padding: 20px">错误提示</view>
    <r-cell-group inset>
      <r-field
        v-model:value="username"
        error
        label="用户名"
        placeholder="请输入用户名"
      />
      <r-field
        v-model:value="phone"
        label="手机号"
        placeholder="请输入手机号"
        error-message="手机号格式错误"
      />
    </r-cell-group>
    <view style="padding: 20px">插入按钮</view>
    <r-cell-group inset>
      <r-field
        v-model:value="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <r-button size="small" type="primary">发送验证码</r-button>
        </template>
      </r-field>
    </r-cell-group>
    <view style="padding: 20px">格式化输入内容</view>
    <r-cell-group inset>
      <r-field
        v-model:value="value1"
        label="文本"
        :formatter="formatter"
        placeholder="在输入时执行格式化"
      />
      <r-field
        v-model:value="value2"
        label="文本"
        :formatter="formatter"
        format-trigger="onBlur"
        placeholder="在失焦时执行格式化"
      />
    </r-cell-group>

    <view style="padding: 20px">使用textarea</view>
    <r-cell-group inset>
      <r-field
        v-model:value="message"
        rows="1"
        label="留言"
        type="textarea"
        placeholder="请输入留言"
      />
    </r-cell-group>

    <view style="padding: 20px">显示字数统计</view>
    <r-cell-group inset>
      <r-field
        v-model:value="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </r-cell-group>

    <view style="padding: 20px">输入框内容对齐</view>
    <r-cell-group inset>
      <r-field
        v-model:value="value"
        label="文本"
        placeholder="输入框内容右对齐"
        input-align="right"
      />
    </r-cell-group>

    <view style="padding: 20px">输入框文本位置</view>
    <r-cell-group inset>
      <r-field
        v-model:value="value"
        label="文本"
        placeholder="顶部对齐"
        label-align="top"
      />
      <r-field
        v-model:value="value2"
        label="文本"
        placeholder="左对齐"
        label-align="left"
      />
      <r-field
        v-model:value="value3"
        label="文本"
        placeholder="居中对齐"
        label-align="center"
      />
      <r-field
        v-model:value="value4"
        label="文本"
        placeholder="右对齐"
        label-align="right"
      />
    </r-cell-group>
  </r-config-provider>
</template>
<script setup>
import { ref } from "vue";
import useTheme from "@/hooks/useTheme";
const { themeName } = useTheme();
const value = ref("");
const tel = ref("");
const text = ref("");
const digit = ref("");
const number = ref("");
const password = ref("");
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const username = ref("");
const phone = ref("");
const message = ref("");
const sms = ref("");
const readonlyValue = ref("输入框只读");
const disabledValue = ref("输入框已禁用");
// 过滤输入的数字
const formatter = (value) => value.replace(/\d/g, "");
</script>
