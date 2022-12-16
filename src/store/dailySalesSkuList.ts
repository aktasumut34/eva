import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import {
  type DailySalesSkuListAPIOptions,
  type DailySalesSkuListAPIResponse,
} from "../types/dailySalesSkuList";
import { useDailySalesStore } from "./dailySales";

type Loading = {
  isLoading: boolean;
};

export const useDailySalesSkuListStore = defineStore("dailySalesSkuList", {
  state: (): DailySalesSkuListAPIResponse &
    DailySalesSkuListAPIOptions &
    Loading => ({
    isLoading: false,
    isDaysCompare: 0,
    pageNumber: 1,
    pageSize: 30,
    salesDate: undefined,
    salesDate2: undefined,
    Currency: "",
    item: undefined,
  }),
  actions: {
    setSalesDate(date: string | undefined) {
      this.salesDate = date;
    },
    setSalesDate2(date: string | undefined) {
      if (this.salesDate === undefined) return;
      this.salesDate2 = date;
      if (this.salesDate2 !== undefined) this.isDaysCompare = 1;
      else this.isDaysCompare = 0;
    },
    setPageNumber(pageNumber: number) {
      this.pageNumber = pageNumber;
    },
    async fetchDailySalesSkuList() {
      const { user, token } = useAuthStore();
      if (!token) return;
      try {
        this.isLoading = true;
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/data/daily-sales-sku-list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              marketplace: user?.store[0].marketplaceName,
              sellerId: user?.store[0].storeId,
              salesDate: this.salesDate,
              salesDate2: this.salesDate2,
              pageNumber: this.pageNumber,
              pageSize: this.pageSize,
              isDaysCompare: this.isDaysCompare,
            }),
          }
        );
        const data: DailySalesSkuListAPIResponse = (await response.json()).Data;
        this.Currency = data.Currency;
        this.item = data.item;
        await this.fetchSkuRefundRate();
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSkuRefundRate() {
      const { user, token } = useAuthStore();
      const { day } = useDailySalesStore();
      if (!token) return;
      try {
        this.isLoading = true;
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/data/get-sku-refund-rate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              marketplace: user?.store[0].marketplaceName,
              sellerId: user?.store[0].storeId,
              skuList: this.item?.skuList,
              requestedDay: day,
            }),
          }
        );
        const data = (await response.json()).Data;
        this.item?.skuList.forEach((sku) => {
          sku.skuRefundRate = data.find(
            (d: any) => d.sku.sku === sku.sku
          ).refundRate;
        });
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
