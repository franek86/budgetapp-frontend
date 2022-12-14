import React from "react";
import "./home.scss";

import Title from "../../components/Title/Title";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LatestTransactions from "./LatestTransactions/LatestTransactions";

const Home = () => {
  return (
    <div>
      <Title>Dashboard</Title>
      <div className='home_grid row-gap column-gap'>
        <div className='card'>
          <h4>total income</h4>
        </div>
        <div className='card'>
          <h4>total speding</h4>
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
