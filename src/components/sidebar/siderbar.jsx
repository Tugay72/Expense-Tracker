import React from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import {
    UserOutlined,
    SettingOutlined,
    HomeOutlined,
    PieChartOutlined,
    CreditCardOutlined,
    DollarOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Theme from "../../Theme";
import "./sidebar.css";

const { Sider, Content } = Layout;

const SidebarLayout = ({ children }) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined style={{ fontSize: "18px", color: "white" }} />,
            label: "Ana Sayfa",
            onClick: () => navigate("/homepage"),
        },
        {
            key: "2",
            icon: <DollarOutlined style={{ fontSize: "18px", color: "#ffd700" }} />,
            label: "Gelir",
            onClick: () => navigate("/incomes"),
        },
        {
            key: "3",
            icon: <CreditCardOutlined style={{ fontSize: "18px", color: "#28a745" }} />,
            label: "Gider",
            onClick: () => navigate("/expenses"),
        },
        {
            key: "4",
            icon: <PieChartOutlined style={{ fontSize: "18px", color: "#17a2b8" }} />,
            label: "Rapor",
            onClick: () => navigate("/reports"),
        },
        {
            key: "5",
            icon: <UserOutlined style={{ fontSize: "18px", color: "#6c757d" }} />,
            label: "Profil",
            onClick: () => navigate("/profile"),
        },
        {
            key: "6",
            icon: <SettingOutlined style={{ fontSize: "18px", color: "#dc3545" }} />,
            label: "Ayarlar",
            onClick: () => navigate("/settings"),
        },
    ];

    return (
        <ConfigProvider theme={Theme}>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider breakpoint="lg" collapsedWidth="0" className="sidebar">
                    <div className="logo">Menu</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={menuItems}
                        style={{ background: "#1c1f22" }}
                    />
                </Sider>
                <Layout>
                    <Content className="content">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default SidebarLayout;
