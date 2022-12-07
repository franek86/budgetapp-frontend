import { axiosClient } from "../utils/Axios";

const createTransaction = async (...data) => {
  try {
    return await axiosClient.post("/transaction", ...data);
  } catch (error) {
    console.log(error);
  }
};

const getSingleTransaction = async (id) => {
  try {
    const response = await axiosClient.get(`/transaction/${id}`);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateTransaction = async (id, data) => {
  try {
    const response = await axiosClient.patch(`/transaction/${id}`, data);
    const updateData = await response.data.transUpdated;
    return updateData;
  } catch (error) {
    console.log(error);
  }
};

const getLatestTransactions = async () => {
  try {
    const response = await axiosClient.get("/transaction/latest");
    const latestTrans = await response.data;
    return latestTrans;
  } catch (error) {
    console.log(error);
  }
};

const getTransactions = async (page, perPage, duration, lastDate, searchData, categories) => {
  try {
    const response = await axiosClient.get(`/transaction?page=${page}&perPage=${perPage}&firstDate=${duration}&lastDate=${lastDate}&search=${searchData}&category=${categories}`);
    const trans = await response.data;
    return trans;
  } catch (error) {
    console.log(error);
  }
};

const deleteTransaction = async (id) => {
  try {
    return await axiosClient.delete(`/transaction/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export { createTransaction, getTransactions, getLatestTransactions, getSingleTransaction, updateTransaction, deleteTransaction };
