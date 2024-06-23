import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token', 'userId', 'userName']);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'userName') setUserName(value);
    if (id === 'userPassword') setUserPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/login', { userName, userPassword });
      console.log('Full server response:', response.data);
      if (response.data.token) {
        const tokenExpiration = 60 * 60; // 토큰 만료 시간: 1시간
        setCookie('token', response.data.token, { path: '/', maxAge: tokenExpiration });
        setCookie('userId', response.data.user_id, { path: '/', maxAge: tokenExpiration });
        setCookie('userName', response.data.user_name, { path: '/', maxAge: tokenExpiration });

        console.log('Login successful:', response.data);
        console.log('Set cookies:', {
          token: response.data.token,
          userId: response.data.user_id,
          userName: response.data.user_name
        });
        console.log('Navigating to:', `/project/${response.data.user_name}`);
        navigate(`/project/${response.data.user_name}`);
      } else {
        setError('Login failed. No token received from the server.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Login;