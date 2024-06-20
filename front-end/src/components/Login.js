import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 쿠키에 토큰이 있으면 로그인 상태로 간주
    if (cookies.token) {
      setIsLoggedIn(true);
    }
  }, [cookies.token]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });
      // 로그인 성공 시 쿠키에 토큰 저장 및 home 페이지로 이동
      setCookie('token', response.data.token, { path: '/' });
      setIsLoggedIn(true);
      const redirectTo = location.state?.from || '/home';
      navigate(redirectTo);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    // 쿠키에서 토큰 삭제
    removeCookie('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Login;