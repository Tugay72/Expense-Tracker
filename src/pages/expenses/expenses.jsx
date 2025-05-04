import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

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
import "./expenses.css";

const { Option } = Select;

const ExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [expenseName, setExpenseName] = useState("");
    const [expenseCost, setExpenseCost] = useState();
    const [expenseDate, setExpenseDate] = useState(null);
    const [expenseCategory, setExpenseCategory] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Verileri API'den çek
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Token bulunamadı, lütfen giriş yapın!");
            return;
        }

        fetch(`${BASE_URL}/api/expenses/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const raw = data.expenses || [];
                if (!Array.isArray(raw)) {
                    console.error("API'den beklenmeyen veri yapısı:", data);
                    return;
                }

                const formatted = raw.map((item) => ({
                    id: item.expense_id,
                    name: item.expense_name,
                    cost: parseFloat(item.expense_amount),
                    category: item.expense_category,
                    date: dayjs(item.expense_date).format("YYYY-MM-DD"),
                }));
                setExpenses(formatted);
            })
            .catch((error) => {
                console.error("Gider verileri alınırken hata:", error);
                message.error("Giderler yüklenemedi.");
            });
    }, []);

    // Gider ekle
    const handleAddExpense = () => {
        if (!expenseName || !expenseCost || !expenseDate || !expenseCategory) {
            message.error("Please fill all fields!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Token bulunamadı, lütfen giriş yapın!");
            return;
        }

        const newExpense = {
            expense_name: expenseName,
            expense_date: expenseDate.format("YYYY-MM-DD"),
            expense_amount: expenseCost,
            expense_category: expenseCategory,
        };

        fetch(`${BASE_URL}/api/expenses/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newExpense),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    message.error("Gider eklenemedi.");
                } else {
                    message.success("Gider başarıyla eklendi!");

                    const updatedExpenses = [
                        ...expenses,
                        {
                            name: newExpense.expense_name,
                            cost: newExpense.expense_amount,
                            date: newExpense.expense_date,
                            category: newExpense.expense_category,
                        },
                    ];
                    setExpenses(updatedExpenses);

                    setExpenseName("");
                    setExpenseCost(0);
                    setExpenseDate(null);
                    setExpenseCategory("");
                }
            })
            .catch((error) => {
                console.error("Hata:", error);
                message.error("Bir hata oluştu, lütfen tekrar deneyin.");
            });
    };

    // Gider Sil
    const handleRemoveExpense = (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Token bulunamadı, lütfen giriş yapın!");
            return;
        }

        fetch(`${BASE_URL}/api/expenses/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    message.error("Gider silinemedi.");
                } else {
                    message.success("Gider başarıyla silindi!");
                    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
                    setExpenses(updatedExpenses);
                }
            })
            .catch((error) => {
                console.error("Silme sırasında hata:", error);
                message.error("Bir hata oluştu, lütfen tekrar deneyin.");
            });
    };


    // Filtreleme
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

    const totalFilteredCost = filteredExpenses.reduce(
        (total, item) => total + Number(item.cost),
        0
    );

    return (
        <div className="expenses-main">
            <SidebarLayout>
                <div className="expenses-container">
                    {/* Gider Ekleme Formu */}
                    <Card
                        title="Yeni Gider Ekle"
                        bordered={false}
                        className="add-expense-card"
                    >
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ width: "100%" }}
                        >
                            <div className="input-label">Gider İsmi:</div>
                            <Input
                                placeholder="Gider ismini girin"
                                value={expenseName}
                                onChange={(e) => setExpenseName(e.target.value)}
                            />
                            <div className="input-label">Maliyet($):</div>
                            <InputNumber
                                placeholder="Gider miktarını girin"
                                value={expenseCost}
                                onChange={(value) => setExpenseCost(value)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Tarih:</div>
                            <DatePicker
                                placeholder="Tarih seçin"
                                value={expenseDate}
                                onChange={(date) => setExpenseDate(date)}
                                style={{ width: "100%" }}
                            />
                            <div className="input-label">Kategori:</div>
                            <Select
                                placeholder="Select category"
                                value={expenseCategory}
                                onChange={(value) => setExpenseCategory(value)}
                                style={{ width: "100%" }}
                            >
                                <Option value="Kira">Kira</Option>
                                <Option value="Fatura">Fatura</Option>
                                <Option value="Yemek">Yemek</Option>
                                <Option value="Ulaşım">Ulaşım</Option>
                                <Option value="Alışveriş">Alışveriş</Option>
                                <Option value="Eğitim">Eğitim</Option>
                                <Option value="Sağlık">Sağlık</Option>
                                <Option value="Vergi">Vergi</Option>
                                <Option value="Eğlence">Eğlence</Option>
                                <Option value="Restoran">Restoran</Option>
                                <Option value="Giyim">Giyim</Option>
                                <Option value="Seyahat">Seyahat</Option>
                                <Option value="Abonelik">Abonelik</Option>
                                <Option value="Kredi Ödeme">Kredi Ödeme</Option>
                                <Option value="Hediye">Hediye</Option>
                                <Option value="Eşya">Eşya</Option>
                                <Option value="Diğer">Diğer</Option>
                            </Select>

                            <Button type="primary" onClick={handleAddExpense} block>
                                Ekle
                            </Button>
                        </Space>
                    </Card>

                    <Divider />

                    {/* Toplam Harcama */}
                    <Card className="total-spent-card" bordered={false}>
                        <h2 style={{ marginBottom: 0 }}>
                            Toplam Harcanan (
                            {filterType === "all"
                                ? "Tümü"
                                : filterType === "today"
                                    ? "Bugün"
                                    : filterType === "week"
                                        ? "Bu Hafta"
                                        : "Bu Ay"}
                            ):
                        </h2>
                        <h1 style={{ color: "#52c41a" }}>
                            ${totalFilteredCost.toFixed(2)}
                        </h1>
                    </Card>

                    <Divider />

                    {/* Filtre */}
                    <Card bordered={false} className="filter-card">
                        <Radio.Group
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <Radio.Button value="all">Tümü</Radio.Button>
                            <Radio.Button value="today">Bugün</Radio.Button>
                            <Radio.Button value="week">Bu Hafta</Radio.Button>
                            <Radio.Button value="month">Bu Ay</Radio.Button>
                        </Radio.Group>
                    </Card>

                    {/* Gider Listesi */}
                    <Card
                        title="Gider Geçmişi"
                        bordered={false}
                        className="expense-list-card"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={filteredExpenses}
                            locale={{ emptyText: "Henüz gider yok." }}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            danger
                                            size="small"
                                            onClick={() => handleRemoveExpense(item.id)}
                                        >
                                            Sil
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`${item.name} - $${item.cost}`}
                                        description={`Tarih: ${item.date} | Kategori: ${item.category}`}
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
