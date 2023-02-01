import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../querys/userQuery.js";
import formatCurrency from "../../utils/FormatCurrency.js";
import Loader from "../Loader/Loader.jsx";

const TotalBudget = () => {
  const { data, isLoading } = useQuery(["user"], getUser);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-column align-center mb-3'>
          <div className='label mr-1'>Total budget:</div>
          <h2 className='font-600'>{formatCurrency(data?.budget)}</h2>
        </div>
      )}
    </>
  );
};

export default TotalBudget;
