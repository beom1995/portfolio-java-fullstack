import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#ff7f50')};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#ff4500')};
  }
`;

const SignUpButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ffdf00;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ffc700;
  }
`;

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
      <Footer />
    </div>
  );
};

export default Login;