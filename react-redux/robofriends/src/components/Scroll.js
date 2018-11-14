import React from 'react';

const Scroll = ({ children }) => {
  return (
    <div 
      style={{
        overflowY: 'scroll',
        borderTop: '0.1rem solid black',
        borderBottom: '0.1rem solid black',
        padding: '1rem',
        'marginTop': '1rem',
        height: '80vh',
      }}
    >
      {children}
    </div>
  );
};

export default Scroll;
