import Link from "next/link";
import Card from "../../atoms/Card";
import HeaderTab from "../../atoms/HeaderTab/HeaderTab";
import CardToolbar from "../CardToolbar/CardToolbar";
import { formatDate, visualizzaStatoIntervento } from "@/src/utils/utility";
import { useState } from "react";
import SelectTecnici from "../../atoms/SelectTecnici/SelectTecnici";

const ListaInterventi = ({
  className,
  onFilter,
  onSelectCheckbox = () => null,
  interventi,
  mostraFiltri = true,
  titolo,
  internoPagina = true,
  ctaAggiungi = null,
  ctaChiudi = null,
  rendirizzamento = true,
  ctaSeleziona = null,
}) => {
  const [statoAttivo, setStatoAttivo] = useState(0);

  return (
    <Card className={` ${className}`}>
      {titolo && <h3 className="mt-24 ml-24">{titolo}</h3>}
      {ctaChiudi && <h3 className="mt-24 ml-24 text-right">X</h3>}
      {mostraFiltri && (
        <>
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
            <SelectTecnici className="w-25" onFilter={onFilter} />
          </CardToolbar>
        </>
      )}
      <div className="row table_header pr-24">
        <div
          style={{ width: "16px", paddingTop: "2px" }}
          className="ml-24 mr-8"
        >
          <input type="checkbox" />
        </div>
        <div className="col my-auto">
          <label className="m-0">Cliente</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Data Chiamata</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Indirizzo</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Tecnico</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Giornata</label>
        </div>
        <div className="col pr-0 my-auto ml-auto text-end">
          <label className="m-0">Stato</label>
        </div>
      </div>
      <div
        id="rowcontainer"
        className={`row_container ${internoPagina && "interno_pagina"}`}
      >
        {interventi &&
          interventi.map((element, index) => {
            return rendirizzamento ? (
              <RigaRendirizzamento element={element} index={index} />
            ) : (
              <RigaModale
                ctaSeleziona={ctaSeleziona}
                element={element}
                index={index}
              />
            );
          })}
        {ctaAggiungi && (
          <div
            onClick={() => ctaAggiungi()}
            className="row table_row h-56 pointer riga_modale"
          >
            <div className="col my-auto">Aggiungi...</div>
          </div>
        )}
      </div>
    </Card>
  );
};

const RigaRendirizzamento = ({ element, index }) => {
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
            onSelectCheckbox(element.id);
          }}
          type="checkbox"
        />
      </div>
      <div className="col my-auto">
        {element.cliente &&
          element.cliente.nome + " " + element.cliente.cognome}
      </div>
      <div className="col my-auto">{formatDate(element.data_chiamata)}</div>
      <div className="col my-auto">{element.indirizzo}</div>
      <div className="col my-auto">
        {element.tecnico && element.tecnico.nome}
      </div>
      <div className="col my-auto">
        {element.giornata && formatDate(element.giornata.data)}
      </div>
      <div className="text-end col my-auto pr-24">
        {visualizzaStatoIntervento(element.stato)}
      </div>
    </Link>
  );
};

const RigaModale = ({ element, index, ctaSeleziona = null }) => {
  return (
    <div
      onClick={() => ctaSeleziona(element)}
      key={index}
      className="row table_row h-56 riga_modale pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "16px", paddingTop: "2px" }}
        className="ml-24 mr-8"
      >
        <input
          onClick={(e) => {
            e.stopPropagation();
            onSelectCheckbox(element.id);
          }}
          type="checkbox"
        />
      </div>
      <div className="col my-auto">
        {element.cliente &&
          element.cliente.nome + " " + element.cliente.cognome}
      </div>
      <div className="col my-auto">{formatDate(element.data_chiamata)}</div>
      <div className="col my-auto">{element.indirizzo}</div>
      <div className="col my-auto">
        {element.tecnico && element.tecnico.nome}
      </div>
      <div className="col my-auto">
        {element.giornata && formatDate(element.giornata.data)}
      </div>
      <div className="text-end col my-auto pr-24">
        {visualizzaStatoIntervento(element.stato)}
      </div>
    </div>
  );
};

export default ListaInterventi;
