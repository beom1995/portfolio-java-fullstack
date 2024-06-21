import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    if (userPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/users/signup', {
        userName: userName,
        userPassword: userPassword
      });
      
      // 회원가입 성공 시 처리
      console.log('Signup successful:', response.data);
      // 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // 서버가 응답한 에러 메시지 사용
        setError(error.response.data);
      } else {
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        <label htmlFor="userPassword">Password:</label>
        <input
          type="password"
          id="userPassword"
          value={userPassword}
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