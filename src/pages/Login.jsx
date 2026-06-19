import { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin',
        {
          email: values.email || '',
          password: values.password || '',
        }
      );
      const token = response.data?.data?.token;
      if (token) {
        Cookies.set('jwt_token', token);
        navigate('/', { replace: true });
      } else {
        setError('Token not found in response');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f7fa' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
        <Title level={2} style={{ color: '#5b5ce6', textAlign: 'center', margin: '0 0 8px 0' }}>
          Go Business
        </Title>
        <div style={{ textAlign: 'center', marginBottom: '32px', color: '#6c757d', fontSize: '15px' }}>
          Sign in to open your referral dashboard.
        </div>
        
        {error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }} role="alert" />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span style={{ fontWeight: 500 }}>Email</span>}
            name="email"
            htmlFor="email"
          >
            <Input id="email" placeholder="you@example.com" size="large" style={{ borderRadius: '6px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 500 }}>Password</span>}
            name="password"
            htmlFor="password"
          >
            <Input.Password id="password" size="large" style={{ borderRadius: '6px' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{ background: '#5b5ce6', borderColor: '#5b5ce6', borderRadius: '6px', fontWeight: 500 }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
