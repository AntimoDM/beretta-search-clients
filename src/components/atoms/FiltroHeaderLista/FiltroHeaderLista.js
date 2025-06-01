import React from "react";
import "./filtroHeaderLista.scss";

const FiltroHeaderLista = ({
  className,
  nome,
  onClick = () => null,
  attivo,
}) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`filtro_header_lista pointer m-0 p-0 ${className} ${
        attivo ? "attivo" : ""
      }`}
    >
      {nome}
    </div>
  );
};

export default FiltroHeaderLista;
