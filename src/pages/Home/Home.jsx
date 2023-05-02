import React from "react";
import "./home.scss";

import Title from "../../components/Title/Title";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LatestTransactions from "./LatestTransactions/LatestTransactions";
import CreateBudget from "../../components/Budget/CreateBudget.jsx";
import TotalBudget from "../../components/Budget/TotalBudget.jsx";
import Spending from "../../components/Spending/Spending.jsx";

const Home = () => {
  return (
    <div>
      <Title>Dashboard</Title>
      <div className='home_grid row-gap column-gap'>
        <div className='card'>
          <TotalBudget />
          <CreateBudget />
        </div>
        <div className='card'>
          <Spending />
        </div>
        <div className='card'>
          <h4>total speding</h4>
        </div>
        <div className='card grid  home_grid_chart'>
          <h3 className='mb-1'>Latest transactions</h3>
          <LatestTransactions />
        </div>

        <DoughnutChart />
      </div>
    </div>
  );
};

export default Home;
