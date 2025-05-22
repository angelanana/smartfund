import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Login from './pages/login';
import ProductList from './pages/productList';
import ProductDetail from './pages/productDetail';
import Layout from './components/layout';
import New from './pages/new';

function App() {
  const isLogin = !!localStorage.getItem('token');

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={isLogin ? <Layout /> : <Navigate to="/login" replace />}
          >
            <Route index element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="/new" element={<New />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
