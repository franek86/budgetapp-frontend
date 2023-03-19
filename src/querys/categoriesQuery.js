import { axiosClient } from "../utils/Axios";

const getCategories = async () => {
  const response = await axiosClient.get("/category");
  const cat = await response.data.categories;
  return cat;
};

const createCategory = async (...data) => {
  try {
    return await axiosClient.post("/category", ...data);
  } catch (error) {
    console.log(error);
  }
};

export { getCategories, createCategory };
