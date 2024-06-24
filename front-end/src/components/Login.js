import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Footer from './Footer';
import logo from '../logo.png';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f6f7;
`;

const LogoWrapper = styled.div`
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

const LoginForm = styled.form`
  width: 450px;
  background-color: #fff;
  border: 1px solid #c6c6c6;
  padding: 50px 30px;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #03c75a;
  text-align: center;
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #c6c6c6;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #03c75a;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #03c75a;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #02b351;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SignUpLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #555;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 20px;
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
    <>
      <LoginWrapper>
        <LogoWrapper>
          <Logo src={logo} alt="Logo" />
        </LogoWrapper>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login</Title>
          <InputWrapper>
            <Input
              type="text"
              id="userName"
              value={userName}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              id="userPassword"
              value={userPassword}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <SignUpLink href="/signup">Sign Up</SignUpLink>
        </LoginForm>
      </LoginWrapper>
      <Footer />
    </>
  );
};

export default Login;