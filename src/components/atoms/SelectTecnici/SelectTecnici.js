import apiTecnico from "@/src/utils/api/tecnico";
import { generaOpzioniTecnici, resettaSelect } from "@/src/utils/utility";
import React, { useEffect, useState } from "react";

const SelectTecnici = ({ onFilter = () => null, className }) => {
  const [opzioniTecnici, setOpzioniTecnici] = useState([]);
  const id = "selectTecnici";

  useEffect(() => {
    resetSelect();
    apiTecnico.ricerca_tecnici().then((value) => {
      if (value) {
        setOpzioniTecnici(value);
      }
    });
  }, []);
  return (
    <select
      onChange={(e) => {
        onFilter("tecnico", e.target.value);
        if (e.target.value === "0") {
          resetSelect();
        }
      }}
      id={id}
      className={`h-40 pl-0 " ${className}`}
      style={{ display: "block" }}
    >
      {generaOpzioniTecnici("giornate", opzioniTecnici)}
    </select>
  );

  function resetSelect() {
    const select = document.getElementById(id);
    if (select) select.selectedIndex = 0;
  }
};

export default SelectTecnici;
