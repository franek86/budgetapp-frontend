import { axiosClient } from "../utils/Axios";

const login = async ({ username, password }) => {
  const response = await axiosClient.post("/auth/login", { username, password });
  return response.data;
};

const register = async ({ ...data }) => {
  const response = await axiosClient.post("/auth/register", { ...data });
  return response.data;
};

export { login, register };
