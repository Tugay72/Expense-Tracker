import "./login.css";
import BASE_URL from "../../config";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Checkbox, ConfigProvider, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Theme from "../../Theme";
import { Link } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Invalid email or password',
        });
    };

    const onFinish = async (values) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            });

            const data = await res.json();

            if (res.ok) {
                // JWT token'ı localStorage'a kaydet
                localStorage.setItem("token", data.token);

                // Giriş başarılı → anasayfaya yönlendir
                navigate("/homepage");
            } else {
                error(); // Hatalı giriş
            }
        } catch (err) {
            console.error("Login error:", err);
            error();
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
                            <h2 className="login-title">Welcome!</h2>

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



                            <p className="register-text">
                                Don't have an account?{" "}
                                <Link to="/register" className="register-link">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default LoginPage;