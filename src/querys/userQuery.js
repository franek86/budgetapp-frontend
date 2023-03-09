import { axiosClient } from "../utils/Axios";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "../utils/LocalStorage.js";

const createUserBudget = async (id, data) => {
  const access_token = getUserFromLocalStorage();
  const config = {
    headers: { Authorization: `Bearer ${access_token.token}` },
  };
  try {
    const response = await axiosClient.patch(`/user/budget/${id}`, data, config);
    const updateBudget = await response.data;
    return updateBudget;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  const access_token = getUserFromLocalStorage();
  const config = {
    headers: { Authorization: `Bearer ${access_token.token}` },
  };
  try {
    const response = await axiosClient.get("/user/me", config);
    const { data } = await response;

    if (data.data === "token expired") {
      removeUserFromLocalStorage();
      window.location.href = "/";
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { createUserBudget, getUser };
