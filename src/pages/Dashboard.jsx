import { useState, useCallback, useRef, useEffect } from 'react';
import { Typography, Alert } from 'antd';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OverviewSection from '../components/OverviewSection';
import ServiceSummary from '../components/ServiceSummary';
import ShareReferral from '../components/ShareReferral';
import ReferralTable from '../components/ReferralTable';
import Loading from '../components/Loading';
import api from '../services/api';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tableLoading, setTableLoading] = useState(false);
  const isFirstLoad = useRef(true);

  const fetchDashboardData = useCallback(async (params = {}) => {
    if (isFirstLoad.current) {
      setLoading(true);
      isFirstLoad.current = false;
    } else {
      setTableLoading(true);
    }
    setError('');

    try {
      const response = await api.get('/api/referrals', { params });
      const responseData = response.data?.data || response.data || {};
      
      let referralsArray = [];
      if (Array.isArray(responseData)) {
         referralsArray = responseData;
      } else if (Array.isArray(responseData.referrals)) {
         referralsArray = responseData.referrals;
      }
      
      setData(prev => {
        // If we only have table updates, preserve layout metrics
        if (prev && Object.keys(params).length > 0) {
           return {
             ...prev,
             referrals: referralsArray
           };
        }
        return {
          metrics: responseData.metrics || [],
          serviceSummary: responseData.serviceSummary || {},
          referral: responseData.referral || {},
          referrals: referralsArray,
        };
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);


  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f7fa' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '40px 50px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '32px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>Referral Dashboard</Title>
          <Text style={{ color: '#666', fontSize: '16px' }}>Track your referrals, earnings, and partner activity in one place.</Text>
        </div>

        {error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }} role="alert" />
        )}

        {data && (
          <>
            <OverviewSection metrics={data.metrics} />
            <ServiceSummary summary={data.serviceSummary} />
            <ShareReferral referral={data.referral} />
            <ReferralTable 
              referrals={data.referrals} 
              onFetchRequested={fetchDashboardData} 
              loading={tableLoading}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
