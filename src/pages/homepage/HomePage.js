// src/pages/Home.js
import CategoryCharts from "../../components/CategoryCharts";
import BalanceCharts from "../../components/BalanceCharts";
import SidebarLayout from "../../components/sidebar/siderbar";
import transactions from "../../data/transactions.json";
import React from "react";

import { ConfigProvider } from "antd";
import Theme from "../../Theme";

const Home = () => {
    const email = "ali@example.com";

    const userTransactions = transactions.filter((item) => item.email === email);

    let incomeCategories = {};
    let expenseCategories = {};

    userTransactions.forEach((item) => {
        const amount = parseFloat(item.amount);
        const category = item.description;

        if (item.type === "Gelir") {
            incomeCategories[category] = (incomeCategories[category] || 0) + amount;
        } else if (item.type === "Gider") {
            expenseCategories[category] = (expenseCategories[category] || 0) + amount;
        }
    });

    return (
        <div className="homepage-main">
            <ConfigProvider theme={Theme}>
                <SidebarLayout>
                    <div className='homepage-container'>
                        <CategoryCharts
                            incomeCategories={incomeCategories}
                            expenseCategories={expenseCategories}
                        />
                        <BalanceCharts />
                    </div>
                </SidebarLayout>
            </ConfigProvider>
        </div>
    );

};

export default Home;
