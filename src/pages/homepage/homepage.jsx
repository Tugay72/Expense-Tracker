import './homepage.css';
import { useEffect, useState } from 'react';
import { ConfigProvider, Card, Col, Row, Statistic, List, Skeleton } from 'antd';
import { RiseOutlined, FallOutlined, DollarOutlined } from '@ant-design/icons';
import SidebarLayout from '../../components/sidebar/siderbar';
import BalanceCharts from '../../components/BalanceCharts';
import dayjs from 'dayjs';
import BASE_URL from '../../config';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Kullanıcı bilgilerini al
        fetch(`${BASE_URL}/api/auth/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUser({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email
                    });
                }
            })
            .catch(err => {
                console.error("Kullanıcı bilgisi alınamadı:", err);
            });

        // Giderleri al
        fetch(`${BASE_URL}/api/expenses/list`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const formatted = data.expenses.map(item => ({
                    id: item.expense_id,
                    name: item.expense_name,
                    cost: parseFloat(item.expense_amount),
                    category: item.expense_category,
                    date: dayjs(item.expense_date).format("YYYY-MM-DD"),
                }));
                setExpenses(formatted);
            });

        // Gelirleri al
        fetch(`${BASE_URL}/api/income/list`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const formatted = data.incomes.map(item => ({
                    id: item.income_id,
                    name: item.income_name || item.income_source,
                    amount: parseFloat(item.income_amount),
                    category: item.income_category,
                    date: dayjs(item.income_date).format("YYYY-MM-DD"),
                }));
                setIncomes(formatted);
                setLoading(false);
            });
    }, []);

    const totalExpense = expenses.reduce((acc, e) => acc + e.cost, 0);
    const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
    const balance = totalIncome - totalExpense;

    const recentIncomes = incomes.slice(-5).reverse();
    const recentExpenses = expenses.slice(-5).reverse();

    if (loading) {
        return (
            <div>
                <SidebarLayout>
                    <Skeleton />
                </SidebarLayout>

            </div>
        )
    };

    return (
        <div className="homepage-main">
            <ConfigProvider>
                <SidebarLayout>
                    <div className='homepage-container' style={{ padding: 24 }}>

                        {/* Hoşgeldin ve Özet Başlığı */}
                        <Card style={{ marginBottom: 24, textAlign: 'center' }}>
                            <h2>👋 Hoş geldin, {user.firstName}!</h2>
                        </Card>

                        {/* Gelir, Gider ve Bakiye İstatistikleri */}
                        <Row gutter={16} style={{ marginBottom: 24 }}>
                            <Col span={8}>
                                <Card>
                                    <Statistic
                                        title="Toplam Gelir"
                                        value={totalIncome}
                                        precision={2}
                                        prefix={<RiseOutlined />}
                                        suffix="$"
                                        valueStyle={{ color: '#3f8600' }}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <Statistic
                                        title="Toplam Gider"
                                        value={totalExpense}
                                        precision={2}
                                        prefix={<FallOutlined />}
                                        suffix="$"
                                        valueStyle={{ color: '#cf1322' }}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card>
                                    <Statistic
                                        title="Bakiye"
                                        value={balance}
                                        precision={2}
                                        prefix={<DollarOutlined />}
                                        suffix="$"
                                        valueStyle={{ color: balance >= 0 ? 'green' : 'red' }}
                                    />
                                </Card>
                            </Col>
                        </Row>

                        {/* Son Gelirler ve Son Giderler */}
                        <Row gutter={16} style={{ marginBottom: 24 }}>
                            <Col span={12}>
                                <Card title="Son 5 Gelir">
                                    <List
                                        dataSource={recentIncomes}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={item.name}
                                                    description={`Tarih: ${item.date} | Kategori: ${item.category}`}
                                                />
                                                <div style={{ color: "#1890ff" }}>+${item.amount}</div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Son 5 Gider">
                                    <List
                                        dataSource={recentExpenses}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={item.name}
                                                    description={`Tarih: ${item.date} | Kategori: ${item.category}`}
                                                />
                                                <div style={{ color: "#ff4d4f" }}>-${item.cost}</div>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </SidebarLayout>
            </ConfigProvider>
        </div>
    );
}
