import React from 'react';

const OperationMessage = ({ type, children }) => {
  return (
    <div className={`operation-message ${type}`}>
      {children}
    </div>
  );
};

export default OperationMessage;
