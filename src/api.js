import axios from "axios";

const devMode = false;

export const api = axios.create({
  baseURL: devMode ? "http://api.lvh.me:3002/" : "https://api.editmode.com/",
  headers: {
    Accept: "application/json",
  },
});
