// src/pages/ProductDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';

const productMap: Record<number, { name: string; description: string }> = {
  1: { name: '基金 A', description: '这是基金 A 的介绍' },
  2: { name: '基金 B', description: '这是基金 B 的介绍' },
  3: { name: '基金 C', description: '这是基金 C 的介绍' },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = productMap[Number(id)];

  if (!product) return <p>未找到该基金</p>;

  return (
    <Card title={product.name} extra={<Button onClick={() => navigate(-1)}>返回</Button>}>
      <p>{product.description}</p>
    </Card>
  );
};

export default ProductDetail;
