import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
});

export { axiosClient };
