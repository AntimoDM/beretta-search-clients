import apiCliente from "@/src/utils/api/cliente";
import React, { useEffect, useState } from "react";

const SelectClienti = ({ onFilter = () => null, className, value }) => {
  const [opzioniClienti, setOpzioniClienti] = useState([]);
  const id = "selectClienti";

  useEffect(() => {
    resetSelect();
    apiCliente.ricerca_clienti_per_searchbar().then((value) => {
      if (value) {
        setOpzioniClienti(value);
      }
    });
  }, []);

  return (
    <select
      onChange={(e) => {
        onFilter("cliente", Number(e.target.value));
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
        Seleziona un cliente
      </option>
      {opzioniClienti &&
        opzioniClienti.map((c) => {
          return <option value={c.value}>{c.label}</option>;
        })}
      <option key={100} value="0">
        Nessun Cliente
      </option>
    </select>
  );

  function resetSelect() {
    const select = document.getElementById(id);
    if (select) select.selectedIndex = 0;
  }
};

export default SelectClienti;
