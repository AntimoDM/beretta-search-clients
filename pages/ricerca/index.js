import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import PageTitle from "@/src/components/molecules/PageTitle";
import api from "@/src/helper/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Button from "@/src/components/atoms/Button";
import Card from "@/src/components/atoms/Card";
import { default as Link } from "next/link";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";

export default function RicercaClienti({ router = {} }) {
  const [vals, setVals] = useState({});
  const [oggetti, setOggetti] = useState([]);
  const [ricercaClienti, setRicercaClienti] = useState(false);

  useEffect(() => {
    if (ricercaClienti && !vals.nome && !vals.strada) {
      setRicercaClienti(false);
    }
    if (ricercaClienti && (vals.comune || vals.strada)) {
      trackPromise(
        api.ricerca_clienti(vals.strada, vals.comune).then((value) => {
          if (value) {
            setOggetti(value);
            setRicercaClienti(false);
          }
        })
      );
    }
  }, [ricercaClienti]);

  return (
    <div className="page-container-new">
      <PageTitle
        right={
          <Link href="/ricerca/nuovo">
            <Button beretta={true}>Aggiungi Cliente</Button>
          </Link>
        }
      >
        <h2>Clienti</h2>
      </PageTitle>

      <Card className="mb-32 p-24">
        <h3>Ricerca Puntuale</h3>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Telefono</label>
            <input
              value={vals.phone_number}
              onChange={(e) => {
                setVals({ ...vals, phone_number: e.target.value });
              }}
              onKeyDown={(e) =>
                e.key == "Enter" && router.push("/ricerca/" + vals.phone_number)
              }
              id="phone_number"
            />
          </div>
        </div>
      </Card>

      <Card className="mb-32 p-24">
        <h3>Ricerca Generica</h3>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Strada</label>
            <input
              value={vals.strada}
              onChange={(e) => {
                setVals({ ...vals, strada: e.target.value });
              }}
              onKeyDown={(e) => e.key == "Enter" && setRicercaClienti(true)}
              id="strada"
            />
          </div>

          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Comune</label>
            <input
              value={vals.comune}
              onChange={(e) => {
                setVals({ ...vals, comune: e.target.value });
              }}
              onKeyDown={(e) => e.key == "Enter" && setRicercaClienti(true)}
              id="comune"
            />
          </div>
        </div>
      </Card>

      {oggetti && oggetti.length > 0 && (
        <Card>
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
          <div
            id="rowcontainer"
            style={{ height: "auto" }}
            className={"row_container "}
          >
            {oggetti.map((element, index) => {
              return (
                <Link
                  href={"/ricerca/" + element.telefono_principale}
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
                  <div className="col my-auto">
                    {element.telefono_principale}
                  </div>

                  <div className="text-end col my-auto pr-24">
                    {element.provincia && "(" + element.provincia + ")"}
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      )}

      <LoadingIndicator />
    </div>
  );
}
