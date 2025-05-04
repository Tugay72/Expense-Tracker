import "./RegisterPage.css";
import BASE_URL from "../../config";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, ConfigProvider, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import Theme from "../../Theme";


const RegisterPage = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password
                })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                navigate("/login");
            } else {
                messageApi.error(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Register error:", err);
            messageApi.error("An error occurred during registration");
        }
    };



    return (
        <div className="register-main">
            {contextHolder}
            <ConfigProvider theme={Theme}>
                <div className="register-container">
                    <div className="register-left"></div>

                    <div className="register-right">
                        <div className="register-form-container">
                            <h2 className="register-title">Create an Account</h2>

                            <Form
                                name="register"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                layout="vertical"
                                className="register-form"
                            >
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: "Please enter your email!" }]}>
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />}
                                        placeholder="example@email.com"
                                        className="register-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="first_name"
                                    rules={[{ required: true, message: "Please enter your first name!" }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="First Name"
                                        className="register-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="last_name"
                                    rules={[{ required: true, message: "Please enter your last name!" }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Last Name"
                                        className="register-input"
                                    />
                                </Form.Item>


                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your password!" }]}>
                                    <Input.Password
                                        size="large"
                                        prefix={<LockOutlined />}
                                        placeholder="Your password"
                                        className="register-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,

                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ]}

                                >
                                    <Input.Password
                                        size="large"
                                        prefix={<LockOutlined />}
                                        placeholder="Confirm your password"
                                        className="register-input"
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
                                        className="register-button"
                                    >
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>

                            <p className="register-text">
                                Already have an account?
                                <a href="/login" className="register-link">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default RegisterPage;
