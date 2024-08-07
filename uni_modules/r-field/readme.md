# r-field

`r-field`输入框,用户可以在文本框内输入或编辑文字。

## 示例

```vue
<template>
  <view class="content">
    <!-- <r-badge :content="20" /> -->

    <r-config-provider>
      <view style="padding: 20px">基础用法</view>
      <r-cell-group inset>
        <r-field
          v-model:value="value"
          label="文本"
          placeholder="请输入用户名"
        />
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
  </view>
</template>
<script setup>
import { ref } from "vue";
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
```

## API

### Props

| 名称              | 说明                                                                                                                                         | 类型     | 默认值   | 可选值                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| value             | 当前输入的值                                                                                                                                 | any      | ''       | -                                                                                |
| label             | 输入框左侧文本                                                                                                                               | String   | ''       | -                                                                                |
| name              | 名称，作为提交表单时的标识符                                                                                                                 | String   | ''       | -                                                                                |
| type              | 输入框类型                                                                                                                                   | String   | `text`   | `text` `number` ` idcard` ` digit` `tel` ` password` `safe-password` ` nickname` |
| size              | 大小                                                                                                                                         | String   | `normal` | `large ` `normal`                                                                |
| maxlength         | 输入的最大字符数                                                                                                                             | Number   | 140      | -                                                                                |
| placeholder       | 输入框占位提示文字                                                                                                                           | String   | ''       | -                                                                                |
| border            | 是否显示内边框                                                                                                                               | Boolean  | true     | false                                                                            |
| disabled          | 是否禁用输入框                                                                                                                               | Boolean  | false    | true                                                                             |
| readonly          | 是否为只读状态，只读状态下无法输入内容                                                                                                       | Boolean  | false    | true                                                                             |
| colon             | 是否在 label 后面添加冒号                                                                                                                    | Boolean  | false    | true                                                                             |
| required          | 是否显示表单必填星号                                                                                                                         | Boolean  | false    | true                                                                             |
| center            | 是否使内容垂直居中                                                                                                                           | Boolean  | false    | true                                                                             |
| clearable         | 是否启用清除图标                                                                                                                             | Boolean  | false    | true                                                                             |
| clearIcon         | 清除图标名称,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性                                                     | String   | clear    | -                                                                                |
| clearPrefix       | 清除图标前缀类名,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 preifx 属性                                               | String   | van-icon | iconfont                                                                         |
| clearTrigger      | 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示                                                        | String   | `focus`  | `focus` `always`                                                                 |
| isLink            | 是否展示右侧箭头                                                                                                                             | Boolean  | false    | true                                                                             |
| showWordLimit     | 是否显示字数统计，需要设置 maxlength 属性                                                                                                    | Boolean  | false    | true                                                                             |
| error             | 是否将输入内容标红                                                                                                                           | Boolean  | false    | true                                                                             |
| errorMessage      | 底部错误提示文案，为空时不展示                                                                                                               | String   | ''       | -                                                                                |
| errorMessageAlign | 错误提示文案对齐方式                                                                                                                         | String   | `left`   | `center` `right` `left`                                                          |
| formatter         | 输入内容格式化函数                                                                                                                           | Function |          |                                                                                  |
| formatTrigger     | 格式化函数触发的时机                                                                                                                         | String   | -        | `onBlur` `onChange`                                                              |
| arrowDirection    | 箭头方向                                                                                                                                     | String   | `right`  | `left` `up` `down` `right`                                                       |
| labelClass        | 左侧文本额外类名                                                                                                                             | String   | -        | -                                                                                |
| labelWidth        | 左侧文本宽度                                                                                                                                 | String   | 6.2em    |                                                                                  |
| labelAlign        | 左侧文本对齐方式                                                                                                                             | String   | `left`   | `center` `right` `top` `left`                                                    |
| inputAlign        | 输入框对齐方式                                                                                                                               | String   | `left`   | `center` `right` `left`                                                          |
| leftIcon          | 左侧图标名称,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性                                                     | String   | ''       | -                                                                                |
| rightIcon         | 右侧图标名称,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 name 属性                                                     | String   | ''       | -                                                                                |
| iconPrefix        | 左/右侧图标类名前缀,等同于 [r-icon](https://ext.dcloud.net.cn/plugin?id=18668) 组件的 preifx 属性                                            | String   | van-icon | iconfont                                                                         |
| rules             | 表单校验规则                                                                                                                                 | Array    | []       | -                                                                                |
| themeName         | [r-theme](https://ext.dcloud.net.cn/plugin?id=18661) 主题名称                                                                                | String   | default  |                                                                                  |
| 其他              | `uniapp` [input](https://uniapp.dcloud.net.cn/component/input.html) [textarea](https://uniapp.dcloud.net.cn/component/textarea.html)的属性值 |          |          |                                                                                  |

### Slots

| 名称         | 说明                                                       | 参数      |
| ------------ | ---------------------------------------------------------- | --------- |
| label        | 自定义输入框左侧文本                                       |           |
| input        | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效 |           |
| leftIcon     | 自定义输入框头部图标                                       |           |
| rightIcon    | 自定义输入框尾部图标                                       |           |
| button       | 自定义输入框尾部按钮                                       |           |
| errorMessage | 自定义底部错误提示文案                                     | {message} |
| extra        | 自定义输入框最右侧的额外内容                               | -         |

### Events

| 名称           | 说明                                                                                                                                       | 参数                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| update:value   | 输入框内容变化时触发                                                                                                                       | value (当前输入的值) |
| change         | 输入框内容变化后触发                                                                                                                       | value (当前输入的值) |
| focus          | 输入框获得焦点时触发                                                                                                                       | event                |
| blur           | 输入框失去焦点时触发                                                                                                                       | event                |
| clear          | 点击清除按钮时触发                                                                                                                         | event                |
| click          | 点击组件时触发                                                                                                                             | event                |
| clickInput     | 点击输入区域时触发                                                                                                                         | event                |
| clickLeftIcon  | 点击左侧图标时触发                                                                                                                         | event                |
| clickRightIcon | 点击右侧图标时触发                                                                                                                         | event                |
| 其他           | `uniapp` [input](https://uniapp.dcloud.net.cn/component/input.html) [textarea](https://uniapp.dcloud.net.cn/component/textarea.html)的事件 |                      |


更多组件，请前往[rainui](https://ext.dcloud.net.cn/plugin?id=19701)