import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token', 'userId', 'userName']);

  const handleUsernameChange = (e) => {
    const trimmedUsername = e.target.value.trim();
    if (trimmedUsername.includes(' ')) {
      setError('Username cannot contain spaces');
      setUsername(e.target.value);
    } else {
      setError('');
      setUsername(trimmedUsername);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        username,
        password,
      });

      setCookie('token', response.data.token, { path: '/' });
      setCookie('userId', response.data.userId, { path: '/' });
      setCookie('userName', response.data.userName, { path: '/' });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('Failed to sign up');
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
