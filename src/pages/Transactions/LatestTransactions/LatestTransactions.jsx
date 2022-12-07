import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getLatestTransactions } from '../../../querys/transactionsQuery';


import './latestTransactions.scss';
import Loader from '../../../components/Loader/Loader';



const LatestTransactions = () => {
    const { data, isLoading } = useQuery(["latestTrans"], getLatestTransactions, { refetchOnWindowFocus: false })

    if(isLoading){
        return <Loader />
    }
    return (
    <div className='transaction_list'>
        {data?.map((item) => (
            <div key={item._id}>{item.title }</div>
        ))}
    </div>
    )
}

export default LatestTransactions