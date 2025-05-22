// src/pages/ProductList.tsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Space, Card } from 'antd';
import type { TableProps } from 'antd';

// 模拟接口请求
const fetchProducts = async (params: any) => {
  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `基金 ${String.fromCharCode(65 + (index % 26))}`,
    netValue: (Math.random() * 3).toFixed(2),
    riskLevel: ['低风险', '中风险', '高风险'][Math.floor(Math.random() * 3)],
    manager: `基金经理${index + 1}`,
    establishmentDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString().split('T')[0],
    totalAssets: (Math.random() * 1000).toFixed(2) + '亿',
    dailyReturn: (Math.random() * 2 - 1).toFixed(2) + '%',
  }));

  // 模拟搜索
  const filteredData = mockData.filter(item => 
    item.name.toLowerCase().includes(params.search?.toLowerCase() || '')
  );

  // 模拟分页
  const start = (params.current - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedData = filteredData.slice(start, end);

  return {
    data: paginatedData,
    total: filteredData.length,
  };
};

const ProductList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    sortField: '',
    sortOrder: '',
  });

  // 使用 useMemo 缓存列定义
  const columns = useMemo(() => [
    {
      title: '基金名称',
      dataIndex: 'name',
      // sorter: true,
    },
    {
      title: '净值',
      dataIndex: 'netValue',
      sorter: true,
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      filters: [
        { text: '低风险', value: '低风险' },
        { text: '中风险', value: '中风险' },
        { text: '高风险', value: '高风险' },
      ],
    },
    {
      title: '基金经理',
      dataIndex: 'manager',
    },
    {
      title: '成立日期',
      dataIndex: 'establishmentDate',
      sorter: true,
    },
    {
      title: '总资产',
      dataIndex: 'totalAssets',
      sorter: true,
    },
    {
      title: '日收益率',
      dataIndex: 'dailyReturn',
      sorter: true,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (_: any, record: any) => (
        <a onClick={() => navigate(`/product/${record.id}`)}>查看详情</a>
      ),
    },
  ], [navigate]);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchProducts({
          ...tableParams,
          search: searchText,
        });
        setData(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tableParams, searchText]);

  // 处理表格变化
  const handleTableChange: TableProps<any>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
    });
  };

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Input.Search
          placeholder="搜索基金名称"
          allowClear
          enterButton="搜索"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: tableParams.current,
            pageSize: tableParams.pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1300 }}
          size="middle"
        />
      </Space>
    </Card>
  );
};

export default ProductList;
