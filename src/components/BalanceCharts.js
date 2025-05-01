import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import incomeData from "../data/incomeData";
import expensesData from "../data/expensesData";

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceChart = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const income = incomeData.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const expense = expensesData.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setIsLoading(false);
    }, []);

    const balance = totalIncome - totalExpense;
    const balanceText = `${balance >= 0 ? "+" : ""}${balance.toFixed(2)}`;
    const balanceColor = balance >= 0 ? "#52c41a" : "#ff4d4f";

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
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    const centerTextPlugin = {
        id: "centerText",
        beforeDraw: function (chart) {
            const { width, height, ctx } = chart;
            ctx.save();
            const fontSize = (height / 114).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";
            ctx.fillStyle = balanceColor;

            const textX = Math.round((width - ctx.measureText(balanceText).width) / 2);
            const textY = height / 2;
            ctx.fillText(balanceText, textX, textY);
            ctx.restore();
        },
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Güncel Bakiye</h2>
            {isLoading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div style={{ width: "320px", height: "320px", margin: "0 auto" }}>
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
