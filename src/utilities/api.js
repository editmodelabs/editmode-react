import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.editmode.com/",
  headers: {
    Accept: "application/json",
    referrer: typeof window !== "undefined" ? window.location.href : "",
  },
});
