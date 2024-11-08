// TimestampPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentTimestamp } from './timestamp';

const TimestampPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to hold the timestamp and user details
  const [timestamp, setTimestamp] = useState('');
  const { firstName, lastName } = location.state || {};

  useEffect(() => {
    // Set timestamp when component loads
    if (firstName && lastName) {
      setTimestamp(getCurrentTimestamp());
    } else {
      navigate('/'); // Redirect to home if user details are missing
    }
  }, [firstName, lastName, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Attendance Confirmed</h2>
      {firstName && lastName ? (
        <>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Scan Time:</strong> {timestamp}</p>
        </>
      ) : (
        <p style={{ color: 'red' }}>Error: Missing attendance information.</p>
      )}
      <button onClick={() => navigate('/')}>Go Back to Scanner</button>
    </div>
  );
};

export default TimestampPage;
