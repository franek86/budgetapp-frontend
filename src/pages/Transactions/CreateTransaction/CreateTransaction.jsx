import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import Title from "../../../components/Title/Title";
import Select from "react-select";
import DatePicker from "react-date-picker";

import "react-toastify/dist/ReactToastify.css";
import "./createTransaction.scss";

import { getCategories } from "../../../querys/categoriesQuery";
import { createTransaction } from "../../../querys/transactionsQuery";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CreateTransaction = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery(["ctgs"], getCategories, { refetchOnWindowFocus: false });

  //categories in select
  const selectOptions = data?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  //init calendar
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState("");


  //create transaction
  const { mutateAsync, isSuccess, isLoading } = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      toast("Succesfully created new transaction!");
      navigate("/transactions");
    },
    onError: () => {
      toast("Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({ title: title, amount: amount, date: date, categories: categories.value });
  };



  return (
    <>
  
      <div className="flex align-items-center justify-content-between">
        <Title>Create transactions </Title>

        <div onClick={() => navigate(-1)} className="flex align-items-center justify-content-between transaction_link_create">
          <MdArrowBack size="30" />
          <span>Back</span>
        </div>
      </div>

      <form className="form_wrapper" onSubmit={handleSubmit}>
        <div className="form_group">
          <label className="form_label" htmlFor="text_input">
            <span>Title</span>
            <input id="text_input" type="text" name="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form_input" placeholder="Title" required/>
          </label>
          <span className="text-danger">error</span>
        </div> 

        <div className="form_group">
          <label className="form_label" htmlFor="amount_input">
            <span>Amount</span>
            <input id="amount_input" type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="form_input" placeholder="Amount" required/>
          </label>
          <span className="text-danger">error</span>
        </div>

        <div className="form_group">
          <label className="form_label" htmlFor="date_input">
            <span>Date</span>
            <DatePicker id="date_input" className="form_date" name="date" value={date} onChange={setDate} calendarIcon={null} format="dd.MM.y" readOnly />
          </label>
        </div>

        <div className="form_group">
          <label className="form_label" htmlFor="select_input">
            <span>Categories</span>
            <Select id="select_input" name="categories" value={categories} onChange={setCategories} options={selectOptions} className="form_select" classNamePrefix="select" required/>
          </label>
          <span className="text-danger">error</span>
        </div>
        <div className="form_group">
          {isLoading ? (
            "Loading ..."
          ) : (
            <button className="form_btn" type="submit">
              Create
            </button>
          )}
        </div>
      </form>

      {isSuccess ? <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" /> : null}
    </>
  );
};

export default CreateTransaction;
