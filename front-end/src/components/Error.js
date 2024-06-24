import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #888;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #333;
  }
`;

const ErrorTitle = styled.h3`
  font-size: 20px;
  color: #ff4500;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ErrorIcon = styled.span`
  font-size: 24px;
  margin-right: 8px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
`;

const ErrorModal = ({ error, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {error.statusCode && (
          <ErrorTitle>
            <ErrorIcon>🐻🐻🐻</ErrorIcon> Error {error.statusCode}
          </ErrorTitle>
        )}
        <ErrorMessage>{error.message}</ErrorMessage>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ErrorModal;