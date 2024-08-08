<template>
  <div>
    <iframe
      :src="`http://static-mp-a73ed887-bbaf-4905-8d7a-718d0006cd63.next.bspapp.com/#/${name}`"
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
