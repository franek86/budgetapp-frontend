import { axiosClient } from "../utils/Axios";

const login = async ({ username, password }) => {
  const response = await axiosClient.post("/auth/login", { username, password });
  return response.data;
};

export { login };
