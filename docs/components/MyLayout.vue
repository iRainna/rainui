<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from "vitepress/theme";
import SimulatorH5 from "./SimulatorH5.vue";
import { useData } from "vitepress";
import { pathName } from "../components/hooks/usePath";
const { Layout } = DefaultTheme;
const { params } = useData();
</script>

<template>
  <Layout>
    <template #aside-top>
      <SimulatorH5 :name="pathName"></SimulatorH5>
    </template>
  </Layout>
</template>
