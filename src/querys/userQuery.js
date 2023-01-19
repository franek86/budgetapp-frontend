import { axiosClient } from "../utils/Axios";

const createUserBudget = async (id, data) => {
  try {
    const response = await axiosClient.patch(`/user/budget/${id}`, data);
    const updateBudget = await response.data.saveUserBudget;
    return updateBudget;
  } catch (error) {
    console.log(error);
  }
};

export { createUserBudget };
