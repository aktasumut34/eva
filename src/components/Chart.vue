<script setup lang="ts">
import { Chart } from "highcharts-vue";
import { ref, watch, reactive, computed } from "vue";
import Select from "./Select.vue";
import { useDailySalesStore, useDailySalesSkuListStore } from "../store";
const dailySalesStore = useDailySalesStore();
const dailySalesSkuListStore = useDailySalesSkuListStore();

const items = computed(() => dailySalesStore.item);
const theChart = ref<{ chart: Highcharts.Chart }>();
const chartOptions = reactive<Highcharts.Options>({
  chart: {
    type: "column",
  },
  title: {
    align: "left",
    text: "Daily Sales",
  },
  yAxis: {
    min: 0,
  },
  plotOptions: {
    series: {
      stacking: "normal",
      cursor: "pointer",
      point: {
        events: {
          click: function (evt) {
            if (theChart.value?.chart) {
              let selectedPoints = theChart.value.chart.getSelectedPoints();
              if (selectedPoints.length >= 2) {
                selectedPoints[0].select(false);
              }
              evt.point.select(true, true);
              setSelectedDates();
            }
          },
        },
      },
    },
  },
  tooltip: {
    formatter() {
      // @ts-ignore
      const shipping = this.points?.[0].point.options.shipping;
      // @ts-ignore
      const totalSales = this.points?.[0].point.options.totalSales;
      return `<span><strong>Total Sales:</strong> ${
        totalSales + dailySalesStore.Currency
      }</span><br/><span><strong>Shipping:</strong> ${
        shipping + dailySalesStore.Currency
      }</span><br/><span><strong>Profit:</strong> ${
        this.points?.[0].point.y + dailySalesStore.Currency
      }</span><br/><span><strong>FBA Sales:</strong> ${
        this.points?.[1].point.y + dailySalesStore.Currency
      }</span><br/><span><strong>FBM Sales:</strong> ${
        this.points?.[2].point.y + dailySalesStore.Currency
      }</span><br/>
        `;
    },
    shared: true,
  },
});

const setSelectedDates = async () => {
  if (theChart.value?.chart) {
    let selectedPoints = theChart.value.chart.getSelectedPoints();
    switch (selectedPoints.length) {
      case 0:
        dailySalesSkuListStore.setSalesDate(undefined);
        dailySalesSkuListStore.setSalesDate2(undefined);
        break;
      case 1:
        dailySalesSkuListStore.setSalesDate(
          selectedPoints[0].category.toString()
        );
        dailySalesSkuListStore.setSalesDate2(undefined);
        break;
      case 2:
        dailySalesSkuListStore.setSalesDate(
          selectedPoints[0].category.toString()
        );
        dailySalesSkuListStore.setSalesDate2(
          selectedPoints[1].category.toString()
        );
        break;
    }
    dailySalesSkuListStore.pageNumber = 1;
    await dailySalesSkuListStore.fetchDailySalesSkuList();
  }
};

watch(items, (newItems) => {
  chartOptions.xAxis = {
    categories: newItems.map((item) =>
      new Date(item.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    ),
  };
  chartOptions.series = [
    {
      type: "column",
      data: newItems.map((item) => {
        return {
          y: item.profit,
          totalSales: item.fbaAmount + item.fbmAmount,
          shipping: item.fbaShippingAmount + item.fbmShippingAmount,
        };
      }),
      name: "Profit",
      color: "#71ecc5",
    },
    {
      type: "column",
      data: newItems.map((item) => {
        return { y: item.fbaAmount };
      }),
      name: "FBA Sales",
      color: "#7f85e9",
    },
    {
      type: "column",
      data: newItems.map((item) => {
        return { y: item.fbmAmount };
      }),
      name: "FBM Sales",
      color: "#5d33eb",
    },
  ];
});
</script>

<template>
  <div class="p-4 bg-white rounded-md shadow-lg flex flex-col relative">
    <div
      v-if="dailySalesStore.isLoading"
      class="absolute top-0 right-0 w-full h-full bg-black/30 text-white z-[9999] flex items-center justify-center"
    >
      Loading...
    </div>
    <Select class="self-end" />
    <Chart :options="chartOptions" ref="theChart" />
  </div>
</template>
