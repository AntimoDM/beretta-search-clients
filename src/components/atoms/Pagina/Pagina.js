import React from "react";
import Loader from "../Loader/Loader";
import "./pagina.scss";

const Pagina = ({ children, className }) => {
  return (
    <div className={`pagina ${className}`}>
      {children}
      <Loader />
    </div>
  );
};

export default Pagina;
