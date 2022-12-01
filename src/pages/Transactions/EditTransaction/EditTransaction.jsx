import React from "react";


import Title from "../../../components/Title/Title";
import FormInput from "../../../components/FormInput/FormInput";

/* import { getSingleTransaction } from "../../../querys/transactionsQuery.js"; */

const EditTransaction = (data) => {

 /*  const { data } = useQuery( ["single-trans", id],() => getSingleTransaction(id), {keepPreviousData: false }); */

  return (
    <div>
      <div className='flex align-items-center justify-content-between'>
        <Title>Edit transactions </Title>
      </div>

      <form className='form_wrapper'>
        <FormInput id='text_input' type='text' name='title' value={data?.title} label='Title' placeholder='Enter title' required />
        <FormInput id='amount_input' type='number' name='amount' value={data?.amount} label='Amount' placeholder='Enter amount' required />
      </form>
    </div>
  );
};

export default EditTransaction;
