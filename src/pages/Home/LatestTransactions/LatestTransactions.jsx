import React from "react";
import formatDate from "../../../utils/LuxonFormat.js";
import formatCurrency from "../../../utils/FormatCurrency.js";

import { useQuery } from "@tanstack/react-query";
import { getLatestTransactions } from "../../../querys/transactionsQuery";

import "./latestTransactions.scss";
import Loader from "../../../components/Loader/Loader";

const LatestTransactions = () => {
  const { data, isLoading } = useQuery(["latestTrans"], getLatestTransactions, { refetchOnWindowFocus: false });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className='latest-transaction grid column-gap'>
      {data?.map((item) => (
        <div className='card column-2 column-sm-1 column-md-2 column-lg-4' key={item._id}>
          <div className='card_date'>
            <div className='label'>Date:</div>
            <div>{formatDate(item.date)}</div>
          </div>
          <div className='card_title'>
            <div className='label'>Info:</div>
            <div>{item.title}</div>
          </div>

          <div className='card_category'>
            <div className='label'>Category:</div>
            <div className='category'>{item.categories.slug}</div>
          </div>
          <div className='card_amount'>
            <div className='label'>Amount:</div>
            <div className='amount'>{formatCurrency(item.amount)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestTransactions;
