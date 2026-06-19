import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#f8f9fa', padding: '24px 50px', marginTop: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#5b5ce6' }}>Go Business</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/about" style={{ color: '#666', textDecoration: 'none' }}>About</Link>
          <Link to="/privacy" style={{ color: '#666', textDecoration: 'none' }}>Privacy</Link>
        </div>
        <div style={{ color: '#999', fontSize: '14px' }}>
          © 2024 Go Business
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
