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
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";

export default function EditCollection({ router = {}, user, permission }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [errori, setErrori] = useState({});
  const [modifying, setModifying] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!slug) return;

    if (slug !== "nuovo") {
      trackPromise(
        api.get_garanzia(slug).then((value) => {
          if (value) {
            setVals(value);
            setDbVals(value);
          }
        })
      );
    }
  }, [slug]);

  return (
    <div className="page-container-new">
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
            href="/garanzie"
          >
            <div className="btn btn-outline-secondary button_header_inner">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </div>
          </Link>

          <h4 className="d-inline font-24 lh-24 bolder">
            Garanzia di{" "}
            {vals.cliente && vals.cliente.cognome + " " + vals.cliente.nome} -{" "}
            {formatDate(vals.data_accensione)}
          </h4>
        </div>
      </PageTitle>

      <Card className="mb-32 p-24">
        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            {slug !== "nuovo" ? (
              <>
                <label className="font-18 lh-24 bold">Cliente</label>
                <a
                  target="_blank"
                  href={
                    "/ricerca/" + (vals.cliente ? vals.cliente.telefono : "")
                  }
                >
                  {vals.cliente &&
                    vals.cliente.cognome + " " + vals.cliente.nome}
                </a>
              </>
            ) : (
              <>
                <SearchBar
                  value={[].find((el) => el.label == filters.tecnico)}
                  className="w-25 h-40 pl-0"
                  placeholder={"Cliente"}
                  onChange={(e) => handleInput("cliente_id", e.value)}
                  options={[[]]}
                />
              </>
            )}
          </div>
        </div>
      </Card>

      <Card className="mb-32 p-24">
        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Data Accensione</label>
            <input
              type="date"
              className="w-100"
              value={vals.data_accensione || ""}
              onChange={(e) => {
                handleInput("data_accensione", e.target.value);
              }}
              id="data_accensione"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Matricola</label>
            <input
              className="w-100"
              value={vals.matricola}
              onChange={(e) => {
                handleInput("matricola", e.target.value);
              }}
              id="matricola"
            />
          </div>
        </div>

        <div className="row mt-8">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Scadenza</label>
            <input
              type="date"
              className="w-100"
              value={vals.scadenza || ""}
              onChange={(e) => {
                handleInput("scadenza", e.target.value);
              }}
              id="scadenza"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Nota Bene</label>
            <textarea
              className="w-100 note"
              value={vals.nota}
              onChange={(e) => {
                handleInput("nota", e.target.value);
              }}
              id="nota"
            />
          </div>
        </div>
      </Card>

      <LoadingIndicator />
    </div>
  );

  function manageSelect(id) {
    var newSelectedIds;
    if (selectedIds.indexOf(id) > -1) {
      newSelectedIds = selectedIds.filter((single) => {
        return single !== id;
      });
      setSelectedIds(newSelectedIds);
    } else {
      newSelectedIds = selectedIds.concat(id);
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
    console.log(vals);
  }

  function _get(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
