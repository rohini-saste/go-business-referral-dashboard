import { Button, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  };

  return (
    <Header style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 50px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#5b5ce6' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Go Business</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button 
          type="primary" 
          style={{ 
            background: '#5b5ce6', 
            borderColor: '#5b5ce6', 
            borderRadius: '20px', 
            fontWeight: 500,
            padding: '0 20px',
            height: '36px'
          }}
        >
          Try for free
        </Button>
        <Button 
          danger 
          onClick={handleLogout} 
          style={{ 
            borderRadius: '20px', 
            fontWeight: 500,
            height: '36px',
            border: '1px solid rgba(255, 77, 79, 0.3)',
            color: '#cf1322',
            background: '#fff',
            padding: '0 20px'
          }}
        >
          Log out
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
