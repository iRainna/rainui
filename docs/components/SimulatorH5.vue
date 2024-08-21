<template>
  <div>
    <iframe
      :src="`https://rainui.cn/h5/index.html#/${name}`"
      width="360"
      height="640"
      style="border: solid 1px #999999; border-radius: 10px; overflow: hidden"
      id="iframe"
      frameborder="no"
      border="0"
    >
    </iframe>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>
