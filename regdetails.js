import React, { useState, useEffect } from 'react';

const RegistrationDetails = () => {
  const [users, setUsers] = useState([]);

  // Get the users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleVerify = (idNumber) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.idNumber === idNumber ? { ...user, verified: true } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const handleDeny = (idNumber) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.idNumber === idNumber ? { ...user, verified: false } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  return (
    <div>
      <h2>Registration Details</h2>

      <div>
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          users.map((user, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p><strong>ID Number:</strong> {user.idNumber}</p>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Status:</strong> {user.verified ? 'Verified' : 'Not Verified'}</p>
              <button onClick={() => handleVerify(user.idNumber)} style={{ marginRight: '5px' }}>
                Confirm Verification
              </button>
              <button onClick={() => handleDeny(user.idNumber)}>Deny Verification</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RegistrationDetails;
