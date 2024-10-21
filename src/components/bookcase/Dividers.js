import React from 'react';

const Dividers = () => {
  return (
    <div 
      style={{
        width: "80%",
        margin: "20px auto",
        height: "1px",
        backgroundColor: "#FFFFFF",
        position: "relative"
      }}
    >
      <span 
        style={{
          position: "absolute",
          right: "0",
          top: "-10px",
          backgroundColor: "#FFFFFF",
          padding: "0 10px",
          color: "#000000"
        }}
      >
        2024
      </span>
    </div>
  );
};

export default Dividers;