import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryCharts = ({ incomeCategories = {}, expenseCategories = {} }) => {
  // Kategori renkleri
  const categoryColors = {
    Eğitim: "#36A2EB",
    Kira: "#FF6384",
    Fatura: "#FFCE56",
    Yemek: "#4BC0C0",
    Sağlık: "#9966FF",
    Spor: "#FF9F40",
    Eğlence: "#C9CBCF",
    Alışveriş: "#FF6B6B",
    Ulaşım: "#FFD166",
    "Kredi Kartı": "#06D6A0",
    Sigorta: "#DDA0DD",
    Maaş: "#FF1493",
    Burs: "#8A2BE2",
    Kredi: "#228B22",
    Diğer: "#808080",
  };

  // Gelir verileri
  const incomeData = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        data: Object.values(incomeCategories),
        backgroundColor: Object.keys(incomeCategories).map(
          (category) => categoryColors[category] || "#cccccc"
        ),
        hoverBackgroundColor: Object.keys(incomeCategories).map(
          (category) => categoryColors[category] || "#cccccc"
        ),
      },
    ],
  };

  // Gider verileri
  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: Object.keys(expenseCategories).map(
          (category) => categoryColors[category] || "#cccccc"
        ),
        hoverBackgroundColor: Object.keys(expenseCategories).map(
          (category) => categoryColors[category] || "#cccccc"
        ),
      },
    ],
  };

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <div>
        <h2>Gelir Kategorileri</h2>
        <div style={{ width: "220x", height: "220px" }}>
          <Pie data={incomeData} />
        </div>
      </div>
      <div>
        <h2>Gider Kategorileri</h2>
        <div style={{ width: "220px", height: "220px" }}>
          <Pie data={expenseData} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCharts;
