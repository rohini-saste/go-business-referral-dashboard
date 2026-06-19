import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Card, Col, Row } from 'antd';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import api from '../services/api';
import { formatDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';

const { Title, Text } = Typography;

const ReferralDetails = () => {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReferralDetails = async () => {
      try {
        const response = await api.get(`/api/referrals?id=${id}`);
        const responseData = response.data?.data || response.data || {};
        
        let foundReferral = null;

        if (responseData.id === id || String(responseData.id) === String(id)) {
          foundReferral = responseData;
        } else if (responseData.referral && (responseData.referral.id === id || String(responseData.referral.id) === String(id))) {
           foundReferral = responseData.referral;
        } else if (Array.isArray(responseData.referrals)) {
          foundReferral = responseData.referrals.find(r => r.id === id || String(r.id) === String(id));
        } else if (Array.isArray(responseData)) {
          foundReferral = responseData.find(r => r.id === id || String(r.id) === String(id));
        }

        if (foundReferral) {
          setReferral(foundReferral);
        } else {
          setError('Referral not found');
        }
      } catch {
        setError('Referral not found');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f7fa' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '40px 50px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#5b5ce6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
            <span>&larr;</span> Back to dashboard
          </Link>
        </div>

        {error ? (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Title level={2}>{error}</Title>
          </div>
        ) : (
          referral && (
            <div>
              <Title level={2} style={{ marginBottom: '4px', fontWeight: 'bold' }}>Referral Details</Title>
              <Text style={{ color: '#666', display: 'block', marginBottom: '32px', fontSize: '15px' }}>
                Full information for this referral partner.
              </Text>
              
              <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', padding: '12px' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #f0f0f0', marginBottom: '8px' }}>
                  <Title level={3} style={{ margin: 0, fontWeight: 'bold', fontSize: '24px' }}>{referral.name}</Title>
                  <span style={{ 
                    background: '#eef2ff', 
                    color: '#4f46e5', 
                    padding: '6px 14px', 
                    borderRadius: '16px', 
                    fontSize: '13px', 
                    fontWeight: 600 
                  }}>
                    {referral.serviceName || referral.service}
                  </span>
                </div>

                {/* Details list */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', color: '#888' }}>Referral ID</Text>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#333' }}>{referral.id}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', color: '#888' }}>Name</Text>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#333' }}>{referral.name}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', color: '#888' }}>Service Name</Text>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#333' }}>{referral.serviceName || referral.service}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', color: '#888' }}>Date</Text>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#333' }}>{formatDate(referral.date)}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0' }}>
                  <Text type="secondary" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', color: '#888' }}>Profit</Text>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: '#333' }}>{formatCurrency(referral.profit)}</div>
                </div>
              </Card>
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ReferralDetails;
