import React from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import {
    DashboardOutlined,
    FileTextOutlined,
    DollarOutlined,
    UserOutlined,
    SettingOutlined
} from "@ant-design/icons";
import Theme from "../../Theme";
import "./sidebar.css";

const { Header, Sider, Content } = Layout;

const menuItems = [
    {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
    },
    {
        key: "2",
        icon: <FileTextOutlined />,
        label: "Reports",
    },
    {
        key: "3",
        icon: <DollarOutlined />,
        label: "Expenses",
        children: [
            {
                key: "3-1",
                label: "Add Expense",
            },
            {
                key: "3-2",
                label: "My Expenses",
            },
            {
                key: "3-3",
                label: "All Expenses",
            },
        ],
    },
    {
        key: "4",
        icon: <UserOutlined />,
        label: "Profile",
    },
    {
        key: "5",
        icon: <SettingOutlined />,
        label: "Settings",
    },
];

const SidebarLayout = ({ children }) => {
    return (
        <ConfigProvider theme={Theme}>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider breakpoint="lg" collapsedWidth="0" className="sidebar">
                    <div className="logo">Expenses</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={menuItems}
                    />
                </Sider>
                <Layout>
                    <Header className="header">
                        <div className="header-right">
                            <span className="username">User</span>
                        </div>
                    </Header>
                    <Content className="content">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default SidebarLayout;
