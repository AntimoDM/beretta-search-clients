import Link from "next/link";
import Carta from "../../atoms/Carta/Carta";
import FiltroHeaderLista from "../../atoms/FiltroHeaderLista/FiltroHeaderLista";

const ListaClienti = ({ className, clienti }) => {
  return (
    <Carta className={` ${className}`}>
      <h3 className="mt-24 ml-24">Clienti Trovati</h3>

      <div
        style={{ borderBottom: "1px solid #e0e0dd" }}
        className="row m-0 pl-24 pr-24 pb-16 pt-16 gap-24"
      >
        <FiltroHeaderLista nome="Tutti" attivo={true} />
      </div>

      <div className="row p-24 align-items-center">
        <div className="col-1 pl-0 pr-16">
          <input type="checkbox" />
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Nome</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Cognome</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Strada</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Comune</label>
        </div>
        <div className="col-2 pl-0 pr-16 text-break">
          <label className="m-0">Numero di Telefono</label>
        </div>
        <div className="col-1 pl-0 pr-0 text-end text-break">
          <label className="m-0">Provincia</label>
        </div>
      </div>
      <div className="row_container">
        {clienti &&
          clienti.map((element, index) => {
            return (
              <Link
                href={"/clienti/" + element.telefono}
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
                <div className="col-2 pl-0 pr-16 text-break">
                  {element.nome}
                </div>
                <div className="col-2 pl-0 pr-16 text-break">
                  {element.cognome}
                </div>
                <div className="col-2 pl-0 pr-16 text-break">
                  {element.strada}
                </div>
                <div className="col-2 pl-0 pr-16 text-break">
                  {element.comnune}
                </div>
                <div className="col-2 pl-0 pr-16 text-break">
                  {element.telefono}
                </div>

                <div className="col-1 pl-0 pr-0 text-end text-break">
                  {element.provincia && "(" + element.provincia + ")"}
                </div>
              </Link>
            );
          })}
      </div>
    </Carta>
  );
};

export default ListaClienti;
