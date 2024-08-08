import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TermsOfService.css';
const TermsOfService = () => {
  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTermsOfService = async () => {
      try {
        const response = await axios.get('/api/terms-of-service'); // Replace with your API endpoint or file path
        setTerms(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching terms of service');
        setLoading(false);
      }
    };
    fetchTermsOfService();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="terms-of-service">
      <h2>Terms of Service</h2>
      <div className="terms-content">
        {terms ? (
          <div dangerouslySetInnerHTML={{ __html: terms }} />
        ) : (
          <p>No terms of service available.</p>
        )}
      </div>
    </div>
  );
};
export default TermsOfService;
