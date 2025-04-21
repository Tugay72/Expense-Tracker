import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import transactions from "../data/transactions.json"; // JSON dosyasını import et

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceChart = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((item) => {
      const amount = parseFloat(item.amount);
      if (isNaN(amount)) return; // Geçerli değilse atla

      if (item.type === "Gelir") {
        income += amount;
      } else if (item.type === "Gider") {
        expense += amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setIsLoading(false);
  }, []); // Email bağımlılığı kaldırıldı, sadece ilk renderda çalışacak

  const balance = totalIncome - totalExpense;
  const balanceColor = balance >= 0 ? "green" : "red";
  const balanceText =
    balance >= 0 ? `+${balance.toFixed(2)}` : balance.toFixed(2);

  const data = {
    labels: ["Gelir", "Gider"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    hover: {
      mode: null,
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: function (chart) {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;

      ctx.clearRect(0, 0, width, height);

      let fontSize = Math.min(
        height / 114,
        width / ctx.measureText(balanceText).width
      );
      fontSize = fontSize > 1 ? fontSize : 1;
      ctx.font = `${fontSize}em sans-serif`;

      const textWidth = ctx.measureText(balanceText).width;
      ctx.textBaseline = "middle";

      const textX = Math.round((width - textWidth) / 2);
      const textY = height / 2;

      ctx.fillStyle = balanceColor;
      ctx.fillText(balanceText, textX, textY);
    },
  };

  return (
    <div>
      <h2>Güncel Bakiye</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "275px", height: "275px" }}>
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />
        </div>
      )}
    </div>
  );
};

export default BalanceChart;
