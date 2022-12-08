import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MdClose, MdOutlineDeleteForever, MdModeEditOutline } from "react-icons/md";
import formatDate from "../../utils/LuxonFormat";
import formatCurrency from "../../utils/FormatCurrency";

import EditTrasaction from "./EditTransaction/EditTransaction";

import { useThemeContext } from "../../context/ThemeContext";
import { useTransactionContext } from "../../context/TransactionsContext";

import { getSingleTransaction } from "../../querys/transactionsQuery";

const TransactionList = (item) => {
  const { isEdit, toggleIsEdit, openModal } = useThemeContext();
  const {
    _id: id,
    title,
    amount,
    date,
    categories: { slug },
  } = item;
  const { data: singleTrans } = useQuery(["single-trans", id], () => getSingleTransaction(id), { keepPreviousData: false });
  const { getTransactionId } = useTransactionContext();

  const handleOpenModal = (id) => {
    getTransactionId(id);
    openModal();
  };

  return (
    <div className='card column-2 column-sm-5 column-gap row-gap'>
      <div className='card_date'>
        <div className='label'>Date:</div>
        <div>{formatDate(date)}</div>
      </div>
      <div className='card_title'>
        <div className='label'>Info:</div>
        <div>{title}</div>
      </div>

      <div className='card_category'>
        <div className='label'>Category:</div>
        <div className='category'>{slug}</div>
      </div>
      <div className='card_amount'>
        <div className='label'>Amount:</div>
        <div className='amount'>{formatCurrency(amount)}</div>
      </div>

      <div className='flex align-center justify-center justify-sm-end'>
        {isEdit === id ? (
          <button className='btn-edit' onClick={() => toggleIsEdit(-1)}>
            <MdClose />
          </button>
        ) : (
          <button className='btn-edit' onClick={() => toggleIsEdit(id)}>
            <MdModeEditOutline />
          </button>
        )}

        <div className='btn-delete ml-1' onClick={() => handleOpenModal(id)}>
          <MdOutlineDeleteForever />
        </div>
      </div>
      {isEdit === id ? (
        <div className='edit'>
          <EditTrasaction {...singleTrans} />
        </div>
      ) : null}
    </div>
  );
};

export default TransactionList;
