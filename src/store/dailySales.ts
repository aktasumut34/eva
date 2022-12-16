import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import {
  type DailySalesOverviewAPIResponse,
  type DailySalesOverviewAPIOptions,
} from "../types/dailySales";

type Loading = {
  isLoading: boolean;
};

export const useDailySalesStore = defineStore("dailySales", {
  state: (): DailySalesOverviewAPIResponse &
    DailySalesOverviewAPIOptions &
    Loading => ({
    Currency: "",
    item: [],
    isYoyExist: false,
    day: 7,
    isLoading: false,
  }),
  actions: {
    setDay(day: number) {
      this.day = day;
    },
    async fetchDailySalesOverview() {
      const { user, token } = useAuthStore();
      if (!token) return;
      try {
        this.isLoading = true;
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/data/daily-sales-overview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              marketplace: user?.store[0].marketplaceName,
              sellerId: user?.store[0].storeId,
              day: this.day,
            }),
          }
        );
        const data: DailySalesOverviewAPIResponse = (await response.json())
          .Data;
        this.Currency = data.Currency;
        this.item = data.item;
        this.isYoyExist = data.isYoyExist;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
