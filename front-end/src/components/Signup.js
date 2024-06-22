import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ErrorModal from './Error';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [showUsernameWarning, setShowUsernameWarning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 추가
    const navigate = useNavigate();
  
    const handleUserNameChange = (e) => {
      const trimmedUserName = e.target.value.trim();
      if (trimmedUserName !== e.target.value) {
        setShowUsernameWarning(true);
      } else {
        setShowUsernameWarning(false);
      }
      setUserName(trimmedUserName);
    };
  
    const handlePasswordChange = (e) => {
      setUserPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleSignup = async () => {
      if (!userName.trim() || !userPassword.trim() || !confirmPassword.trim()) {
        setShowWarning(true);
        return;
      }
  
      if (userPassword !== confirmPassword) {
        setError({ message: 'Passwords do not match' });
        return;
      }
  
      setIsLoading(true);  // 로딩 시작

      try {
        const response = await axios.post('/api/users/signup', {
          userName: userName,
          userPassword: userPassword
        });
        
        // 회원가입 성공 시 처리
        console.log('Signup successful:', response.data);
        // 로그인 페이지로 이동
        navigate('/login');
      } catch (err) {
        if (err.response) {
          // 서버가 응답한 에러 메시지 사용
          setError({ statusCode: err.response.status, message: err.response.data });
        } else {
          setError({ message: 'Failed to sign up. Please try again.' });
        }
      } finally {
        setIsLoading(false);  // 로딩 종료
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
          {showUsernameWarning && (
            <div className="warning">
              <p>Please enter a username without any spaces.</p>
            </div>
          )}
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
        {error && (
          <ErrorModal
            error={error}
            onClose={() => setError(null)}
          />
        )}
        {showWarning && (
          <div className="warning">
            <p>Please fill in all required fields.</p>
            <button onClick={() => setShowWarning(false)}>OK</button>
          </div>
        )}
        <button onClick={handleSignup} disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
    );
  };

export default Signup;