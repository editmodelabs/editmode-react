import axios from "axios";
const isBrowser = () => typeof window !== "undefined";

export const api = axios.create({
  baseURL: "https://api2.editmode.com/",
  headers: {
    Accept: "application/json",
    referrer: "",
  },
});
