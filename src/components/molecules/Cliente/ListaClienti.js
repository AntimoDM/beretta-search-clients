import Link from "next/link";
import Card from "../../atoms/Card";
import HeaderTab from "../../atoms/HeaderTab/HeaderTab";

const ListaClienti = ({ className, clienti }) => {
  return (
    <Card className={` ${className}`}>
      <h3 className="mt-24 ml-24">Clienti Trovati</h3>

      <HeaderTab>
        <a className={"nav-link active"} href="#">
          Tutti
        </a>
      </HeaderTab>

      <div className="row table_header pr-24">
        <div
          style={{ width: "16px", paddingTop: "2px" }}
          className="ml-24 mr-8"
        >
          <input type="checkbox" />
        </div>
        <div className="col my-auto">
          <label className="m-0">Nome</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Cognome</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Strada</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Comune</label>
        </div>
        <div className="col my-auto">
          <label className="m-0">Numero di Telefono</label>
        </div>
        <div className="col pr-0 my-auto ml-auto text-end">
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
                <div className="col my-auto">{element.nome}</div>
                <div className="col my-auto">{element.cognome}</div>
                <div className="col my-auto">{element.strada}</div>
                <div className="col my-auto">{element.comnune}</div>
                <div className="col my-auto">{element.telefono}</div>

                <div className="text-end col my-auto pr-24">
                  {element.provincia && "(" + element.provincia + ")"}
                </div>
              </Link>
            );
          })}
      </div>
    </Card>
  );
};

export default ListaClienti;
