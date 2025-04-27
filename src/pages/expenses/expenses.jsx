import React, { useState } from "react";
import { Button, Input, InputNumber, List, Space, message, DatePicker, Select, Card, Divider, Radio } from "antd";
import dayjs from "dayjs";
import SidebarLayout from "../../components/sidebar/siderbar";
import expensesData from "../../data/expensesData";
import "./expenses.css";

const { Option } = Select;

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState(expensesData);
    const [expenseName, setExpenseName] = useState("");
    const [expenseCost, setExpenseCost] = useState(0);
    const [expenseDate, setExpenseDate] = useState(null);
    const [expenseCategory, setExpenseCategory] = useState("");
    const [filterType, setFilterType] = useState("all");

    const handleAddExpense = () => {
        if (!expenseName || !expenseCost || !expenseDate || !expenseCategory) {
            message.error("Please fill all fields!");
            return;
        }
        const newExpense = {
            name: expenseName,
            cost: expenseCost,
            date: expenseDate.format("YYYY-MM-DD"),
            category: expenseCategory,
        };
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        expensesData.push(newExpense);
        message.success("Expense added!");

        // Reset
        setExpenseName("");
        setExpenseCost(0);
        setExpenseDate(null);
        setExpenseCategory("");
    };

    const handleRemoveExpense = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
        expensesData.splice(index, 1);
        message.success("Expense removed!");
    };

    const filteredExpenses = expenses.filter((item) => {
        if (filterType === "all") return true;
        const expenseDate = dayjs(item.date);
        const today = dayjs();
        if (filterType === "today") {
            return expenseDate.isSame(today, "day");
        } else if (filterType === "week") {
            return expenseDate.isSame(today, "week");
        } else if (filterType === "month") {
            return expenseDate.isSame(today, "month");
        }
        return true;
    });

    const totalFilteredCost = filteredExpenses.reduce((total, item) => total + Number(item.cost), 0);

    return (
        <div className="expenses-main">
            <SidebarLayout>
                <div className="expenses-container">

                    {/* Add Expense */}
                    <Card title="Add New Expense" bordered={false} className="add-expense-card">
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                            <div className="input-label">Expense Name:</div>
                            <Input
                                placeholder="Enter expense name"
                                value={expenseName}
                                onChange={(e) => setExpenseName(e.target.value)}
                            />
                            <div className="input-label">Cost:</div>
                            <InputNumber
                                placeholder="Enter cost"
                                value={expenseCost}
                                onChange={(value) => setExpenseCost(value)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Date:</div>
                            <DatePicker
                                placeholder="Select date"
                                value={expenseDate}
                                onChange={(date) => setExpenseDate(date)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Category:</div>
                            <Select
                                placeholder="Select category"
                                value={expenseCategory}
                                onChange={(value) => setExpenseCategory(value)}
                                style={{ width: "100%" }}
                            >
                                <Option value="Food">Food</Option>
                                <Option value="Transport">Transport</Option>
                                <Option value="Shopping">Shopping</Option>
                                <Option value="Entertainment">Entertainment</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                            <Button type="primary" onClick={handleAddExpense} block>
                                Add Expense
                            </Button>
                        </Space>
                    </Card>

                    {/* Divider */}
                    <Divider />

                    {/* Total Spent */}
                    <Card className="total-spent-card" bordered={false}>
                        <h2 style={{ marginBottom: 0 }}>
                            Total Spent ({filterType === "all" ? "All" : filterType === "today" ? "Today" : filterType === "week" ? "This Week" : "This Month"}):
                        </h2>
                        <h1 style={{ color: "#52c41a" }}>${totalFilteredCost.toFixed(2)}</h1>
                    </Card>

                    {/* Divider */}
                    <Divider />

                    {/* Filter Expenses */}
                    <Card bordered={false} className="filter-card">
                        <Radio.Group value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="today">Today</Radio.Button>
                            <Radio.Button value="week">This Week</Radio.Button>
                            <Radio.Button value="month">This Month</Radio.Button>
                        </Radio.Group>
                    </Card>

                    {/* Expense History */}
                    <Card title="Expense History" bordered={false} className="expense-list-card">
                        <List
                            itemLayout="horizontal"
                            dataSource={filteredExpenses}
                            locale={{ emptyText: "No expenses yet." }}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            danger
                                            size="small"
                                            onClick={() => handleRemoveExpense(index)}
                                        >
                                            Remove
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.name} - $${item.cost}`}
                                        description={`Date: ${item.date} | Category: ${item.category}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>

                </div>
            </SidebarLayout>
        </div>
    );
};

export default ExpensesPage;
