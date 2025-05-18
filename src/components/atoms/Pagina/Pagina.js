import React from "react";
import LoadingIndicator from "../Load/LoadPromise";

const Pagina = ({ children, className }) => {
  return (
    <div className={`page-container-new " ${className}`}>
      {children}
      <LoadingIndicator />
    </div>
  );
};

export default Pagina;
