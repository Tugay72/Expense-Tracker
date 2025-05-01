import React, { useState } from "react";
import { Button, Input, InputNumber, List, Space, message, DatePicker, Select, Card, Divider, Radio } from "antd";
import dayjs from "dayjs";
import SidebarLayout from "../../components/sidebar/siderbar";
import incomeData from "../../data/incomeData";
import "./incomes.css";

const { Option } = Select;

const IncomePage = () => {
    const [incomes, setIncomes] = useState(incomeData);
    const [incomeName, setIncomeName] = useState("");
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [incomeDate, setIncomeDate] = useState(null);
    const [incomeCategory, setIncomeCategory] = useState("");
    const [filterType, setFilterType] = useState("all");

    const handleAddIncome = () => {
        if (!incomeName || !incomeAmount || !incomeDate || !incomeCategory) {
            message.error("Please fill all fields!");
            return;
        }
        const newIncome = {
            name: incomeName,
            amount: incomeAmount,
            date: incomeDate.format("YYYY-MM-DD"),
            category: incomeCategory,
        };
        const updatedIncomes = [...incomes, newIncome];
        setIncomes(updatedIncomes);
        incomeData.push(newIncome);
        message.success("Income added!");

        // Reset
        setIncomeName("");
        setIncomeAmount(0);
        setIncomeDate(null);
        setIncomeCategory("");
    };

    const handleRemoveIncome = (index) => {
        const updatedIncomes = [...incomes];
        updatedIncomes.splice(index, 1);
        setIncomes(updatedIncomes);
        incomeData.splice(index, 1);
        message.success("Income removed!");
    };

    const filteredIncomes = incomes.filter((item) => {
        if (filterType === "all") return true;
        const incomeDate = dayjs(item.date);
        const today = dayjs();
        if (filterType === "today") {
            return incomeDate.isSame(today, "day");
        } else if (filterType === "week") {
            return incomeDate.isSame(today, "week");
        } else if (filterType === "month") {
            return incomeDate.isSame(today, "month");
        }
        return true;
    });

    const totalFilteredIncome = filteredIncomes.reduce((total, item) => total + Number(item.amount), 0);

    return (
        <div className="income-main">
            <SidebarLayout>
                <div className="income-container">

                    {/* Add Income */}
                    <Card title="Yeni Gelir Ekle" bordered={false} className="add-income-card">
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                            <div className="input-label">Gelir Kaynağı:</div>
                            <Input
                                placeholder="Enter income source"
                                value={incomeName}
                                onChange={(e) => setIncomeName(e.target.value)}
                            />
                            <div className="input-label">Miktar($):</div>
                            <InputNumber
                                placeholder="Enter amount"
                                value={incomeAmount}
                                onChange={(value) => setIncomeAmount(value)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Tarih:</div>
                            <DatePicker
                                placeholder="Select date"
                                value={incomeDate}
                                onChange={(date) => setIncomeDate(date)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Kategori:</div>
                            <Select
                                placeholder="Select category"
                                value={incomeCategory}
                                onChange={(value) => setIncomeCategory(value)}
                                style={{ width: "100%" }}
                            >
                                <Option value="Salary">Maaş</Option>
                                <Option value="Freelance">Freelance</Option>
                                <Option value="Business">Business</Option>
                                <Option value="Investment">Yatırım</Option>
                                <Option value="Other">Diğer</Option>
                            </Select>
                            <Button type="primary" onClick={handleAddIncome} block>
                                Ekle
                            </Button>
                        </Space>
                    </Card>

                    {/* Divider */}
                    <Divider />

                    {/* Total Income */}
                    <Card className="total-income-card" bordered={false}>
                        <h2 style={{ marginBottom: 0 }}>
                            Toplam Gelir ({filterType === "all" ? "All" : filterType === "today" ? "Today" : filterType === "week" ? "This Week" : "This Month"}):
                        </h2>
                        <h1 style={{ color: "#1890ff" }}>${totalFilteredIncome.toFixed(2)}</h1>
                    </Card>

                    {/* Divider */}
                    <Divider />

                    {/* Filter Incomes */}
                    <Card bordered={false} className="filter-card">
                        <Radio.Group value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <Radio.Button value="all">Tümü</Radio.Button>
                            <Radio.Button value="today">Bugün</Radio.Button>
                            <Radio.Button value="week">Bu Hafta</Radio.Button>
                            <Radio.Button value="month">Bu Ay</Radio.Button>
                        </Radio.Group>
                    </Card>

                    {/* Income History */}
                    <Card title="Gelir Geçmişi" bordered={false} className="income-list-card">
                        <List
                            itemLayout="horizontal"
                            dataSource={filteredIncomes}
                            locale={{ emptyText: "No income records yet." }}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            danger
                                            size="small"
                                            onClick={() => handleRemoveIncome(index)}
                                        >
                                            Sil
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.name} - $${item.amount}`}
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

export default IncomePage;
