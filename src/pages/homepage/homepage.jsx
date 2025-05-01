import './homepage.css'
import { ConfigProvider } from 'antd';
import SidebarLayout from '../../components/sidebar/siderbar';
import BalanceCharts from '../../components/BalanceCharts';
//import incomeData from '../../data/incomeData';
//import expensesData from '../../data/expensesData';

export default function Homepage() {

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
