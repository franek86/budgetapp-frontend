import { axiosClient } from "../utils/Axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = async ({ username, password }) => {
  const response = await axiosClient.post("/auth/login", { username, password });
  return response.data;
};

const register = async ({ ...data }) => {
  try {
    const response = await axiosClient.post("/auth/register", { ...data });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    }
  }
};

export { login, register };
