import React from 'react';
import { Button, Form, Input } from 'antd';
import {useDispatch} from "react-redux";
import {successfulLogin} from "../redux/slices/authSlice.ts";
import styles from './AuthorizationPage.module.scss'





type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const AuthorizationPage:React.FC = () => {
    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        dispatch(successfulLogin({...values}))

    };

    const onFinishFailed = (errorInfo: any) => {
    };

    return (
        <div className={styles.container}>
            <Form
                className={styles.center}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AuthorizationPage;

