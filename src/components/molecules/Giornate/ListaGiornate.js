import Link from "next/link";
import Card from "../../atoms/Card";
import HeaderTab from "../../atoms/HeaderTab/HeaderTab";
import CardToolbar from "../CardToolbar/CardToolbar";
import { formatDate } from "@/src/utils/utility";
import SelectTecnici from "../../atoms/SelectTecnici/SelectTecnici";

const ListaGiornate = ({ className, onFilter, giornate }) => {
  return (
    <Card className={` ${className}`}>
      <HeaderTab>
        <a className={"nav-link active"} href="#">
          Tutti
        </a>
      </HeaderTab>

      <CardToolbar className="align-items-center pl-24 pr-24">
        <SelectTecnici className="w-25" onFilter={onFilter} />
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
};

export default ListaGiornate;
