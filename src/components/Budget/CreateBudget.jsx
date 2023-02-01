import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import "./budget.scss";
import { NumericFormat } from "react-number-format";

import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getUser } from "../../querys/userQuery.js";

const CreateBudget = () => {
  const [toggleInput, setToggleInput] = useState(false);
  const queryClient = useQueryClient();
  const [budget, setBudget] = useState("");

  return (
    <div className='budget_create'>
      <div className='btn btn-success' onClick={() => setToggleInput(!toggleInput)}>
        <div className='flex justify-between align-center'>
          <span>Add Budget</span>
          {!toggleInput ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}
        </div>
      </div>
      <form className={`${toggleInput ? "open" : ""} form_wrapper mt-2`}>
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
                setBudget(values.value);
              }}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default CreateBudget;
