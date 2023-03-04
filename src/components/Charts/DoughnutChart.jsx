import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../querys/transactionsQuery";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { data: transData } = useQuery(["transAll"], () => getAllTransactions());
  const [catSlug, setCatSlug] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(transData?.map((item) => item.categories.slug))];

    setCatSlug(uniqueCategories);
  }, [transData]);

  const data = {
    labels: catSlug,
    datasets: [
      {
        data: [12, 19],
        backgroundColor: ["red", "blue"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
