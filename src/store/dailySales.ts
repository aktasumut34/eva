import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import {
  type DailySalesOverviewAPIResponse,
  type DailySalesOverviewAPIOptions,
} from "../types/dailySales";

export const useDailySalesStore = defineStore("dailySales", {
  state: (): DailySalesOverviewAPIResponse & DailySalesOverviewAPIOptions => ({
    Currency: "",
    item: [],
    isYoyExist: false,
    day: 30,
  }),
  actions: {
    async fetchDailySalesOverview() {
      const { user, token } = useAuthStore();
      if (!token) return;
      try {
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
