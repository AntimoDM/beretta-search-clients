import Link from "next/link";
import Card from "../../atoms/Card";
import { formatDate } from "@/src/utils/utility";
import SelectClienti from "../../atoms/SelectClienti/SelectClienti";

const ListaGaranzie = ({ className, onFilter, garanzie }) => {
  return (
    <Card className={` ${className}`}>
      <ul className="nav nav-tabs m-0 p-0">
        <li key={0} className="nav-item ">
          <a className={"nav-link active"} href="#">
            Tutti
          </a>
        </li>
      </ul>

      <div className="row p-24 align-items-center">
        <SelectClienti className="w-25" onFilter={onFilter} />
      </div>

      <div className="row p-24 align-items-center">
        <div className="col-1 pl-0 pr-16">
          <input type="checkbox" />
        </div>
        <div className="col-4 pl-0 pr-16 text-break">
          <label className="m-0">Cliente</label>
        </div>
        <div className="col-3 pl-0 pr-16 text-break">
          <label className="m-0">Data Accensione</label>
        </div>
        <div className="col-4 pl-0 pr-0 text-end text-break">
          <label className="m-0">Data Scadenza</label>
        </div>
      </div>
      <div id="rowcontainer" className={"row_container "}>
        {garanzie &&
          garanzie.map((element, index) => {
            return (
              <Link
                href={"/garanzie/" + element.id}
                key={index}
                style={{ borderTop: "1px solid #e0e0dd" }}
                className="row align-items-center p-24"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="col-1 pl-0 pr-16"
                >
                  <input
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    type="checkbox"
                  />
                </div>
                <div className="col-4 pl-0 pr-16 text-break">
                  {element.cliente &&
                    element.cliente.nome + " " + element.cliente.cognome}
                </div>
                <div className="col-3 pl-0 pr-16 text-break">
                  {formatDate(element.data_accensione)}
                </div>

                <div className="col-4 pl-0 pr-0 text-end text-break">
                  {formatDate(element.data_scadenza)}
                </div>
              </Link>
            );
          })}
      </div>
    </Card>
  );
};

export default ListaGaranzie;
