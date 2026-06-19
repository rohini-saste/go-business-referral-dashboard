import { useState, useEffect } from 'react';
import { Card, Input, Select, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { formatDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';

const { Title } = Typography;
const { Option } = Select;

const ReferralTable = ({ referrals, onFetchRequested, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = { sort: sortOrder };
      if (searchTerm) {
        params.search = searchTerm;
      }
      onFetchRequested(params);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, sortOrder, onFetchRequested]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleRowClick = (record) => {
    navigate(`/referral/${record.id}`);
  };

  const columns = [
    {
      title: <span style={{ fontSize: '12px', color: '#888' }}>NAME</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ fontWeight: 500, color: '#333' }}>{text}</span>,
    },
    {
      title: <span style={{ fontSize: '12px', color: '#888' }}>SERVICE</span>,
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (text, record) => <span style={{ color: '#555' }}>{text || record.service}</span>,
    },
    {
      title: <span style={{ fontSize: '12px', color: '#888' }}>DATE</span>,
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span style={{ color: '#555' }}>{formatDate(date)}</span>,
    },
    {
      title: <span style={{ fontSize: '12px', color: '#888' }}>PROFIT</span>,
      dataIndex: 'profit',
      key: 'profit',
      render: (profit) => <span style={{ color: '#5b5ce6', fontWeight: 500 }}>{formatCurrency(profit)}</span>,
    },
  ];

  const dataSource = (referrals || []).map(r => ({ ...r, key: r.id }));
  
  const totalEntries = dataSource.length;
  const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
      <Title level={4} style={{ marginBottom: '24px' }}>All referrals</Title>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>Search</span>
          <Input 
            placeholder="Name or service…" 
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '250px', borderRadius: '6px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>Sort by date</span>
          <Select 
            value={sortOrder} 
            onChange={handleSortChange}
            style={{ width: '150px' }}
          >
            <Option value="desc">Newest first</Option>
            <Option value="asc">Oldest first</Option>
          </Select>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={currentData} 
        pagination={false}
        loading={loading}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
            style: { cursor: 'pointer' }
          };
        }}
        rowClassName={() => 'referral-table-row'}
      />
      
      <Pagination 
        currentPage={currentPage}
        totalEntries={totalEntries}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
      <style>{`
        .referral-table-row:hover {
          background-color: #f5f7fa !important;
        }
      `}</style>
    </Card>
  );
};

export default ReferralTable;
