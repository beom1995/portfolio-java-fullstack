import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Footer from './Footer';
import logo from '../logo.png'; // 로고 이미지 import

const SignupWrapper = styled.div`
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

const SignupForm = styled.form`
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

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
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
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('/api/signup', {
        userName: username, 
        userPassword: password 
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
    <>
      <SignupWrapper>
        <LogoWrapper>
          <Logo src={logo} alt="Logo" />
        </LogoWrapper>
        <SignupForm onSubmit={handleSignup}>
          <Title>Sign Up</Title>
          <InputWrapper>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Sign Up</Button>
        </SignupForm>
      </SignupWrapper>
      <Footer />
    </>
  );
};

export default Signup;