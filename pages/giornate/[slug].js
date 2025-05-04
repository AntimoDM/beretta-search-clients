import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import PageTitle from "@/src/components/molecules/PageTitle";
import ModifyHeader from "@/src/components/molecules/ModifyHeader";
import api from "@/src/helper/api";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Button from "@/src/components/atoms/Button";
import Card from "@/src/components/atoms/Card";
import { default as Link } from "next/link";
import TableCouponIds from "@/src/components/organisms/TableIds/TableIds";
import { createRequestVals, formatDate } from "@/src/helper/utility";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";
import { STATI, TECNICI } from "@/src/model/Tecnici";
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";

export default function EditCollection({ router = {}, user, permission }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({ modificabile: true });
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [errori, setErrori] = useState({});
  const [modifying, setModifying] = useState(false);
  const [selected_ids, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!slug) return;

    if (slug === "nuovo") {
      setVals({ ...vals, modificabile: true });
      setDbVals({ ...dbVals, modificabile: true });
    }

    if (slug !== "nuovo") {
      trackPromise(
        api.get_giornata(slug).then((value) => {
          if (value) {
            setVals(value);
            setDbVals(value);
            console.log(value);
            trackPromise(
              api.ricerca_interventi(2, value.tecnico).then((val) => {
                if (val) {
                  setDesigners(val);
                }
              })
            );
          }
        })
      );
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    if (!vals.tecnico) return;
    if (slug !== "nuovo" && vals.tecnico) {
      trackPromise(
        api.ricerca_interventi(2, vals.tecnico).then((val) => {
          if (val) {
            setDesigners(val);
          }
        })
      );
    }
  }, [vals.tecnico]);

  return (
    <div
      style={vals.modificabile ? {} : { pointerEvents: "none" }}
      className="page-container-new"
    >
      <ModifyHeader
        onRemove={onRemove}
        onSave={handleSubmit}
        toggle={modifying}
      />

      <PageTitle className="pt-10" page right={<></>}>
        <div className="m-0 p-0 ">
          <Link
            style={{ pointerEvents: "auto" }}
            className="mt-0 mr-16"
            href="/giornate"
          >
            <div className="btn btn-outline-secondary button_header_inner">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </div>
          </Link>

          <h4 className="d-inline font-24 lh-24 bolder">
            {formatDate(vals.data)} - {vals.tecnico}
          </h4>
        </div>
      </PageTitle>

      <Card className="mb-32 p-24">
        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Tecnico</label>
            <SearchBar
              value={TECNICI.find((el) => el.value === vals.tecnico)}
              className="h-40 pl-0"
              placeholder={"Tecnico"}
              onChange={(e) => handleInput("tecnico", e.value)}
              options={TECNICI}
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Giorno</label>
            <input
              className="w-100 h-40"
              id="data_chiamata"
              type="date"
              placeholder="Data Chiamata"
              value={vals.data ? vals.data : ""}
              onChange={(e) => {
                handleInput("data", e.target.value);
              }}
            />
          </div>
        </div>
      </Card>

      {slug !== "nuovo" && (
        <>
          <Card className="mb-32 p-24">
            <h2 className="bold lh-24">Interventi</h2>
            <div className="row mt-24">
              <TableCouponIds interventi={vals.interventi} edit={false} />
            </div>
          </Card>

          {selected_ids.length > 0 && (
            <Button
              onClick={() => gestisciAggiuntaIntervento()}
              className="ml-auto"
              color="green"
            >
              Aggiungi
            </Button>
          )}

          <Card className={"mt-32"}>
            <HeaderTab>
              <a className={"nav-link active"} href="#">
                Candidati (tutti quelli in stato nuovo oppure assegnato al
                tecnico corrente)
              </a>
            </HeaderTab>

            <div className="row table_header pr-24">
              <div
                style={{ width: "16px", paddingTop: "2px" }}
                className="ml-24 mr-8"
              >
                <input
                  onChange={() => {
                    if (designers.length === selected_ids.length)
                      setSelectedIds([]);
                    else setSelectedIds(designers.map((single) => single.id));
                  }}
                  checked={
                    selected_ids.length > 0 &&
                    designers.length === selected_ids.length
                  }
                  type="checkbox"
                />
              </div>
              <div style={{ cursor: "pointer" }} className=" col my-auto">
                Cliente
              </div>
              <div style={{ cursor: "pointer" }} className=" col my-auto">
                Data Chiamata
              </div>
              <div
                style={{ cursor: "pointer" }}
                className="col pr-0 my-auto ml-auto text-end"
              >
                Stato
              </div>
            </div>
            <div
              onScroll={(e) => {
                infiniteScroll(e);
              }}
              id="rowcontainer"
              className={"row_container "}
            >
              {designers.map((element, index) => {
                return (
                  <div className="row table_row h-56">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: "16px", paddingTop: "2px" }}
                      className="ml-24 mr-8"
                    >
                      <input
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onChange={() => {
                          manageSelect(element.id);
                        }}
                        checked={selected_ids.indexOf(element.id) > -1}
                        type="checkbox"
                      />
                    </div>
                    <div className="col my-auto">
                      <p
                        style={{ width: "90%" }}
                        className="tooltip_bold bold my-0 text-truncate d-block"
                        title={element.name}
                      >
                        {element.cliente &&
                          element.cliente.nome + " " + element.cliente.cognome}
                      </p>
                    </div>
                    <div className=" col my-auto">
                      {formatDate(element.data_chiamata)}
                    </div>
                    <div className="text-end col my-auto pr-24">
                      {element.stato}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}

      <LoadingIndicator />
    </div>
  );

  function gestisciAggiuntaIntervento() {
    trackPromise(
      api
        .aggiungi_intervento_a_giornata(vals.id, selected_ids)
        .then((value) => {
          if (value) {
            _get(value);
          }
        })
    );
  }

  function manageSelect(id) {
    //setModifying(true);
    var newSelectedIds;
    if (selected_ids.indexOf(id) > -1) {
      newSelectedIds = selected_ids.filter((single) => {
        return single !== id;
      });
      setSelectedIds(newSelectedIds);
    } else {
      newSelectedIds = selected_ids.concat(id);
      setSelectedIds(newSelectedIds);
    }
  }

  function onRemove() {
    if (slug !== "new") {
      setVals(dbVals);
    } else setVals({});
    setModifying(false);
  }

  function handleInput(key, value) {
    if (!modifying) setModifying(true);
    setVals({ ...vals, [key]: value });
    if (!keys.includes(key)) setKeys([...keys, key]);
  }

  function handleSubmit() {
    if (slug !== "nuovo") {
      api
        .aggiorna_giornata(slug, createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            _get(value);
          }
        });
    } else {
      api.crea_giornata(createRequestVals(vals, keys, [])).then((value) => {
        if (value) {
          router.push("/giornate/" + value.id);
        }
      });
    }
  }

  function _get(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
