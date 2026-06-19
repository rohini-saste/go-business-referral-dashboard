import { Card, Col, Row, Typography } from 'antd';
import { DollarOutlined, PercentageOutlined, LinkOutlined, HourglassOutlined, TeamOutlined, SwapOutlined } from '@ant-design/icons';
import { formatCurrency } from '../utils/formatCurrency';

const { Title, Text } = Typography;

const iconMap = {
  'Total Balance': <DollarOutlined />,
  'Discount Percentage': <PercentageOutlined />,
  'Total Referral': <LinkOutlined />,
  'Discount Amount': <HourglassOutlined />,
  'Commission Amount': <PercentageOutlined />,
  'Total Earning': <DollarOutlined />,
  'Commission Discount': <TeamOutlined />,
  'Total Bank Transfer': <SwapOutlined />,
};

const OverviewSection = ({ metrics }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>Overview</Title>
      <Row gutter={[16, 16]}>
        {metrics && metrics.map((metric, index) => {
          const isCurrency = metric.label.includes('Balance') || metric.label.includes('Amount') || metric.label.includes('Earning') || metric.label.includes('Transfer');
          const isPercentage = metric.label.includes('Percentage') || metric.label.includes('Commission Discount'); 
          
          let displayValue = metric.value;
          if (isCurrency) {
            displayValue = formatCurrency(metric.value);
          } else if (isPercentage && typeof metric.value === 'number') {
             if (String(metric.value).indexOf('%') === -1) {
                displayValue = `${metric.value}%`;
             }
          }

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#5b5ce6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '16px' }}>
                  {iconMap[metric.label] || <DollarOutlined />}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}>
                  {displayValue}
                </div>
                <Text style={{ color: '#888', fontSize: '13px', textTransform: 'capitalize' }}>{metric.label}</Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default OverviewSection;
