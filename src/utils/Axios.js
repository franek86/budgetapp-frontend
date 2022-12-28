import axios from "axios";
import { getUserFromLocalStorage } from "./LocalStorage.js";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  "Access-Control-Allow-Credentials": true,
  headers: {
    Authorization: `Bearer ${getUserFromLocalStorage()}`,
  },
});

export { axiosClient };
