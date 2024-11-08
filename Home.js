import React, { useState, useEffect } from 'react';
import ReactQRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [qrData, setQrData] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the logged-in user's ID from localStorage
    const userId = localStorage.getItem('loggedInIdNumber');
    
    // Retrieve all users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user based on their ID
    const user = users.find(u => u.idNumber === userId);
    
    // If the user is found, set their details (serialNumber, firstName, lastName)
    if (user) {
      setUserDetails({
        serialNumber: user.serialNumber,
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
  }, []);

  useEffect(() => {
    // Set QR data only if userDetails is available
    if (userDetails) {
      // Create a QR code data string that includes serialNumber, firstName, and lastName
      setQrData(JSON.stringify({
        serialNumber: userDetails.serialNumber,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName
      }));
    }
  }, [userDetails]);

  // Function to handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('loggedInIdNumber');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome Home</h2>
      {userDetails ? (
        <>
          <p>Your unique serial number:</p>
          <h3>{userDetails.serialNumber}</h3>
          <p>Name: {userDetails.firstName} {userDetails.lastName}</p>

          {/* If userDetails is available, generate and display the QR code */}
          {qrData && (
            <div>
              <h4>QR Code:</h4>
              <ReactQRCode value={qrData} size={256} />
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* Instruction on how the QR code is used */}
      <p>This QR code can be scanned to mark your attendance.</p>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
