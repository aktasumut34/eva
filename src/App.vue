<script setup lang="ts">
import { onMounted } from "vue";
import Chart from "./components/Chart.vue";
import Table from "./components/Table.vue";
import {
  useAuthStore,
  useDailySalesStore,
  useDailySalesSkuListStore,
} from "./store";
const authStore = useAuthStore();
const dailySalesStore = useDailySalesStore();
const dailySalesSkuListStore = useDailySalesSkuListStore();
onMounted(async () => {
  await authStore.login();
  await dailySalesStore.fetchDailySalesOverview();
});
</script>

<template>
  <div class="p-4">
    <Chart />
    <Table />
  </div>
</template>
