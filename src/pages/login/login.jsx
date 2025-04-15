import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Checkbox, ConfigProvider, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Theme from "../../Theme";

const tempUser = {
    email: 'admin@abc.com',
    password: 'password'
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Invalid email or password',
        });
    };


    const onFinish = (values) => {
        if (
            values.email === tempUser.email &&
            values.password === tempUser.password
        ) {
            navigate("/homepage");
        } else {
            error()
        }
    };




    return (
        <div className="login-main">
            {contextHolder}
            <ConfigProvider theme={Theme}>
                <div className="login-container">
                    <div className="login-left">
                    </div>

                    <div className="login-right">
                        <div className="login-form-container">
                            <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
                                Login
                            </h2>

                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                layout="vertical"
                                style={{ width: "100%" }}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: "Please enter your email!" }]}
                                    label="Email"
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="example@email.com"
                                        style={{
                                            borderRadius: "8px",
                                            padding: "10px",
                                            fontSize: "14px",
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your password!" }]}
                                    label="Password"
                                >
                                    <Input.Password
                                        size="large"
                                        prefix={<LockOutlined />}
                                        placeholder="Your password"
                                        style={{
                                            borderRadius: "8px",
                                            padding: "10px",
                                            fontSize: "14px",
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Checkbox style={{ fontSize: "14px" }}>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        style={{
                                            borderRadius: "8px",
                                            padding: "12px 0",
                                            fontSize: "16px",
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>


                            <p style={{ textAlign: "center", fontSize: "14px" }}>
                                No account? <a><b>Register</b></a>
                            </p>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default LoginPage;
