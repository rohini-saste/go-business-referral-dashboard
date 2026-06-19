import { Card, Col, Row, Typography, Input, Button, message } from 'antd';

const { Title, Text } = Typography;

const ShareReferral = ({ referral }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        messageApi.success('Copied to clipboard');
      }).catch(() => {
        messageApi.error('Failed to copy');
      });
    }
  };

  const link = referral?.link || '';
  const code = referral?.code || '';

  return (
    <div style={{ marginBottom: '32px' }}>
      {contextHolder}
      <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
        <Title level={4} style={{ marginBottom: '24px' }}>Refer friends and earn more</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={14}>
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Your Referral Link</Text>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input value={link} readOnly size="large" style={{ background: '#f8f9fa' }} />
              <Button type="primary" size="large" onClick={() => handleCopy(link)} style={{ background: '#5b5ce6', borderColor: '#5b5ce6', width: '100px', fontWeight: 500, borderRadius: '6px' }}>Copy</Button>
            </div>
          </Col>
          <Col xs={24} md={10}>
            <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Your Referral Code</Text>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input value={code} readOnly size="large" style={{ background: '#f8f9fa' }} />
              <Button type="primary" size="large" onClick={() => handleCopy(code)} style={{ background: '#5b5ce6', borderColor: '#5b5ce6', width: '100px', fontWeight: 500, borderRadius: '6px' }}>Copy</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ShareReferral;
