import React from "react";
import "./home.scss";

import Title from "../../components/Title/Title";
import LatestTransactions from "./LatestTransactions/LatestTransactions";

const Home = () => {
  return (
    <div>
      <Title>Dashboard</Title>
      <div className='home_grid'>
        <div className='card'>
          <h2>total income</h2>
        </div>
        <div className='card'>
          <h2>total speding</h2>
        </div>
        <div className='card'>
          <h2>total speding</h2>
        </div>
        <div className='card'>
          <h2>chart budget use</h2>
          <h2>chart category spending</h2>
        </div>

        <LatestTransactions />
      </div>
    </div>
  );
};

export default Home;
