import {Button, Form, Input, message, Space} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {userSubject} from "../helpers/user";
import getConfig from "next/config";
import Link from 'next/link';

const {publicRuntimeConfig} = getConfig();

export const TopHeader = () => {
    const [form] = Form.useForm();
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);
    const [registerButtonClass, setRegisterButtonClass] = useState('');
    const [loginButtonClass, setLoginButtonClass] = useState('');

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);
    }, []);

    function authCheck(url: string) {
        setUser(userSubject.value);
        const publicPaths = ['/login', '/register'];
        const path = url.split('?')[0];
        if (!userSubject.value && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/'
            });
        } else {
            setAuthorized(true);
        }
    }

    function logout() {
        setAuthorized(false);
        setUser(null);
        localStorage.removeItem('user');
        userSubject.next(null);
        router.push({
            pathname: '/',
        });
    }

    const onSubmit = (values: any) => {
        if (action) {
            fetch(`${publicRuntimeConfig.apiUrl}/${action}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(values)
            })
                .then(value => value.json())
                .then(value => {
                    setLoading(false);
                    if (value.message) {
                        if (action === 'register') {
                            setRegisterButtonClass('register-failed');
                        }
                        if (action === 'authenticate') {
                            setLoginButtonClass('login-failed');
                        }
                        message.error(value.message);
                    } else {
                        if (action === 'register') {
                            message.success('Registered success.');
                            setRegisterButtonClass('register-success');
                        }
                        if (action === 'authenticate') {
                            setLoginButtonClass('login-success');
                            userSubject.next(value);
                            localStorage.setItem('user', JSON.stringify(value));
                            setAuthorized(true);
                            setUser(value);
                            form.resetFields();
                            message.success('Authenticated success.');
                        }
                    }
                })
                .catch(reason => {
                    setLoading(false);
                    message.error(reason.message);
                    if (action === 'register') {
                        setRegisterButtonClass('register-failed');
                    }
                    if (action === 'authenticate') {
                        setLoginButtonClass('login-failed');
                    }
                });
        }
    };

    return (
        <>
            <Space>
                {
                    !authorized &&
                    <Form form={form} name="horizontal_login" layout="inline" onFinish={onSubmit} className="login-form">
                        <Form.Item
                            name="username"
                            rules={[{required: true, type: 'email', message: 'Please input your username!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item shouldUpdate>
                            {() => (
                                <>
                                    <Button
                                        className={`mr-3 ${loginButtonClass}`}
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        onClick={() => {
                                            setAction('authenticate');
                                            setLoading(true);
                                        }}
                                        disabled={
                                            !form.isFieldsTouched(true) ||
                                            !!form.getFieldsError().filter(({errors}) => errors.length).length
                                        }
                                    >
                                        Log in
                                    </Button>

                                    <Button
                                        type="default"
                                        htmlType="submit"
                                        loading={loading}
                                        className={registerButtonClass}
                                        onClick={() => {
                                            setAction('register');
                                            setLoading(true);
                                        }}
                                        disabled={
                                            !form.isFieldsTouched(true) ||
                                            !!form.getFieldsError().filter(({errors}) => errors.length).length
                                        }
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </Form.Item>
                    </Form>
                }

                {
                    authorized &&
                    <>
                        <Link href="/share">
                            <Button className="share-video" type="primary" htmlType="button">Share Video</Button>
                        </Link>
                        <Button type="link" onClick={logout}>Logout</Button>
                    </>
                }
            </Space>
        </>
    );
}