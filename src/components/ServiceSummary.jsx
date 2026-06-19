import { Card, Col, Row, Typography } from 'antd';
import { formatCurrency } from '../utils/formatCurrency';

const { Title, Text } = Typography;

const ServiceSummary = ({ summary }) => {
  const data = summary || {};
  const service = data.service || '-';
  const yourReferrals = data.yourReferrals !== undefined ? data.yourReferrals : '-';
  const activeReferrals = data.activeReferrals !== undefined ? data.activeReferrals : '-';
  const totalRefEarnings = data.totalRefEarnings !== undefined ? formatCurrency(data.totalRefEarnings) : formatCurrency(0);

  return (
    <div style={{ marginBottom: '32px' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>Service summary</Title>
      <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>Service</Text>
            <div style={{ fontSize: '18px', fontWeight: 500, marginTop: '8px', color: '#5b5ce6' }}>{service}</div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>Your Referrals</Text>
            <div style={{ fontSize: '18px', fontWeight: 500, marginTop: '8px', color: '#333' }}>{yourReferrals}</div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>Active Referrals</Text>
            <div style={{ fontSize: '18px', fontWeight: 500, marginTop: '8px', color: '#333' }}>{activeReferrals}</div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>Total Ref. Earnings</Text>
            <div style={{ fontSize: '18px', fontWeight: 500, marginTop: '8px', color: '#333' }}>{totalRefEarnings}</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ServiceSummary;
