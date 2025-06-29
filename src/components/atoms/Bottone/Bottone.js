import React from "react";
import "./bottone.scss";

const Bottone = ({ children, onClick, disabled = false, className, color }) => {
  return (
    <button
      className={`bottone ${className} ${color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Bottone;
