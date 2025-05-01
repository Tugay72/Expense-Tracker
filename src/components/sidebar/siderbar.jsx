import React from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import {
    DashboardOutlined,
    FileTextOutlined,
    DollarOutlined,
    UserOutlined,
    SettingOutlined,
    HomeOutlined,
    EuroCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Theme from "../../Theme";
import "./sidebar.css";

const { Header, Sider, Content } = Layout;

const SidebarLayout = ({ children }) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Ana Sayfa",
            onClick: () => navigate("/homepage"),
        },

        {
            key: "2",
            icon: <DollarOutlined />,
            label: "Gider",
            onClick: () => navigate("/expenses"),
        },
        {
            key: "3",
            icon: <EuroCircleOutlined />,
            label: "Gelir",
            onClick: () => navigate("/incomes"),
        },
        {
            key: "4",
            icon: <FileTextOutlined />,
            label: "Rapor",
            onClick: () => navigate("/reports"),
        },
        {
            key: "5",
            icon: <UserOutlined />,
            label: "Profil",
            onClick: () => navigate("/profile"),
        },
        {
            key: "6",
            icon: <SettingOutlined />,
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
