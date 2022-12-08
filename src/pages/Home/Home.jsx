import React from "react";
import "./home.scss";

import Title from "../../components/Title/Title";
import LatestTransactions from "./LatestTransactions/LatestTransactions";
import { DoughnutChart } from "../../components/Charts/DoughnutChart";

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
        <div className='card grid column-2 home_grid_chart'>
          <DoughnutChart />
          <DoughnutChart />
        </div>

        <div>
          <h3 className="mb-1">Latest transactions</h3>
          <LatestTransactions />
        </div>
      </div>
    </div>
  );
};

export default Home;
