import axios from "axios";

export const api = axios.create({
  baseURL: "http://api.lvh.me:3002/",
  headers: {
    Accept: "application/json",
  },
});
