import Link from "next/link";
import Card from "../../atoms/Card";
import HeaderTab from "../../atoms/HeaderTab/HeaderTab";
import CardToolbar from "../CardToolbar/CardToolbar";
import {
  generaOpzioniClienti,
  generaOpzioniTecnici,
  visualizzaStatoIntervento,
} from "@/src/utils/utility";
import { useEffect, useState } from "react";
import apiCliente from "@/src/utils/api/cliente";
import apiTecnico from "@/src/utils/api/tecnico";

const ListaInterventi = ({ className, onFilter, interventi }) => {
  const [opzioniTecnici, setOpzioniTecnici] = useState([]);
  const [statoAttivo, setStatoAttivo] = useState(0);

  useEffect(() => {
    resettaSelect();
    apiTecnico.ricerca_tecnici().then((value) => {
      if (value) {
        setOpzioniTecnici(value);
      }
    });
  }, []);

  return (
    <Card className={` ${className}`}>
      <HeaderTab>
        <a
          onClick={() => {
            onFilter("stato", 0);
            setStatoAttivo(0);
          }}
          className={"nav-link " + (statoAttivo === 0 ? "active" : "")}
          href="#"
        >
          Tutti
        </a>
        <a
          onClick={() => {
            onFilter("stato", 1);
            setStatoAttivo(1);
          }}
          className={"nav-link " + (statoAttivo === 1 ? "active" : "")}
          href="#"
        >
          Nuovi
        </a>
        <a
          onClick={() => {
            onFilter("stato", 2);
            setStatoAttivo(2);
          }}
          className={"nav-link " + (statoAttivo === 2 ? "active" : "")}
          href="#"
        >
          Assegnati
        </a>
        <a
          onClick={() => {
            onFilter("stato", 3);
            setStatoAttivo(3);
          }}
          className={"nav-link " + (statoAttivo === 3 ? "active" : "")}
          href="#"
        >
          Completi
        </a>
      </HeaderTab>

      <CardToolbar className="align-items-center pl-24">
        <select
          onChange={(e) => {
            onFilter("tecnico", e.target.value);
            if (e.target.value === "0") {
              resettaSelect();
            }
          }}
          id="miaSelect"
          style={{ display: "block", width: "25%" }}
          className="h-40 pl-0"
        >
          {generaOpzioniTecnici(opzioniTecnici)}
        </select>
      </CardToolbar>
      <div className="row table_header pr-24">
        <div
          style={{ width: "16px", paddingTop: "2px" }}
          className="ml-24 mr-8"
        >
          <input type="checkbox" />
        </div>
        <div className=" col my-auto">
          <label className="m-0">Cliente</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Data Chiamata</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Tecnico</label>
        </div>
        <div className="col pr-0 my-auto ml-auto text-end">
          <label className="m-0">Stato</label>
        </div>
      </div>
      <div id="rowcontainer" className={"row_container "}>
        {interventi &&
          interventi.map((element, index) => {
            return (
              <Link
                href={"/interventi/" + element.id}
                key={index}
                className="row table_row h-56"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: "16px", paddingTop: "2px" }}
                  className="ml-24 mr-8"
                >
                  <input
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    type="checkbox"
                  />
                </div>
                <div className="col my-auto">
                  {element.cliente &&
                    element.cliente.nome + " " + element.cliente.cognome}
                </div>
                <div className="col my-auto">
                  {formatDate(element.data_chiamata)}
                </div>
                <div className="col my-auto">
                  {element.tecnico && element.tecnico.nome}
                </div>
                <div className="text-end col my-auto pr-24">
                  {visualizzaStatoIntervento(element.stato)}
                </div>
              </Link>
            );
          })}
      </div>
    </Card>
  );

  function resettaSelect() {
    const miaSelect = document.getElementById("miaSelect");
    miaSelect.selectedIndex = 0;
  }
};

export default ListaInterventi;
