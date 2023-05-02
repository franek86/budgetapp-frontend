import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllTransactions } from "../../querys/transactionsQuery";
import formatCurrency from "../../utils/FormatCurrency.js";

const Spending = () => {
  const { data } = useQuery(["transAll"], () => getAllTransactions());

  const totalSpendings = data?.reduce((acc, product) => {
    return acc + product.amount;
  }, 0);

  return (
    <div className='flex flex-column align-center mb-3'>
      <div className='label mr-1'>Total spendings:</div>
      <h2 className='font-600'>{formatCurrency(totalSpendings)}</h2>
    </div>
  );
};

export default Spending;
