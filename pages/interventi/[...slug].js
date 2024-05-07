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
import { formatDate } from "@/src/helper/utility";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";

export default function EditCollection({ router = {}, user, permission }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [errori, setErrori] = useState({});
  const [modifying, setModifying] = useState(false);
  const [selected_ids, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!slug) return;

    if (slug[0] == "nuovo") {
      setVals({ ...vals, modificabile: true });
      setDbVals({ ...dbVals, modificabile: true });
      trackPromise(
        api.search_interventi().then((value) => {
          if (value) {
            setDesigners(value);
          }
        })
      );
    }

    if (slug[0] !== "nuovo") {
      trackPromise(
        api.get_giornata(slug).then((value) => {
          if (value) {
            setVals(value);
            setDbVals(value);
            api
              .search_interventi(
                ["nuovo", "assegnato"],
                value.interventi.map((el) => {
                  return el.id;
                }),
                value.tecnico
              )
              .then((val) => {
                if (val) {
                  setDesigners(val);
                }
              });
          }
        })
      );
    }
  }, [slug]);

  return (
    <div className="page-container-new">
      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Intervento</h2>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Tecnico</label>
            <input
              className="w-100"
              value={vals.tecnico}
              onChange={(e) => {
                handleInput("tecnico", e.target.value);
              }}
              id="nome"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Stato</label>
            <input
              className="w-100"
              value={vals.stato}
              onChange={(e) => {
                handleInput("stato", e.target.value);
              }}
              id="cognome"
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
              className="w-100"
              value={vals.data_completamento}
              onChange={(e) => {
                handleInput("strada", e.target.value);
              }}
              id="data_completamento"
            />
          </div>
        </div>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Motivazione</label>
            <input
              className="w-100"
              value={vals.motivazione}
              onChange={(e) => {
                handleInput("motivazione", e.target.value);
              }}
              id="motivazione"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Civico</label>
            <input
              className="w-100"
              value={vals.numero_civico}
              onChange={(e) => {
                handleInput("numero_civico", e.target.value);
              }}
              id="numero_civico"
            />
          </div>
        </div>

        <div className="row mt-8">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Provincia</label>
            <input
              className="w-100"
              value={vals.provincia}
              onChange={(e) => {
                handleInput("provincia", e.target.value);
              }}
              id="provincia"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Comune</label>
            <input
              className="w-100"
              value={vals.comune}
              onChange={(e) => {
                handleInput("comune", e.target.value);
              }}
              id="comune"
            />
          </div>
        </div>

        <div className="row mt-8">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Codice Fiscale</label>
            <input
              className="w-100"
              value={vals.codicefiscale}
              onChange={(e) => {
                handleInput("codicefiscale", e.target.value);
              }}
              id="codicefiscale"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  function gestisciAggiuntaIntervento() {}

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

  function handleSubmit() {}

  function onRemove() {
    setVals(dbVals);
    setTimeout(() => {
      setModifying(false);
    }, 200);
    setKeys([]);
  }

  function handleInput(key, value) {
    if (!modifying) setModifying(true);
    setVals({ ...vals, [key]: value });
    if (!keys.includes(key)) setKeys([...keys, key]);
  }

  function handleSubmit() {
    let requestVals = createRequestVals(vals, keys, m2mAttrs, m2oAttrs);

    console.log(requestVals);
    if (slug === "new") console.log("new");
    else console.log("not new");
  }

  function _get(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
