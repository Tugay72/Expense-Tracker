import './homepage.css'
import { ConfigProvider, Card, Col, Row, List } from 'antd';
import SidebarLayout from '../../components/sidebar/siderbar';
import BalanceCharts from '../../components/BalanceCharts';
import incomeData from '../../data/incomeData';
import expensesData from '../../data/expensesData';

export default function Homepage() {
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expensesData.reduce((sum, item) => sum + item.cost, 0);
    const balance = totalIncome - totalExpenses;

    const recentIncomes = incomeData.slice(-5).reverse();
    const recentExpenses = expensesData.slice(-5).reverse();

    return (
        <div className="homepage-main">
            <ConfigProvider>
                <SidebarLayout>
                    <div className='homepage-container' style={{ padding: 24 }}>

                        <div style={{ marginTop: 24, marginBottom: 24, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <BalanceCharts />
                        </div>

                    </div>
                </SidebarLayout>
            </ConfigProvider>
        </div>
    )
}
