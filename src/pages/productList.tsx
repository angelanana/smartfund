// src/pages/ProductList.tsx
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';

const mockData = [
  { id: 1, name: '基金 A', netValue: 1.25 },
  { id: 2, name: '基金 B', netValue: 2.68 },
  { id: 3, name: '基金 C', netValue: 0.92 },
];

const ProductList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: '基金名称',
      dataIndex: 'name',
    },
    {
      title: '净值',
      dataIndex: 'netValue',
    },
    {
      title: '操作',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => navigate(`/product/${record.id}`)}>
          查看详情
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>基金产品列表</h2>
      <Table rowKey="id" dataSource={mockData} columns={columns} pagination={false} />
    </div>
  );
};

export default ProductList;
