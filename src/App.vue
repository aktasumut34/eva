<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "./store/auth";
import { useDailySalesStore } from "./store/dailySales";
const authStore = useAuthStore();
const dailySalesStore = useDailySalesStore();
onMounted(async () => {
  await authStore.login();
  await dailySalesStore.fetchDailySalesOverview();
});
</script>

<template>
  <div>{{ authStore.user?.store[0].marketplaceName }}</div>
</template>
