import apiTecnico from "@/src/utils/api/tecnico";
import React, { useEffect, useState } from "react";

const SelectTecnici = ({ onFilter = () => null, className, value }) => {
  const [opzioniTecnici, setOpzioniTecnici] = useState([]);
  const id = "selectTecnici";

  useEffect(() => {
    resetSelect();
    apiTecnico.ricerca_tecnici_per_searchbar().then((value) => {
      if (value) {
        setOpzioniTecnici(value);
      }
    });
  }, []);

  return (
    <select
      onChange={(e) => {
        onFilter("tecnico", Number(e.target.value));
        if (e.target.value === "0") {
          resetSelect();
        }
      }}
      value={value === "0" ? "opzioneNascosta" : value}
      id={id}
      className={`pl-0 " ${className}`}
      style={{ display: "block" }}
    >
      <option key={0} value="opzioneNascosta" disabled hidden>
        Seleziona un tecnico
      </option>
      {opzioniTecnici &&
        opzioniTecnici.map((t) => {
          return (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          );
        })}

      <option key={100} value="0">
        Annulla
      </option>
    </select>
  );

  function resetSelect() {
    const select = document.getElementById(id);
    if (select) select.selectedIndex = 0;
  }
};

export default SelectTecnici;
