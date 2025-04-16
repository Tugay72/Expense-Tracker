import './homepage.css'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfigProvider, Input } from 'antd'
import SidebarLayout from '../../components/sidebar/siderbar';

export default function Homepage() {

    return (
        <div className="homepage-main">
            <ConfigProvider>
                <SidebarLayout>
                    <div className='homepage-container'>

                    </div>
                </SidebarLayout>
            </ConfigProvider>

        </div>
    )
}
