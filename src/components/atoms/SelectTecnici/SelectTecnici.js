import apiTecnico from "@/src/utils/api/tecnico";
import { generaOpzioniTecnici } from "@/src/utils/utility";
import React, { useEffect, useState } from "react";

const SelectTecnici = ({ onFilter = () => null, className, value }) => {
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
        onFilter("tecnico", Number(e.target.value));
        if (e.target.value === "0") {
          resetSelect();
        }
      }}
      value={value === "0" ? "opzioneNascosta" : value}
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
