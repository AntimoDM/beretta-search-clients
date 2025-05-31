import React from "react";
import Loader from "../Loader/Loader";

const Pagina = ({ children, className }) => {
  return (
    <div className={`page-container-new " ${className}`}>
      {children}
      <Loader />
    </div>
  );
};

export default Pagina;
