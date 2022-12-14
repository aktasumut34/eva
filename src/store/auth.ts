import { defineStore } from "pinia";
import { type LoginApiResponse, type User } from "../types/auth";

export const useAuthStore = defineStore("auth", {
  state: (): {
    user: User | null;
    token: string | null;
  } => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.user;
    },
  },
  actions: {
    async login() {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/user/auth",
          {
            method: "POST",
            body: JSON.stringify({
              email: import.meta.env.VITE_EMAIL,
              password: import.meta.env.VITE_PASSWORD,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: LoginApiResponse = (await response.json()).Data;
        this.user = data.user;
        this.token = data.token;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
