import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    idNumber: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) =>
        user.idNumber === loginData.idNumber && user.password === loginData.password
    );

    if (user) {
      localStorage.setItem('loggedInIdNumber', user.idNumber); // Save logged-in user ID
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idNumber">ID Number: </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={loginData.idNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleRegisterRedirect}>Go to Register</button>
    </div>
  );
};

export default Login;
