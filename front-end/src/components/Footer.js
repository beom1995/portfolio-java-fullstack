import React from 'react';
import styled from 'styled-components';

const FooterArea = styled.footer`
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin-top: 20px;
`;

export default function Footer() {
    return (
        <FooterArea>
            <p>&copy; 2024 3 Teddy Bears. All rights reserved.</p>
        </FooterArea>
    );
}

