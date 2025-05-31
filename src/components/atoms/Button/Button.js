import React from "react";
import "./button.scss";

const Button = ({ children, onClick, disabled = false, className, color }) => {
  return (
    <button
      className={`btn ${className} ${color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
