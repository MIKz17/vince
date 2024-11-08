import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    idNumber: '',
    password: '',
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate a unique serial number
  const generateSerialNumber = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    let serialNumber;
    let unique = false;

    while (!unique) {
      serialNumber = Math.floor(10000000 + Math.random() * 90000000); // 8-digit serial number
      unique = !existingUsers.some(user => user.serialNumber === serialNumber);
    }
    return serialNumber;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.idNumber || !formData.password) {
      alert("All fields are required!");
      return;
    }

    // Validate that the age is a positive number
    if (formData.age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    // Check if the user already exists by ID number
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.idNumber === formData.idNumber);

    if (userExists) {
      alert('A user already exists with this ID number!');
      return;
    }

    // Generate a unique serial number
    const userSerialNumber = generateSerialNumber();

    // Create the user data object
    const userData = {
      ...formData,
      serialNumber: userSerialNumber,
      verified: false,  // New users can be marked unverified initially
    };

    // Store the new user in localStorage
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert("Registration successful!");

    // Redirect to login page after successful registration
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div>
          <label>ID Number:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')} style={{ marginTop: '10px' }}>
        Already have an account?
      </button>
    </div>
  );
};

export default Register;
