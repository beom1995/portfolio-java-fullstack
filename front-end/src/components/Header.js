import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const HeaderArea = styled.header`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-top: 20px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
`;

const HomeButton = styled(Button)`
  height: 100px;
  width: 150px;
  background: url(${logo}) no-repeat center center;
  background-size: contain;
`;

const LogoutButton = styled(Button)`
  font-size: 1rem;
  background-color: #add8e6;
  &:hover {
    background-color: #87ceeb;
  }
`;

export default function Header() {
    const [cookies, removeCookie] = useCookies(['token', 'userId', 'userName']);
    const navigate = useNavigate();

    const handleMoveToHome = () => {
        navigate(`/project/${cookies.userName}`);
    };

    const handleLogout = () => {
        removeCookie('token');
        navigate(`/login`);
    };
    
    return (
        <HeaderArea>
            <HomeButton onClick={handleMoveToHome} />
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </HeaderArea>
    );
}

