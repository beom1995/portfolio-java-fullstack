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
  const [cookies, setCookie] = useCookies(['token']);

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
      const response = await axios.post('/api/auth/login', { userName, userPassword });
      console.log('Full server response:', response);
      // 로그인 성공 시 토큰을 쿠키에 저장
      if (response.data.token) {
        const tokenExpiration = 60 * 60; // 토큰 만료 시간: 1시간
        setCookie('token', response.data.token, { path: '/', maxAge: tokenExpiration }); // 토큰 쿠키 설정
        console.log('Login successful:', response.data);
        // 홈 페이지로 이동
        navigate('/home');
      } else {
        setError('Login failed. No token received from the server.');
      }
    } catch (error) {
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

  if (loading) {
    return <div>Loading...</div>;
  }

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