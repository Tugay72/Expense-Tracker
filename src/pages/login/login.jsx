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
                    <div className="login-left"></div>

                    <div className="login-right">
                        <div className="login-form-container">
                            <h2 className="login-title">Welcome Back!</h2>

                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                layout="vertical"
                                className="login-form"
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
                                        className="login-input"
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
                                        className="login-input"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Checkbox className="remember-me">Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        className="login-button"
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="divider">
                                <div className="line" />
                                <p className="divider-text">Or Login with</p>
                                <div className="line" />
                            </div>

                            <Button
                                type="default"
                                size="large"
                                block
                                icon={
                                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                                        alt="Google"
                                        className="google-icon"
                                    />
                                }
                                className="google-button"
                            >
                                Continue with Google
                            </Button>

                            <p className="register-text">
                                Don't have an account?
                                <a href="/register" className="register-link">
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default LoginPage;