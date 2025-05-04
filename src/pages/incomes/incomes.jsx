import "./incomes.css";
import BASE_URL from "../../config.js";

import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    InputNumber,
    List,
    Space,
    message,
    DatePicker,
    Select,
    Card,
    Divider,
    Radio,
} from "antd";
import dayjs from "dayjs";
import SidebarLayout from "../../components/sidebar/siderbar";


const { Option } = Select;

const IncomesPage = () => {
    const [incomes, setIncomes] = useState([]);
    const [incomeName, setIncomeName] = useState("");
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [incomeDate, setIncomeDate] = useState(null);
    const [incomeCategory, setIncomeCategory] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Verileri API'den çek
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Token bulunamadı, lütfen giriş yapın!");
            return;
        }

        fetch(`${BASE_URL}/api/income/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const raw = data.incomes || [];
                if (!Array.isArray(raw)) {
                    console.error("API'den beklenmeyen veri yapısı:", data);
                    return;
                }

                const formatted = raw.map((item) => ({
                    id: item.income_id,
                    name: item.income_name,
                    amount: parseFloat(item.income_amount),
                    category: item.income_category,
                    date: dayjs(item.income_date).format("YYYY-MM-DD"),
                }));
                setIncomes(formatted);
            })
            .catch((error) => {
                console.error("Gelir verileri alınırken hata:", error);
                message.error("Gelirler yüklenemedi.");
            });
    }, []);

    // Gelir Ekleme
    const handleAddIncome = () => {
        if (!incomeName || !incomeAmount || !incomeDate || !incomeCategory) {
            message.error("Lütfen tüm alanları doldurun!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Token bulunamadı, lütfen giriş yapın!");
            return;
        }

        const newIncome = {
            income_name: incomeName,
            income_date: incomeDate.format("YYYY-MM-DD"),
            income_amount: incomeAmount,
            income_category: incomeCategory,
        };

        fetch(`${BASE_URL}/api/income/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newIncome),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    message.error("Gelir eklenemedi.");
                } else {
                    message.success("Gelir başarıyla eklendi!");
                    const updatedIncomes = [
                        ...incomes,
                        {
                            name: newIncome.income_name,
                            amount: newIncome.income_amount,
                            date: newIncome.income_date,
                            category: newIncome.income_category,
                        },
                    ];
                    setIncomes(updatedIncomes);
                    setIncomeName("");
                    setIncomeAmount(0);
                    setIncomeDate(null);
                    setIncomeCategory("");
                }
            })
            .catch((error) => {
                console.error("Hata:", error);
                message.error("Bir hata oluştu, lütfen tekrar deneyin.");
            });
    };

    // Güncellenmiş gelir silme fonksiyonu
    const handleRemoveIncome = (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Token bulunamadı, lütfen giriş yapın!");
            return;
        }

        fetch(`${BASE_URL}/api/income/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    message.error("Gelir silinirken bir hata oluştu.");
                } else {
                    message.success("Gelir başarıyla silindi!");
                    const updatedIncomes = incomes.filter((income) => income.id !== id);
                    setIncomes(updatedIncomes);
                }
            })
            .catch((error) => {
                console.error("Gelir silinirken hata:", error);
                message.error("Bir hata oluştu, lütfen tekrar deneyin.");
            });
    };


    // Filtreleme
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

    const totalFilteredIncome = filteredIncomes.reduce(
        (total, item) => total + Number(item.amount),
        0
    );

    return (
        <div className="income-main">
            <SidebarLayout>
                <div className="income-container">
                    {/* Yeni Gelir Ekleme Formu */}
                    <Card title="Yeni Gelir Ekle" bordered={false} className="add-income-card">
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                            <div className="input-label">Gelir İsmi:</div>
                            <Input
                                placeholder="Gelir ismini girin"
                                value={incomeName}
                                onChange={(e) => setIncomeName(e.target.value)}
                            />
                            <div className="input-label">Gelir Miktarı($):</div>
                            <InputNumber
                                placeholder="Gelir miktarı girin"
                                value={incomeAmount}
                                onChange={(value) => setIncomeAmount(value)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Tarih:</div>
                            <DatePicker
                                placeholder="Tarih seçin"
                                value={incomeDate}
                                onChange={(date) => setIncomeDate(date)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Kategori:</div>
                            <Select
                                placeholder="Kategori seçin"
                                value={incomeCategory}
                                onChange={(value) => setIncomeCategory(value)}
                                style={{ width: "100%" }}
                            >
                                <Option value="Maaş">Maaş</Option>
                                <Option value="Prim">Prim</Option>
                                <Option value="Freelance">Freelance</Option>
                                <Option value="Yatırım">Yatırım</Option>
                                <Option value="Kira">Kira</Option>
                                <Option value="İşletme">İşletme</Option>
                                <Option value="Satış">Satış</Option>
                                <Option value="Hediye">Hediye</Option>
                                <Option value="Diğer">Diğer</Option>
                                {/* Diğer kategoriler */}
                            </Select>
                            <Button type="primary" onClick={handleAddIncome} block>
                                Ekle
                            </Button>
                        </Space>
                    </Card>

                    <Divider />

                    {/* Toplam Gelir */}
                    <Card className="total-income-card" bordered={false}>
                        <h2 style={{ marginBottom: 0 }}>
                            Toplam Gelir ({filterType === "all" ? "Tümü" : filterType === "today" ? "Bugün" : filterType === "week" ? "Bu Hafta" : "Bu Ay"}):
                        </h2>
                        <h1 style={{ color: "#1890ff" }}>${totalFilteredIncome.toFixed(2)}</h1>
                    </Card>

                    <Divider />

                    {/* Filtreleme */}
                    <Card bordered={false} className="filter-card">
                        <Radio.Group value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <Radio.Button value="all">Tümü</Radio.Button>
                            <Radio.Button value="today">Bugün</Radio.Button>
                            <Radio.Button value="week">Bu Hafta</Radio.Button>
                            <Radio.Button value="month">Bu Ay</Radio.Button>
                        </Radio.Group>
                    </Card>

                    {/* Gelir Listesi */}
                    <Card title="Gelir Geçmişi" bordered={false} className="income-list-card">
                        <List
                            itemLayout="horizontal"
                            dataSource={filteredIncomes}
                            locale={{ emptyText: "Henüz gelir yok." }}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            danger
                                            size="small"
                                            onClick={() => handleRemoveIncome(item.id)}
                                        >
                                            Sil
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.name} - $${item.amount}`}
                                        description={`${item.category} - ${item.date}`}
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

export default IncomesPage;
