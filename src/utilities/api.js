import axios from "axios";

export const api = axios.create({
  baseURL: "https://api2.editmode.com/",
  headers: {
    Accept: "application/json",
    "Editmode-Referrer": window.location.href,
  }
});
