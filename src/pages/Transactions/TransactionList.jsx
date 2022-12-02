import React , {useState}from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdClose, MdOutlineDeleteForever, MdModeEditOutline } from "react-icons/md";

import formatDate from "../../utils/LuxonFormat";
import formatCurrency from "../../utils/FormatCurrency";

import EditTrasaction from "./EditTransaction/EditTransaction";
import Modal from "../../components/Modal/Modal"

import { useThemeContext } from "../../context/ThemeContext"
import { deleteTransaction,getSingleTransaction } from "../../querys/transactionsQuery";

const TransactionList = (item) => {
    const [showModal, setShowModal] = useState(false)

    const queryClient = useQueryClient();
    const { isEdit, toggleIsEdit } = useThemeContext();
    const {_id:id,title, amount, date, categories: {slug}} = item;
    const { data:singleTrans } = useQuery( ["single-trans", id],() => getSingleTransaction(id), {keepPreviousData: false });
    const { mutateAsync } = useMutation(deleteTransaction, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["trans"]})
        }
    })

    const handleDelete = () => {
        setShowModal(true)
    }

    const confirmDelete = (id) => {
        mutateAsync(id);
    }

    const cancelDelete = () => {
        setShowModal(false)
    }

    if(showModal === true){
        return (
            <Modal>test</Modal>
        )  
    }

    return (
    <div className='transaction_item'>
        <div className='transaction_date'>
            <div className='label'>Date:</div>
            <div>{formatDate(date)}</div>
        </div>
        <div className='transaction_title'>
            <div className='label'>Info:</div>
            <div>{title}</div>
        </div>

        <div className='transaction_category'>
            <div className='label'>Category:</div>
            <div className='category'>{slug}</div>
        </div>
        <div className='transaction_amount'>
            <div className='label'>Amount:</div>
            <div className='amount'>{formatCurrency(amount)}</div>
        </div>

        <div className='transaction_btns'>
            {isEdit === id ? 
                <button className='btn-edit' onClick={()=> toggleIsEdit(-1)}>
                    <MdClose />
                </button> : 

                <button className='btn-edit' onClick={()=> toggleIsEdit(id)}>
                    <MdModeEditOutline />
                </button>
            }

            <div className='btn-delete ml-1'>
                <MdOutlineDeleteForever />
            </div>
        </div>
        {isEdit === id ? 
        <div className='edit'>
            <EditTrasaction {...singleTrans}/>
        </div> : null
        }

   
    </div>
    )
}

export default TransactionList