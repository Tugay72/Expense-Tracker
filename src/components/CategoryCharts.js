import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryCharts = ({ incomeCategories = {}, expenseCategories = {} }) => {

    const categoryColors = {

        // Gelir kategorileri
        Maaş: "#4CAF50",  // Yeşil
        Burs: "#2196F3",  // Mavi
        Freelance: "#FF9800",  // Turuncu
        Yatırım: "#9C27B0",  // Mor
        İşletme: "#3F51B5",  // Mavi

        // Gider kategorileri
        Kira: "#FF5722",    // Mercan
        Fatura: "#FFEB3B",  // Sarı
        Yemek: "#FF9800",   // Turuncu
        Sağlık: "#9C27B0",  // Mor
        Spor: "#FF6F00",    // Turuncu-kahverengi
        Eğlence: "#E91E63", // Pembe
        Alışveriş: "#FF4081", // Pembe
        Ulaşım: "#FFC107",  // Altın Sarısı
        "Kredi Kartı": "#D32F2F", // Kırmızı
        Sigorta: "#673AB7", // Mor
        Diğer: "#607D8B",   // Gri
        Kredi: "#F44336",   // Kırmızı
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
        <div style={{ display: "flex", gap: "48px" }}>
            {Object.keys(incomeCategories).length > 0 && (
                <div>
                    <h2>Gelir Kategorileri</h2>
                    <div style={{ width: "300px", height: "300px" }}>
                        <Pie data={incomeData} />
                    </div>
                </div>
            )}
            {Object.keys(expenseCategories).length > 0 && (
                <div>
                    <h2>Gider Kategorileri</h2>
                    <div style={{ width: "300px", height: "300px" }}>
                        <Pie data={expenseData} />
                    </div>
                </div>
            )}
        </div>


    );
};

export default CategoryCharts;
