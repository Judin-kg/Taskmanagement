import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const StaffLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('https://task-managment-server-neon.vercel.app/api/auth/login', formData);
      const { token, user } = res.data;

      if (user.status === 'blocked') {
        setMessage('Your account has been blocked by the admin.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the respective dashboard
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/staff/dashboard');
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>

      {message && <div className="alert alert-danger">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100" type="submit">Login</button>
      </form>

      <div className="mt-3 text-center">
        <span>Don't have an account? </span>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default StaffLogin;