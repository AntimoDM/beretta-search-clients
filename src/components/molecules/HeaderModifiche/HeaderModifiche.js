import React from "react";
import Bottone from "../../atoms/Bottone/Bottone";
import "./headerModifiche.scss";

const HeaderModifiche = ({ mostra, ctaSalva, ctaAnnulla }) => {
  return (
    <div
      className={`row p-24 align-items-center header_modifiche ${
        mostra ? "mostra" : ""
      }`}
    >
      <div className="col-6 p-0 m-0 d-flex justify-content-start align-items-center gap-16">
        <h4>Modifiche Non salvate</h4>
      </div>
      <div className="col-6 p-0 m-0 d-flex justify-content-end align-items-center gap-16">
        {ctaAnnulla && (
          <Bottone color="grigio" onClick={() => ctaAnnulla()}>
            Annulla
          </Bottone>
        )}
        {ctaSalva && <Bottone onClick={() => ctaSalva()}>Salva</Bottone>}
      </div>
    </div>
  );
};
export default HeaderModifiche;
