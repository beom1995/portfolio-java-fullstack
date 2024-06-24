import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const HeaderArea = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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
        if(cookies.token !== undefined){
            navigate(`/project/${cookies.userName}`);
        } else {
            navigate(`/login`);
        }
    };
    
    const handleLogout = () => {
        removeCookie('token');
        removeCookie('userId');
        removeCookie('userName');
        navigate(`/login`);
    };
    
    return (
        <HeaderArea>
            <HomeButton onClick={handleMoveToHome} />
            <p style={{'font.weight': 100}}>{cookies.userName}</p>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </HeaderArea>
    );
}
  

