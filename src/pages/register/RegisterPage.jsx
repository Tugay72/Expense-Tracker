// src/pages/register/RegisterPage.jsx
import "./RegisterPage.css"; // CSS dosyasını import ediyoruz
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, ConfigProvider, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import Theme from "../../Theme";


const tempUser = {
    email: 'admin@abc.com',
    username: 'admin',
    password: 'password'
}

const RegisterPage = () => {
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
            values.password === tempUser.password &&
            values.username === tempUser.username
        ) {
            navigate("/homepage");
        } else {
            error();
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
                                    name="username"
                                    rules={[{ required: true, message: "Please enter your username!" }]}>
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Your username"
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
