import Link from "next/link";
import Card from "../../atoms/Card";
import HeaderTab from "../../atoms/HeaderTab/HeaderTab";
import CardToolbar from "../CardToolbar/CardToolbar";
import { formatDate, generaOpzioniClienti } from "@/src/utils/utility";
import { useEffect, useState } from "react";
import apiCliente from "@/src/utils/api/cliente";

const ListaManutenzioni = ({ className, onFilter, manutenzioni }) => {
  const [opzioniClienti, setOpzioniClienti] = useState([]);

  useEffect(() => {
    resettaSelect();
    apiCliente.ricerca_clienti_per_searchbar().then((value) => {
      if (value) {
        setOpzioniClienti(value);
      }
    });
  }, []);

  return (
    <Card className={` ${className}`}>
      <HeaderTab>
        <a className={"nav-link active"} href="#">
          Tutti
        </a>
      </HeaderTab>

      <CardToolbar className="align-items-center pl-24 h-40">
        <select
          className="w-25 d-block h-100"
          onChange={(e) => {
            onFilter("cliente", e.target.value);
            if (e.target.value === "0") {
              resettaSelect();
            }
          }}
          id="miaSelect"
          style={{ display: "block", width: "25%" }}
        >
          {generaOpzioniClienti(opzioniClienti)}
        </select>
      </CardToolbar>
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
        <div className=" col my-auto">
          <label className="m-0">Data Rapporto</label>
        </div>
        <div className="col pr-0 my-auto ml-auto text-end">
          <label className="m-0">Data Scadenza</label>
        </div>
      </div>
      <div id="rowcontainer" className={"row_container "}>
        {manutenzioni &&
          manutenzioni.map((element, index) => {
            return (
              <Link
                href={"/manutenzioni/" + element.id}
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
                <div className=" col my-auto">
                  {formatDate(element.data_rapporto)}
                </div>
                <div className="text-end col my-auto pr-24">
                  {formatDate(element.data_scadenza)}
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

export default ListaManutenzioni;
