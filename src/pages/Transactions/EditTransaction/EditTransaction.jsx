import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import Title from "../../../components/Title/Title";
import FormInput from "../../../components/FormInput/FormInput";

import { getSingleTransaction } from "../../../querys/transactionsQuery.js";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery(["single-trans", id], () => getSingleTransaction(id));

  return (
    <div>
      <div className='flex align-items-center justify-content-between'>
        <Title>Edit transactions </Title>

        <div onClick={() => navigate(-1)} className='flex align-items-center justify-content-between transaction_link_create'>
          <MdArrowBack size='30' />
          <span>Back</span>
        </div>
      </div>

      <form className='form_wrapper'>
        <FormInput id='text_input' type='text' name='title' value={data?.title} label='Title' placeholder='Enter title' required />
        <FormInput id='amount_input' type='number' name='amount' value={data?.amount} label='Amount' placeholder='Enter amount' required />
      </form>
    </div>
  );
};

export default EditTransaction;
