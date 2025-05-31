import React from "react";
import Button from "../../atoms/Button/Button";
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
          <Button color="grigio" onClick={() => ctaAnnulla()}>
            Annulla
          </Button>
        )}
        {ctaSalva && <Button onClick={() => ctaSalva()}>Salva</Button>}
      </div>
    </div>
  );
};
export default HeaderModifiche;
