import axios from "axios";
import { generateUrl } from './'

export const api = axios.create({
  baseURL: generateUrl('api'),
  headers: {
    Accept: "application/json",
  },
});
