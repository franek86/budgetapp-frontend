import { axiosClient } from "../utils/Axios";

const createTransaction = async (...data) => {
  return await axiosClient.post("/transaction", ...data);
};

const getTransactions = async (page, perPage, duration, searchData, categories) => {
  const response = await axiosClient.get(`/transaction?page=${page}&perPage=${perPage}&firstDate=${duration}&search=${searchData}&category=${categories}`);
  const trans = await response.data;
  return trans;
};

export { createTransaction, getTransactions };