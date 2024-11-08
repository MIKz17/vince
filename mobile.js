import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { getCurrentTimestamp } from './timestamp';
import { useNavigate } from 'react-router-dom';

const Mobile = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Function to handle the QR code scan result
  const handleDecode = (data) => { 
    if (data && data.text) {
      try {
        const decodedData = JSON.parse(data.text);
        const { serialNumber, firstName, lastName } = decodedData;

        setQrCodeData(data.text);
        setIsScanning(false);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user =>
          user.serialNumber.toString() === serialNumber.toString() &&
          user.firstName === firstName &&
          user.lastName === lastName
        );

        if (user) {
          const timestamp = getCurrentTimestamp(); // Get the 12-hour format timestamp
          navigate('/timestamp', { state: { firstName, lastName, timestamp } });
        } else {
          setErrorMessage('User not found in the database.');
        }
      } catch (err) {
        setErrorMessage('Error decoding QR Code. Please try again.');
        console.error("Error decoding QR Code:", err);
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Code Scan Error:", err);
    setErrorMessage('Failed to scan the QR code. Please try again.');
  };

  const startScanner = () => {
    setQrCodeData(null);
    setErrorMessage('');
    setIsScanning(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>QR Code Scanner</h2>
      {errorMessage && <p style={{ color: 'red' }}><strong>{errorMessage}</strong></p>}
      {isScanning ? (
        <QrReader
          delay={300}
          style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
          onScan={handleDecode}
          onError={handleError}
        />
      ) : (
        <button onClick={startScanner}>Start Scanning</button>
      )}
    </div>
  );
};

export default Mobile;
