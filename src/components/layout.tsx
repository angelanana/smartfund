// src/components/Layout.tsx
import { Layout as AntLayout, Menu, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = AntLayout;

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleClickMenu = ({ key }: { key: string }) => {
    if (key === '1') {
      navigate('/');
    }
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: 20 }}>SmartFund</div>
        <Menu theme="dark" mode="horizontal" items={[{ key: '1', label: '基金列表' }]} onClick={handleClickMenu}/>
        <Button type="primary" onClick={logout}>
          退出登录
        </Button>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} SmartFund</Footer>
    </AntLayout>
  );
};

export default Layout;
