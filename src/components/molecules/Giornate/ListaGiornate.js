import Link from "next/link";
import Card from "../../atoms/Card";
import HeaderTab from "../../atoms/HeaderTab/HeaderTab";
import CardToolbar from "../CardToolbar/CardToolbar";
import { formatDate, generaOpzioniTecnici } from "@/src/utils/utility";
import { useEffect, useState } from "react";
import apiTecnico from "@/src/utils/api/tecnico";

const ListaGiornate = ({ className, onFilter, giornate }) => {
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
    <Card className={` ${className}`}>
      <HeaderTab>
        <a className={"nav-link actove"} href="#">
          Tutti
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
        <div className="col my-auto">
          <label className="m-0">Giorno</label>
        </div>
        <div className="col pr-0 my-auto ml-auto text-end">
          <label className="m-0">Tecnico</label>
        </div>
      </div>
      <div id="rowcontainer" className={"row_container "}>
        {giornate &&
          giornate.map((element, index) => {
            return (
              <Link
                href={"/giornate/" + element.id}
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
                <div className="col my-auto">{formatDate(element.data)}</div>

                <div className="text-end col my-auto pr-24">
                  {element.tecnico && element.tecnico.nome}
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

export default ListaGiornate;
