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
import Swal from "sweetalert2";

export default function DettaglioIntervento({ router = {}, user, permission }) {
  const STATO_INIZIALE_VALS = {
    data_chiamata: new Date().toISOString().split("T")[0],
    stato: 1,
  };
  const { slug } = router.query || {};
  const [vals, setVals] = useState(STATO_INIZIALE_VALS);
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [opzioniClienti, setOpzioniClienti] = useState([]);
  const [selected_ids, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!slug) return;
    if (slug !== "nuovo") {
      trackPromise(
        api.dettaglio_intervento(slug).then((value) => {
          if (value) {
            _get(value);
          }
        })
      );
    }
  }, [slug]);

  useEffect(() => {
    api.ricerca_clienti_per_searchbar().then((value) => {
      if (value) {
        setOpzioniClienti(value);
      }
    });
  }, []);

  return (
    <div className="page-container-new">
      <ModifyHeader
        onRemove={onRemove}
        onSave={handleSubmit}
        toggle={modifying}
      />

      <PageTitle
        className="mt-48"
        page
        right={
          <>
            {slug !== "nuovo" && vals.stato === 2 && (
              <Button
                onClick={() => {
                  Swal.fire({
                    customClass: "swal_support",
                    title: "Attenzione",
                    text: "L'intervento è stato completato. Procedere?",
                    confirmButtonAriaLabel: "Conferma",
                    confirmButtonText: "Conferma",
                    confirmButtonColor: "#E22623",
                    cancelButtonText: "Annulla",
                    reverseButtons: true,
                  }).then((value) => {
                    if (value.isConfirmed) {
                      trackPromise(
                        api
                          .aggiorna_intervento(vals.id, { stato: 3 })
                          .then((value) => {
                            if (value) {
                              Swal.fire("Successo", "", "success").then(
                                (value) => {
                                  if (value) {
                                    _get(value);
                                  }
                                }
                              );
                            }
                          })
                      );
                    }
                  });
                }}
                color="green"
                className="button_normal ml-16"
              >
                Completato
              </Button>
            )}
            {slug !== "nuovo" && (
              <Button
                onClick={() => {
                  Swal.fire({
                    customClass: "swal_support",
                    title: "Attenzione",
                    text: "L'eliminazione è irreversibile. Procedere?",
                    confirmButtonAriaLabel: "Elimina",
                    confirmButtonText: "Elimina",
                    confirmButtonColor: "#E22623",
                    cancelButtonText: "Annulla",
                    reverseButtons: true,
                  }).then((value) => {
                    if (value.isConfirmed) {
                      trackPromise(
                        api.elimina_intervento(vals.id).then((value) => {
                          if (value) {
                            Swal.fire(
                              "Successo",
                              "L'eliminazione ha avuto successo",
                              "success"
                            ).then((value) => {
                              router.push("/interventi");
                            });
                          }
                        })
                      );
                    }
                  });
                }}
                color="red"
                className="button_normal ml-16"
              >
                Elimina
              </Button>
            )}
          </>
        }
      >
        <div className="m-0 p-0 ">
          <Link className="mt-0 mr-16" href="/interventi">
            <div className="btn btn-outline-secondary button_header_inner">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </div>
          </Link>

          <h4 className="d-inline font-24 lh-24 bolder">
            {vals.cliente} - Stato :{" "}
            {vals.stato && STATI.find((el) => el.value === vals.stato).label}
          </h4>
        </div>
      </PageTitle>
      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Intervento</h2>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Cliente</label>
            <SearchBar
              value={opzioniClienti.find((el) => el.value === vals.cliente)}
              className="h-40 pl-0"
              placeholder={"Cliente"}
              onChange={(e) => handleInput("cliente", e.value)}
              options={opzioniClienti}
            />
          </div>
        </div>

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
            <label className="font-18 lh-24 bold">Data Assegnamento</label>
            <input
              style={{ pointerEvents: "none" }}
              type="date"
              className="w-100"
              value={vals.data_assegnamento}
              onChange={(e) => {
                handleInput("data_assegnamento", e.target.value);
              }}
              id="data_assegnamento"
            />
          </div>
        </div>

        <div className="row mt-8">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Data Chiamata</label>
            <input
              type="date"
              className="w-100"
              value={vals.data_chiamata}
              onChange={(e) => {
                handleInput("data_chiamata", e.target.value);
              }}
              id="data_chiamata"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Data Completamento</label>
            <input
              type="date"
              style={{ pointerEvents: "none" }}
              className="w-100"
              value={vals.data_completamento}
              onChange={(e) => {
                handleInput("data_completamento", e.target.value);
              }}
              id="data_completamento"
            />
          </div>
        </div>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Motivazione</label>
            <textarea
              className="w-100"
              value={vals.motivazione || ""}
              onChange={(e) => {
                handleInput("motivazione", e.target.value);
              }}
              id="motivazione"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Note per il tecnico</label>
            <textarea
              className="w-100"
              value={vals.note_per_tecnico || ""}
              onChange={(e) => {
                handleInput("note_per_tecnico", e.target.value);
              }}
              id="note_per_tecnico"
            />
          </div>
        </div>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Note del tecnico</label>
            <textarea
              className="w-100"
              value={vals.note_del_tecnico || ""}
              onChange={(e) => {
                handleInput("note_del_tecnico", e.target.value);
              }}
              id="note_del_tecnico"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  function onRemove() {
    if (slug !== "nuovo") {
      setVals(dbVals);
    } else setVals(STATO_INIZIALE_VALS);
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
        .aggiorna_intervento(slug, createRequestVals(vals, keys))
        .then((value) => {
          if (value) {
            _get(value);
          }
        });
    } else {
      api.crea_intervento(vals).then((value) => {
        if (value) {
          router.push("/interventi/" + value.id);
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
