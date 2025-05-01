import './report.css';
import {
    ConfigProvider,
    Row,
    Col,
    Card,
    Statistic,
    Divider,
    DatePicker,
    List
} from "antd";
import SidebarLayout from "../../components/sidebar/siderbar";
import expensesData from "../../data/expensesData";
import incomeData from "../../data/incomeData";
import dayjs from "dayjs";
import { useState } from "react";
import CategoryCharts from "../../components/CategoryCharts";
import Theme from "../../Theme";

const { RangePicker } = DatePicker;

const ReportPage = () => {
    const [filterRange, setFilterRange] = useState([null, null]);

    const filterByDate = (data) => {
        if (!filterRange[0] || !filterRange[1]) return data;
        return data.filter(item => {
            const date = dayjs(item.date);
            return date.isAfter(filterRange[0].startOf('day')) && date.isBefore(filterRange[1].endOf('day'));
        });
    };

    const filteredExpenses = filterByDate(expensesData);
    const filteredIncomes = filterByDate(incomeData);

    const totalExpense = filteredExpenses.reduce((acc, e) => acc + e.cost, 0);
    const totalIncome = filteredIncomes.reduce((acc, i) => acc + i.amount, 0);
    const balance = totalIncome - totalExpense;

    const topExpenseCategory = filteredExpenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.cost;
        return acc;
    }, {});

    const topIncomeCategory = filteredIncomes.reduce((acc, i) => {
        acc[i.category] = (acc[i.category] || 0) + i.amount;
        return acc;
    }, {});

    // Get the last 5 income and expense records
    const recentIncomes = filteredIncomes.slice(-5).reverse();
    const recentExpenses = filteredExpenses.slice(-5).reverse();

    return (
        <div className="report-page">
            <ConfigProvider theme={Theme}>
                <SidebarLayout>
                    <div style={{ maxWidth: 1500, margin: '0 auto', padding: 12 }}>
                        <div className="report-header">
                            <h1>Finansal Rapor</h1>
                        </div>

                        <div className="filter-container">
                            <RangePicker onChange={(dates) => setFilterRange(dates)} />
                        </div>

                        <div className="summary-cards">
                            <Card className="card-content-center">
                                <Statistic title="Toplam Gelir" value={totalIncome} precision={2} prefix="$" />
                            </Card>
                            <Card className="card-content-center">
                                <Statistic title="Toplam Gider" value={totalExpense} precision={2} prefix="$" />
                            </Card>
                            <Card className="card-content-center">
                                <Statistic
                                    title="Bakiye"
                                    value={balance}
                                    precision={2}
                                    prefix="$"
                                    valueStyle={{ color: balance >= 0 ? 'green' : 'red' }}
                                />
                            </Card>
                        </div>

                        <Divider />

                        <Row gutter={24}>

                            <Col span={12}>
                                <Card title="Kategoriye Göre Gelirler" style={{ marginBottom: 24 }}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            {Object.entries(topIncomeCategory).map(([category, amount]) => (
                                                <Statistic key={category} title={category} value={amount} precision={2} prefix="$" />
                                            ))}
                                        </Col>
                                        <Col span={12}>
                                            <CategoryCharts incomeCategories={topIncomeCategory} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                            <Col span={12}>
                                <Card title="Kategoriye Göre Giderler" style={{ marginBottom: 24 }}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            {Object.entries(topExpenseCategory).map(([category, cost]) => (
                                                <Statistic key={category} title={category} value={cost} precision={2} prefix="$" />
                                            ))}
                                        </Col>
                                        <Col span={12}>
                                            <CategoryCharts expenseCategories={topExpenseCategory} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                        <Divider />

                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card title="Son Gelirler" bordered={false}>
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
                                <Card title="Son Giderler" bordered={false}>
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
};

export default ReportPage;
