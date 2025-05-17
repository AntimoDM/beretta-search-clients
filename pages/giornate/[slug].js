import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ModifyHeader from "@/src/components/molecules/ModifyHeader";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Card from "@/src/components/atoms/Card";
import TableCouponIds from "@/src/components/organisms/TableIds/TableIds";
import {
  createRequestVals,
  formatDate,
  generaOpzioniTecnici,
} from "@/src/utils/utility";
import apiGiornata from "@/src/utils/api/giornata";
import apiIntervento from "@/src/utils/api/intervento";
import Button from "@/src/components/atoms/Button/Button";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaInterventi from "@/src/components/molecules/Interventi/ListaInterventi";

export default function DettaglioGiornata({ router = {} }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({ modificabile: true });
  const [dbVals, setDbVals] = useState({ modificabile: true });
  const [keys, setKeys] = useState([]);
  const [interventi, setInterventi] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [selected_ids, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiGiornata.dettaglio_giornata(slug).then((value) => {
        if (value) {
          setVals(value);
          setDbVals(value);
        }
      })
    );
  }, [slug]);

  useEffect(() => {
    if (!vals.tecnico) return;
    trackPromise(
      apiIntervento.ricerca_interventi(2, vals.tecnico).then((value) => {
        if (value) {
          setInterventi(value);
        }
      })
    );
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
      <TitoloPagina
        titolo={
          slug === "nuovo"
            ? "Nuova Giornata"
            : vals.tecnico && vals.tecnico.nome + " - " + formatDate(vals.data)
        }
        urlIndietro="/giornate"
      />

      <Card className="mb-32 p-24">
        <div className="row mt-0">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Tecnico</label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                handleInput("tecnico", value);

                if (value === "0") {
                  resettaSelect();
                }
              }}
              id="miaSelect"
              placeholder={"Tecnico"}
              className="h-40 pl-0"
            >
              {generaOpzioniTecnici()}
            </select>
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

          <ListaInterventi interventi={interventi} />
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

  function resettaSelect() {
    const miaSelect = document.getElementById("miaSelect");
    miaSelect.selectedIndex = 0;
  }
}
