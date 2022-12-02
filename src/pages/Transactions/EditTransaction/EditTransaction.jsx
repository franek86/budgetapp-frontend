import React, {useState} from "react";
import { DateTime } from "luxon";
import { ToastContainer, toast } from "react-toastify";

import Title from "../../../components/Title/Title";
import FormInput from "../../../components/FormInput/FormInput";
import Select from "react-select";
import DatePicker from "react-date-picker";

import { getCategories } from "../../../querys/categoriesQuery";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTransaction } from "../../../querys/transactionsQuery";
import Loader from "../../../components/Loader/Loader";

const EditTransaction = (data) => {

  const queryClient = useQueryClient();
  const { data:catData } = useQuery(["ctgs"], getCategories, { refetchOnWindowFocus: false });
  //categories in select
  const selectOptions = catData?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const [values, setValues] = useState({
    title: data.title,
    date: DateTime.fromISO(data.date).toJSDate(),
    amount: data.amount,
    categories: data.categories,
  });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setValues({ ...values, categories: e.value });
  };

  const handleDates = (e) => {
    setValues({ ...values, date: e });
  };


  const { mutate, isSuccess, isError, isLoading } = useMutation(updateTransaction(data._id, values),{
      onSuccess: () => {
        toast("Succesfully edit new transaction!");
      },
      onError: () => {
        toast("Something went wrong!");
      },
    }
  );

 

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
    queryClient.invalidateQueries({queryKey:["trans"]})
  };


 
  if(isLoading){
    return <Loader />
  } 

  return (
    <div>

      <div className='flex align-items-center justify-content-between'>
        <Title>Edit transactions </Title>
      </div>

      <form className='form_wrapper' onSubmit={handleSubmit}>
        <FormInput id='text_input' type='text' name='title' value={values.title} label='Title' placeholder={data.title} onChange={handleOnChange}/>
        <FormInput id='amount_input' type='number' name='amount' value={values.amount} label='Amount' placeholder={data.amount} onChange={handleOnChange}/>

        <div className='form_group'>
          <label className='form_label' htmlFor='date_input'>
            <span>Date</span>
            <DatePicker id='date_input' className='form_date' name='date' value={values.date} onChange={handleDates} calendarIcon={null} format='dd.MM.y' readOnly />
          </label>
        </div>

        <div className='form_group'>
          <label className='form_label' htmlFor='select_input'>
            <span>Categories</span>
            <Select id='select_input' name='categories' defaultValue={data.categories.slug} onChange={handleSelect} options={selectOptions} className='form_select' classNamePrefix='select' required />
          </label>
        </div>

        <div className='form_group'>
          <button className='form_btn' type='submit'>
            Edit
          </button>
        </div>
      
      </form>

      {isSuccess && <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />}
      {isError && <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />}
    
    </div>
  );
};

export default EditTransaction;
