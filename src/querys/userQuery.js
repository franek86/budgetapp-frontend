import { axiosClient } from "../utils/Axios";
import { getUserFromLocalStorage } from "../utils/LocalStorage.js";

const createUserBudget = async (id, data) => {
  try {
    const response = await axiosClient.patch(`/user/budget/${id}`, data);
    const updateBudget = await response.data.saveUserBudget;
    return updateBudget;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (id) => {
  const access_token = getUserFromLocalStorage();
  const config = {
    headers: { Authorization: `Bearer ${access_token.token}` },
  };
  try {
    const response = await axiosClient.get("/user/me", config);
    const { data } = await response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { createUserBudget, getUser };
