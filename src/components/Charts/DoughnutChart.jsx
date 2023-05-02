import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../querys/transactionsQuery";
import { getCategories } from "../../querys/categoriesQuery.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { data: transData } = useQuery(["transAll"], () => getAllTransactions());
  const { data: cats } = useQuery(["allCats"], () => getCategories());
  const [catSlug, setCatSlug] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(transData?.map((item) => item.categories.slug))];
    setCatSlug(uniqueCategories);
  }, [transData]);

  const totalPriceByCategory = catSlug.reduce((acc, categoryName) => {
    const totalPrice = transData?.filter((product) => product.categories.slug === categoryName).reduce((sum, product) => sum + product.amount, 0);
    return { ...acc, [categoryName]: totalPrice };
  }, {});

  const getCatColors = () => {
    const cat = cats?.map((cat) => cat.legendColor);
    return cat;
  };

  console.log(getCatColors());

  const data = {
    labels: catSlug,
    datasets: [
      {
        data: Object.values(totalPriceByCategory),
        backgroundColor: getCatColors(),
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
