import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f7fa', padding: '40px' }}>
      <Title level={1} style={{ fontSize: '72px', color: '#5b5ce6', margin: 0 }}>404</Title>
      <Title level={3} style={{ marginTop: '16px', marginBottom: '24px', color: '#333' }}>Page not found</Title>
      <Link to="/">
        <Button type="primary" size="large" style={{ background: '#5b5ce6', borderColor: '#5b5ce6', borderRadius: '6px' }}>
          Back to dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
