import { useEffect, useState } from "react";
import Card from "../../atoms/Card";
import apiTecnico from "@/src/utils/api/tecnico";
import { generaOpzioniTecnici } from "@/src/utils/utility";

const FormIntervento = ({ className, onChange, vals, disabled = false }) => {
  const [opzioniTecnici, setOpzioniTecnici] = useState([]);

  useEffect(() => {
    resettaSelect();
    apiTecnico.ricerca_tecnici().then((value) => {
      if (value) {
        setOpzioniTecnici(value);
      }
    });
  }, []);

  return (
    <Card className={`p-24 ${className}`}>
      <h3>Dettaglio Intervento</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Tecnico</label>
          <select
            onChange={(e) => {
              const value = e.target.value;
              onChange("tecnico", value);
            }}
            id="miaSelect"
            className="h-40 pl-0"
          >
            {generaOpzioniTecnici("interventi", opzioniTecnici)}
          </select>
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Data Assegnamento</label>
          <input
            disabled
            type="date"
            className="w-100"
            value={vals.data_assegnamento}
            onChange={(e) => {
              onChange("data_assegnamento", e.target.value);
            }}
            id="data_assegnamento"
          />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Data Chiamata</label>
          <input
            type="date"
            value={vals.data_chiamata}
            onChange={(e) => {
              onChange("data_chiamata", e.target.value);
            }}
            id="data_chiamata"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Data Completamento</label>
          <input
            type="date"
            disabled
            value={vals.data_completamento}
            onChange={(e) => {
              onChange("data_completamento", e.target.value);
            }}
            id="data_completamento"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Motivazione</label>
          <textarea
            value={vals.motivazione || ""}
            onChange={(e) => {
              onChange("motivazione", e.target.value);
            }}
            id="motivazione"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Note per il tecnico</label>
          <textarea
            value={vals.note_per_tecnico || ""}
            onChange={(e) => {
              onChange("note_per_tecnico", e.target.value);
            }}
            id="note_per_tecnico"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Note del tecnico</label>
          <textarea
            value={vals.note_del_tecnico || ""}
            onChange={(e) => {
              onChange("note_del_tecnico", e.target.value);
            }}
            id="note_del_tecnico"
          />
        </div>
      </div>
    </Card>
  );

  function resettaSelect() {
    const miaSelect = document.getElementById("miaSelect");
    miaSelect.selectedIndex = 0;
  }
};

export default FormIntervento;
