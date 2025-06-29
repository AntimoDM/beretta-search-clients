import Link from "next/link";
import { formatDate } from "@/src/utils/utility";
import SelectTecnici from "../../atoms/SelectTecnici/SelectTecnici";
import Carta from "../../atoms/Carta/Carta";
import FiltroHeaderLista from "../../atoms/FiltroHeaderLista/FiltroHeaderLista";

const ListaGiornate = ({ className, onFilter, giornate }) => {
  return (
    <Carta className={` ${className}`}>
      <div
        style={{ borderBottom: "1px solid #e0e0dd" }}
        className="row m-0 pl-24 pr-24 pb-16 pt-16 gap-24"
      >
        <FiltroHeaderLista nome="Tutte" attivo={true} />
      </div>

      <div className="row p-24 align-items-center">
        <SelectTecnici className="w-25" onFilter={onFilter} />
      </div>
      <div className="row p-24 align-items-center">
        <div className="col-1 pl-0 pr-16">
          <input type="checkbox" />
        </div>
        <div className="col-5 pl-0 pr-16 text-break">
          <label className="m-0">Giorno</label>
        </div>
        <div className="col-6 pl-0 pr-0 text-end text-break">
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
                <div className="col-5 pl-0 pr-16 text-break">
                  {formatDate(element.data)}
                </div>

                <div className="col-6 pl-0 pr-0 text-end text-break">
                  {element.tecnico && element.tecnico.nome}
                </div>
              </Link>
            );
          })}
      </div>
    </Carta>
  );
};

export default ListaGiornate;
