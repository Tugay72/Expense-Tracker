import './homepage.css'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ConfigProvider, Input } from 'antd'

export default function Homepage() {

    return (
        <div className="homepage-main">
            <ConfigProvider>
                <div className='homepage-container'>


                </div>
            </ConfigProvider>

        </div>
    )
}
