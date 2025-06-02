import Link from "next/link";
import { formatDate, visualizzaStatoIntervento } from "@/src/utils/utility";
import { useState } from "react";
import SelectTecnici from "../../atoms/SelectTecnici/SelectTecnici";
import Carta from "../../atoms/Carta/Carta";
import FiltroHeaderLista from "../../atoms/FiltroHeaderLista/FiltroHeaderLista";

const ListaInterventi = ({
  className,
  onFilter,
  onSelectCheckbox = () => null,
  interventi,
  mostraFiltri = true,
  titolo,
  internoPagina = false,
  ctaAggiungi = null,
  rendirizzamento = true,
  ctaSeleziona = null,
}) => {
  const [statoAttivo, setStatoAttivo] = useState(0);

  return (
    <Carta className={` ${className}`}>
      {titolo && <h3 className="mt-24 ml-24">{titolo}</h3>}
      {mostraFiltri && (
        <div
          style={{ borderBottom: "1px solid #e0e0dd" }}
          className="row m-0 pl-24 pr-24 pb-16 pt-16 gap-24"
        >
          <FiltroHeaderLista
            nome="Tutti"
            attivo={statoAttivo === 0}
            onClick={() => {
              onFilter("stato", 0);
              setStatoAttivo(0);
            }}
          />
          <FiltroHeaderLista
            nome="Nuovi"
            attivo={statoAttivo === 1}
            onClick={() => {
              onFilter("stato", 1);
              setStatoAttivo(1);
            }}
          />
          <FiltroHeaderLista
            nome="Assegnati"
            attivo={statoAttivo === 2}
            onClick={() => {
              onFilter("stato", 2);
              setStatoAttivo(2);
            }}
          />
          <FiltroHeaderLista
            nome="Pianificati"
            attivo={statoAttivo === 3}
            onClick={() => {
              onFilter("stato", 3);
              setStatoAttivo(3);
            }}
          />
          <FiltroHeaderLista
            nome="Completati"
            attivo={statoAttivo === 4}
            onClick={() => {
              onFilter("stato", 4);
              setStatoAttivo(4);
            }}
          />
        </div>
      )}
      {mostraFiltri && (
        <div className="row p-24 align-items-center">
          <SelectTecnici className="w-25" onFilter={onFilter} />
        </div>
      )}
      <div className="row p-24 align-items-center">
        <div className="col-1 pl-0 pr-16">
          <input type="checkbox" />
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Cliente</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Data Chiamata</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Indirizzo</label>
        </div>
        <div className="col-1 pl-0 pr-16 text-break">
          <label className="m-0">Tecnico</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Giornata</label>
        </div>
        <div className="col-2 pl-0 pr-0 text-end text-break">
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
              <RigaRendirizzamento
                key={index}
                onSelectCheckbox={onSelectCheckbox}
                element={element}
                index={index}
              />
            ) : (
              <RigaModale
                key={index}
                onSelectCheckbox={onSelectCheckbox}
                ctaSeleziona={ctaSeleziona}
                element={element}
                index={index}
              />
            );
          })}
        {ctaAggiungi && (
          <div
            onClick={() => ctaAggiungi()}
            className="row align-items-center p-24 riga_modale pointer"
          >
            <div className="col-3 pl-0 pr-16 text-break">Aggiungi...</div>
          </div>
        )}
      </div>
    </Carta>
  );
};

const RigaRendirizzamento = ({ element, index, onSelectCheckbox }) => {
  return (
    <Link
      href={"/interventi/" + element.id}
      key={index}
      style={{ borderTop: "1px solid #e0e0dd" }}
      className="row align-items-center p-24"
    >
      <div onClick={(e) => e.stopPropagation()} className="col-1 pl-0 pr-16">
        <input
          onClick={(e) => {
            e.stopPropagation();
            onSelectCheckbox(element.id);
          }}
          type="checkbox"
        />
      </div>
      <div className="col-2 pl-0 pr-16 text-break">
        {element.cliente &&
          element.cliente.nome + " " + element.cliente.cognome}
      </div>
      <div className="col-2 pl-0 pr-16 text-break">
        {formatDate(element.data_chiamata)}
      </div>
      <div className="col-2 pl-0 pr-16 text-break">{element.indirizzo}</div>
      <div className="col-1 pl-0 pr-16 text-break">
        {element.tecnico && element.tecnico.nome}
      </div>
      <div className="col-2 pl-0 pr-16 text-break">
        {element.giornata && formatDate(element.giornata.data)}
      </div>
      <div className="col-2 pl-0 pr-0 text-end text-break">
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
      className="row align-items-center p-24 riga_modale pointer"
    >
      <div onClick={(e) => e.stopPropagation()} className="col-1  pl-0 pr-16">
        <input
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="checkbox"
        />
      </div>
      <div className="col-2 pl-0 pr-16 text-break">
        {element.cliente &&
          element.cliente.nome + " " + element.cliente.cognome}
      </div>
      <div className="col-2 pl-0 pr-16 text-break">
        {formatDate(element.data_chiamata)}
      </div>
      <div className="col-2 pl-0 pr-16 text-break">{element.indirizzo}</div>
      <div className="col-1 pl-0 pr-16 text-break">
        {element.tecnico && element.tecnico.nome}
      </div>
      <div className="col-2 pl-0 pr-16 text-break">
        {element.giornata && formatDate(element.giornata.data)}
      </div>
      <div className="col-2 pl-0 pr-0 text-end text-break">
        {visualizzaStatoIntervento(element.stato)}
      </div>
    </div>
  );
};

export default ListaInterventi;
