import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/admin-login', formData);
      const { token, user } = res.data;

      if (user.role !== 'admin') {
        setMessage('Access denied. You are not an admin.');
        return;
      }

      if (user.status === 'blocked') {
        setMessage('Your account is blocked.');
        return;
      }

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to admin panel
      window.location.href = '/admin';

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    // <div className="container mt-5" style={{ maxWidth: '400px' }}>
    //   <h2>Admin Login</h2>
    //   {message && <div className="alert alert-danger">{message}</div>}
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label>Email</label>
    //       <input
    //         name="email"
    //         type="email"
    //         className="form-control"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="mb-3">
    //       <label>Password</label>
    //       <input
    //         name="password"
    //         type="password"
    //         className="form-control"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <button className="btn btn-dark w-100" type="submit">
    //       Login as Admin
    //     </button>
    //   </form>
    // </div>

     <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>

        {message && <div className="admin-login-error">{message}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="admin-login-btn">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;