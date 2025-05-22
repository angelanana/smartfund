// src/pages/Login.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { Form, Input, Button, Spin, message } from 'antd';
import styles from './login.module.less';

const Login = () => {
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setIsLoading(true);
    // 简单模拟登录成功
    if (values.username === 'admin' && values.password === '123456') {
      setTimeout(() => {
        message.success('登录成功');
        localStorage.setItem('token', 'mock-token');
        setIsLoading(false);
        navigate('/');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        message.error('用户名或密码错误');
      }, 500);
    }
  };

  return (
    <div className={styles['login-bg']}>
      <div className={styles['login-container']}>
        <div className={styles['login-title']}>SmartFund 登录</div>
        <Spin spinning={isLoading} size="large" >
          <Form onFinish={onFinish} style={{ width: '100%' }}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
