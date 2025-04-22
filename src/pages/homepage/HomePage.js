// src/pages/Home.js
import CategoryCharts from "../../components/CategoryCharts";
import BalanceCharts from "../../components/BalanceCharts";
import SidebarLayout from "../../components/sidebar/siderbar";
import transactions from "../../data/transactions.json";
import React from "react";

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
    <div>
      <SidebarLayout>
        <CategoryCharts
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
        />
        <BalanceCharts />
      </SidebarLayout>
    </div>
  );
};

export default Home;
