import { axiosClient } from "../utils/Axios";
import { getUserFromLocalStorage } from "../utils/LocalStorage.js";

const createTransaction = async (...data) => {
  try {
    const access_token = getUserFromLocalStorage();
    const config = {
      headers: { Authorization: `Bearer ${access_token.token}` },
    };
    return await axiosClient.post("/transaction", ...data, config);
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
    const access_token = getUserFromLocalStorage();
    const config = {
      headers: { Authorization: `Bearer ${access_token.token}` },
    };
    const response = await axiosClient.get("/transaction/latest", config);
    const latestTrans = await response.data;
    return latestTrans;
  } catch (error) {
    console.log(error);
  }
};

const getQueryTransactions = async (page, perPage, duration, lastDate, searchData, categories) => {
  try {
    const access_token = getUserFromLocalStorage();
    const config = {
      headers: { Authorization: `Bearer ${access_token.token}` },
    };
    const response = await axiosClient.get(`/transaction?page=${page}&perPage=${perPage}&firstDate=${duration}&lastDate=${lastDate}&search=${searchData}&category=${categories}`, config);
    const trans = await response.data;
    return trans;
  } catch (error) {
    console.log(error);
  }
};

const getAllTransactions = async (duration) => {
  try {
    const response = await axiosClient.get(`/transaction/all?firstDate=${duration}`);
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

export { createTransaction, getQueryTransactions, getLatestTransactions, getSingleTransaction, updateTransaction, deleteTransaction, getAllTransactions };
