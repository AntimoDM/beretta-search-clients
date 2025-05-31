import React from "react";
import "./carta.scss";
const Carta = ({ children, className, id }) => {
  return (
    <div id={id} className={`carta ${className}`}>
      {children}
    </div>
  );
};

export default Carta;
