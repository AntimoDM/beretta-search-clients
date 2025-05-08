import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import api from "../../../helper/api";
import { useRouter } from "next/router";
import PageTitle from "../PageTitle";
import Card from "../../atoms/Card";
import Button from "../../atoms/Button";
import { createRequestVals, formatDate } from "@/src/helper/utility";
import SearchBar from "../SearchBar/SearchBar";
import { TECNICI } from "@/src/model/Tecnici";
import Swal from "sweetalert2";

export default function CartaIntervento({
  modifyRow = {},
  onClick,
  onSave,
  onClose,
  clienteID,
}) {
  const STATO_INIZIALE_VALS = {
    data_chiamata: new Date().toISOString().split("T")[0],
    stato: 1,
    cliente: clienteID,
    tecnico: 1,
  };
  const router = useRouter();
  const [vals, setVals] = useState(STATO_INIZIALE_VALS);
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const { slug } = router.query;

  useEffect(() => {
    if (modifyRow && Object.keys(modifyRow).length > 0) {
      _get(modifyRow);
    }
  }, [modifyRow]);

  return (
    <Card className="mb-32 p-24">
      <PageTitle
        className="mb-32"
        right={
          <>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                onClose();
              }}
              src="/media/icon/chiudi.svg"
            />
          </>
        }
      >
        <span
          style={{ fontSize: "20px", lineHeight: "24px" }}
          className=" text-center bold pl-0"
        >
          {modifyRow.id ? "Modifica Intervento" : "Aggiungi Intervento"}
        </span>
      </PageTitle>
      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Tecnico</label>
          <select
            style={{ display: "block", width: "100%" }}
            placeholder={"Tecnico"}
            className="h-40 pl-0"
          >
            <option
              selected={vals.tecnico === 1}
              onClick={() => handleInput("tecnico", 1)}
            >
              Danilo
            </option>
            <option
              selected={vals.tecnico === 2}
              onClick={() => handleInput("tecnico", 2)}
            >
              Mimmo
            </option>
          </select>
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
            style={{ pointerEvents: "none" }}
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
            style={{ pointerEvents: "none" }}
            type="date"
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

      <div className="d-flex flex-row-reverse mt-24">
        <Button
          data_dismiss="none"
          onClick={() => {
            handleSubmit();
          }}
          className="button_normal"
        >
          Salva
        </Button>

        {modifyRow && modifyRow.id && (
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
                          onClick();
                        });
                      }
                    })
                  );
                }
              });
            }}
            color="red"
            className="button_normal mr-16"
          >
            Elimina
          </Button>
        )}

        <Button
          data_dismiss="none"
          onClick={() => {
            onRemove();
            //onClick();
          }}
          style={{
            background: "rgb(145, 145, 145)",
            border: "1px solid #3A3A3A",
            fontSize: "16px",
            color: "#2E2E2E",
          }}
          className="button_normal mr-16"
        >
          Annulla
        </Button>
      </div>
    </Card>
  );

  function handleInput(key, value) {
    setVals({ ...vals, [key]: value });
    if (!keys.includes(key)) setKeys([...keys, key]);
  }

  function handleSubmit() {
    if (vals.id) {
      api
        .aggiorna_intervento(vals.id, createRequestVals(vals, keys))
        .then((value) => {
          if (value) {
            _get(value);
            Swal.fire(
              "Successo",
              "L'aggiornamento ha avuto successo",
              "success"
            ).then((value) => {
              onClick();
            });
          }
        });
    } else {
      api.crea_intervento(vals).then((value) => {
        if (value) {
          if (value) {
            _get(value);
            Swal.fire(
              "Successo",
              "La creazione ha avuto successo",
              "success"
            ).then((value) => {
              onClick();
            });
          }
        }
      });
    }
  }

  function onRemove() {
    if (vals.id) {
      setVals(dbVals);
    } else setVals(STATO_INIZIALE_VALS);
  }

  function _get(value) {
    setVals(value);
    setDbVals(value);
  }
}
