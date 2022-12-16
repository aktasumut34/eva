<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useDailySalesSkuListStore } from "../store";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/vue/20/solid";
const dailySalesSkuListStore = useDailySalesSkuListStore();
const formatCurrency = (value: number | string) => {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return "";
  }
  return dailySalesSkuListStore.Currency + " " + value.toFixed(2);
};
const localPage = ref(1);
const items = computed(() => {
  let pg = localPage.value > 3 ? localPage.value % 3 : localPage.value;
  pg = pg === 0 ? 3 : pg;
  return dailySalesSkuListStore.item?.skuList.slice((pg - 1) * 10, pg * 10);
});

const changeLocalPage = (val: number) => {
  localPage.value += val;
  if (localPage.value <= 1) {
    localPage.value = 1;
  } else if (
    (localPage.value % 3 === 1 && val === 1) ||
    (localPage.value % 3 === 0 && val === -1)
  ) {
    dailySalesSkuListStore.pageNumber = Math.ceil(localPage.value / 3);
    dailySalesSkuListStore.fetchDailySalesSkuList();
  }
};
let selectedDays = computed(() => {
  return [dailySalesSkuListStore.salesDate, dailySalesSkuListStore.salesDate2];
});
watch(selectedDays, () => {
  localPage.value = 1;
});
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 relative" v-if="dailySalesSkuListStore.item">
    <div
      v-if="dailySalesSkuListStore.isLoading"
      class="absolute top-0 right-0 w-full h-full bg-black/30 text-white z-[9999] flex items-center justify-center"
    >
      Loading...
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Product Name
                  </th>
                  <th
                    v-if="dailySalesSkuListStore.salesDate"
                    scope="col"
                    class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-1/6"
                  >
                    <div class="flex flex-col items-end">
                      <span>
                        {{
                          new Date(
                            dailySalesSkuListStore.salesDate
                          ).toLocaleDateString("en-US", { weekday: "long" })
                        }}
                      </span>
                      <span>{{ dailySalesSkuListStore.salesDate }}</span>
                      <span>Sales / Units</span>
                      <span>Avg. Selling Price</span>
                    </div>
                  </th>
                  <th
                    v-if="dailySalesSkuListStore.salesDate2"
                    scope="col"
                    class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 w-1/6"
                  >
                    <div class="flex flex-col items-end">
                      <span>
                        {{
                          new Date(
                            dailySalesSkuListStore.salesDate2
                          ).toLocaleDateString("en-US", { weekday: "long" })
                        }}
                      </span>
                      <span>{{ dailySalesSkuListStore.salesDate2 }}</span>
                      <span>Sales / Units</span>
                      <span>Avg. Selling Price</span>
                    </div>
                  </th>
                  <th v-if="dailySalesSkuListStore.isDaysCompare"></th>
                  <th
                    scope="col"
                    class="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    SKU Refund Rate
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(item, index) in items" :key="index">
                  <td
                    class="py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-6"
                  >
                    {{ item.sku }}
                  </td>
                  <td class="px-3 py-4 text-base text-gray-500">
                    {{ item.productName }}
                  </td>
                  <td class="px-3 py-4 text-base text-[#469190] font-bold">
                    <div class="flex flex-col items-end">
                      <span>
                        {{ formatCurrency(item.amount) }} /
                        {{ item.qty }}
                      </span>
                      <span>
                        {{
                          item.qty > 0
                            ? formatCurrency(item.amount / item.qty)
                            : formatCurrency(0)
                        }}</span
                      >
                    </div>
                  </td>
                  <td
                    v-if="dailySalesSkuListStore.isDaysCompare"
                    class="px-3 py-4 text-base text-[#4d943e] font-bold"
                  >
                    <div class="flex flex-col items-end">
                      <span>
                        {{ formatCurrency(item.amount2) }} /
                        {{ item.qty2 }}
                      </span>
                      <span>
                        {{
                          item.qty2 > 0
                            ? formatCurrency(item.amount2 / item.qty2)
                            : formatCurrency(0)
                        }}</span
                      >
                    </div>
                  </td>
                  <td v-if="dailySalesSkuListStore.isDaysCompare">
                    <div class="flex items-center justify-center">
                      <ChevronDownIcon
                        class="text-red-500 h-6 w-6"
                        v-if="item.qty > item.qty2"
                      />
                      <ChevronUpIcon
                        class="text-green-500 h-6 w-6"
                        v-else-if="item.qty < item.qty2"
                      />
                    </div>
                  </td>
                  <td class="px-3 py-4 text-base text-gray-500 text-right">
                    {{ item.skuRefundRate?.toFixed(2) }} %
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <th
                  class="py-2"
                  :colspan="dailySalesSkuListStore.salesDate2 ? 6 : 5"
                >
                  <div class="flex justify-end">
                    <div
                      class="inline-flex items-center gap-4 bg-gray-100 rounded-md py-2 px-1 mr-2"
                    >
                      <button @click="changeLocalPage(-1)">
                        <ChevronLeftIcon class="h-6 w-6 text-blue-700" />
                      </button>
                      <div class="rounded-full h-6 w-6 bg-blue-700 text-white">
                        {{ localPage }}
                      </div>
                      <button @click="changeLocalPage(1)">
                        <ChevronRightIcon class="h-6 w-6 text-blue-700" />
                      </button>
                    </div>
                  </div>
                </th>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
