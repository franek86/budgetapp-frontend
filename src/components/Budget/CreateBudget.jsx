import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp, HiPlus } from "react-icons/hi";
import Loader from "../Loader/Loader.jsx";
import { NumericFormat } from "react-number-format";
import { createUserBudget } from "../../querys/userQuery.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "./budget.scss";
import { useAuthContext } from "../../context/AuthContext.jsx";

const CreateBudget = () => {
  const [toggleInput, setToggleInput] = useState(false);
  const [budgetValue, setBudgetValue] = useState({ budget: 0 });
  const { userId } = useAuthContext();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError, isSuccess, error } = useMutation(() => createUserBudget(userId, budgetValue), {
    onSuccess: () => {
      setBudgetValue("");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      console.log("Something went wrong!");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({ budget: budgetValue });
  };

  return (
    <div className='budget_create'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? <div>An error occurred: {error.message}</div> : null}
          {isSuccess ? <div>Add budget</div> : null}

          <div className='btn btn-success' onClick={() => setToggleInput(!toggleInput)}>
            <div className='flex justify-between align-center'>
              <span>Add Budget</span>
              {!toggleInput ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}
            </div>
          </div>
          <form className={`${toggleInput ? "open" : ""} form_wrapper mt-2`} onSubmit={handleSubmit}>
            <div className='form_group'>
              <label className='form_label'>
                <NumericFormat
                  className='form_input'
                  thousandSeparator={true}
                  prefix={"€"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  onValueChange={(values) => {
                    setBudgetValue({ budget: values.floatValue });
                  }}
                />
              </label>
              <button className='btn' type='submit'>
                <HiPlus />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateBudget;
