import { axiosClient } from "../utils/Axios";

const createTransaction = async (...data) => {
  try {
    return await axiosClient.post("/transaction", ...data);
  } catch (error) {
    console.log(error)
  }
};

const getSingleTransaction = async (id) => {
  try {
    const response = await axiosClient.get(`/transaction/${id}`);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error)
  }
};

const updateTransaction = async (id,data) => {
  try {
    const response = await axiosClient.patch(`/transaction/${id}`, data);
    const updateData = await response.data.transUpdated;
    return updateData;
  } catch (error) {
    console.log(error)
  }
 
}


const getTransactions = async (page, perPage, duration, searchData, categories) => {
  try {
    const response = await axiosClient.get(`/transaction?page=${page}&perPage=${perPage}&firstDate=${duration}&search=${searchData}&category=${categories}`);
    const trans = await response.data;
    return trans;
  } catch (error) {
    console.log(error)
  }
};

const deleteTransaction = async (id) => {
  try {
    return await axiosClient.delete(`/transaction/${id}`);;
  } catch (error) {
    console.log(error)
  }
}

export { createTransaction, getTransactions, getSingleTransaction, updateTransaction, deleteTransaction };
