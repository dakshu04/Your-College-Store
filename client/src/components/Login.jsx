import { useState } from 'react';
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/login', { username, password, role })
      .then(res => {
        console.log('Response:', res); // Log the entire response object
        console.log('Response Data:', res.data); // Log the response data
        if (res.data.login && res.data.role === 'admin') {
          console.log('Navigating to /dashboard')
          navigate('/dashboard');
        } else {
          console.log('Conditions not met for navigation')
        }
      })
      .catch(err => console.log('Axios error is', err));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2><br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
};
