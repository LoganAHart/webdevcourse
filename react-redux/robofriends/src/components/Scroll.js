import React from 'react';

const Scroll = ({ children }) => {
  return (
    <div 
      style={{
        overflowY: 'scroll',
        border: '0.1rem solid black',
        padding: '1rem',
        'marginTop': '1rem',
        height: '50rem',
      }}
    >
      {children}
    </div>
  );
};

export default Scroll;
