// index.js or App.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './Home';
import Admins from './Admins';
import Mobile from './mobile';
import RegDetails from './regdetails';
import TimestampPage from './TimestampPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admins" element={<Admins />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/regdetails" element={<RegDetails />} />
        <Route path="/timestampPage" element={<TimestampPage />} />

        {/* Fallback route for non-existent paths */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
