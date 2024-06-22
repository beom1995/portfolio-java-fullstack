import React from 'react';

const ErrorModal = ({ error, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {error.statusCode && <h3>Error {error.statusCode}</h3>}
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;