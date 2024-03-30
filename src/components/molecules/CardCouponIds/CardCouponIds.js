import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import api from "../../../helper/api";
import { useRouter } from "next/router";
import PageTitle from "../PageTitle";
import Card from "../../atoms/Card";
import Button from "../../atoms/Button";
import { formatDate } from "@/src/helper/utility";
import SearchBar from "../SearchBar/SearchBar";

export default function CartaIntervento({ modifyRow = {}, onClick, onSave }) {
  const router = useRouter();
  const [row, setRow] = useState({});
  const { slug } = router.query;

  useEffect(() => {
    if (modifyRow) {
      setRow(modifyRow);
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
                onClick();
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
      <div className="row">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Data Chiamata</label>
          <input
            className="w-100 h-40"
            id="data_chiamata"
            type="date"
            placeholder="Data Chiamata"
            value={row["data_chiamata"]}
            onChange={(e) => {
              handleInput("data_chiamata", e.target.value);
            }}
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Tecnico</label>
          <input
            className="w-100 h-40"
            id="tecnico"
            placeholder="Data Chiamata"
            value={row["tecnico"]}
            onChange={(e) => handleInput("tecnico", e.target.value)}
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Data Completamento</label>
          <input
            type="date"
            className="w-100 h-40"
            id="data_completamento"
            placeholder="Data Chiamata"
            value={row["data_completamento"]}
            onChange={(e) => handleInput()}
          />
        </div>
        <div className="col-6 pr-0 pl-16 reverse">
          <label className="font-18 lh-24 bold">Stato</label>
          <select
            style={{ backgroundColor: "white", borderRadius: "8px" }}
            className="d-block w-50 h-40"
            placeholder={"Stato"}
            value={row["stato"]}
          >
            <option onClick={() => handleInput("stato", "nuovo")}>nuovo</option>
            <option onClick={() => handleInput("stato", "assegnato")}>
              assegnato
            </option>
            <option onClick={() => handleInput("stato", "risolto")}>
              risolto
            </option>
          </select>
        </div>
        <div className="col-6 pl-16 pr-0"></div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Note per tecnico</label>
          <textarea
            className="note"
            placeholder="Note per tecnico"
            value={row["note_per_tecnico"]}
            onChange={(e) => handleInput()}
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">note del tecnico</label>
          <textarea
            className="note"
            placeholder="Note del tecnico"
            value={row["note_del_tecnico"]}
            onChange={(e) => handleInput()}
          />
        </div>
      </div>
      <div className="row mt-16">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Motivazione Chiamata</label>
          <textarea
            className="note"
            placeholder="Motivazione chiamata"
            value={row["motivazione"]}
            onChange={(e) => handleInput()}
          />
        </div>
      </div>

      <div className="d-flex flex-row-reverse mt-24">
        <Button
          data_dismiss="none"
          onClick={() => {
            let vals = {
              ...row,
            };
            console.log("vals", vals);

            trackPromise(
              api.update_coupon_ids(slug, vals).then((value) => {
                if (value) {
                  onSave(value);
                  onClick();
                }
              })
            );
          }}
          className="button_normal"
          color="green"
        >
          Salva
        </Button>
        {modifyRow && modifyRow.id && (
          <Button
            onClick={() => {
              trackPromise(
                api
                  .update_coupon_ids(slug, { ...row, op: "delete" })
                  .then((value) => {
                    if (value) {
                      onSave(value);
                      onClick();
                    }
                  })
              );
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
            onClick();
          }}
          className="button_normal mr-16"
          color="transparent"
        >
          Annulla
        </Button>
      </div>
    </Card>
  );

  function handleInput(key, value) {
    setRow({ ...row, [key]: value });
  }
}
