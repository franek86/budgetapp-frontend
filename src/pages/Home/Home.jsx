import React from 'react'
import './home.scss'
import { useQuery } from '@tanstack/react-query'
import { getLatestTransactions } from '../../querys/transactionsQuery';
import Title from '../../components/Title/Title'
import LatestTransactions from '../Transactions/LatestTransactions/LatestTransactions'

const Home = () => {
  const { data } = useQuery(["latestTrans"], getLatestTransactions)
  return (
    <div>
      <Title>Dashboard</Title>
      <LatestTransactions />
    </div>
  )
}

export default Home