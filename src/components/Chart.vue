<script setup lang="ts">
import Highcharts from "highcharts";
import { ref } from "vue";

const props = defineProps<{}>();

const chart = ref<HTMLDivElement | null>(null);
if (!chart.value) return;
Highcharts.chart(chart.value, {});
</script>
<template>
  <div ref="chart"></div>
</template>

<style scoped></style>
