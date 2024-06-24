import React from 'react';
import styled from 'styled-components';

const FooterArea = styled.footer`
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  color: #666;
`;

const FooterText = styled.p`
  margin: 0;
`;

const HighlightText = styled.span`
  color: #19ce60;
  font-weight: bold;
`;

export default function Footer() {
  return (
    <FooterArea>
      <FooterText>
        &copy; 2024 <HighlightText>3 Teddy Bears</HighlightText>. All rights reserved.
      </FooterText>
    </FooterArea>
  );
}