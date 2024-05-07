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
import { createRequestVals } from "@/src/helper/utility";

export default function DettaglioCliente({ router = {}, user, permission }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [mostraImportazione, setMostraImportazione] = useState(true);

  useEffect(() => {
    if (!slug) return;
    trackPromise(
      api.get_cliente(slug).then((value) => {
        if (value) {
          _get(value);
        }
      })
    );
  }, [slug]);

  return (
    <div className="page-container-new">
      <ModifyHeader
        onRemove={onRemove}
        onSave={handleSubmit}
        toggle={modifying}
      />

      <PageTitle
        className="pt-10"
        page
        right={
          <>
            <input
              onChange={() => {
                setMostraImportazione(!mostraImportazione);
              }}
              checked={mostraImportazione}
              type="checkbox"
            />
            Mostra importati
          </>
        }
      >
        <div className="m-0 p-0 ">
          <Link className="mt-0 mr-16" href="/ricerca">
            <div className="btn btn-outline-secondary button_header_inner">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </div>
          </Link>

          <h4 className="d-inline font-24 lh-24 bolder">
            {vals.nome_cognome_import}
          </h4>
        </div>
      </PageTitle>

      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Anagrafica</h2>

        {mostraImportazione ? (
          <>
            {" "}
            <div className="row mt-24">
              <div className="col-6 pl-0 pr-16">
                <label className="font-18 lh-24 bold">Nome e Cognome</label>
                <input
                  className="w-100"
                  value={vals.nome_cognome_import}
                  id="nome_cognome_import"
                />
              </div>
              <div className="col-6 pl-16 pr-0">
                <label className="font-18 lh-24 bold">Telefono</label>
                <input
                  className="w-100"
                  value={vals.telefono_principale}
                  id="telefono_principale"
                />
              </div>
            </div>
            <div className="row mt-24">
              <textarea
                className="note"
                value={vals.anagrafica_import}
              ></textarea>
            </div>{" "}
          </>
        ) : (
          <></>
        )}

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Nome</label>
            <input
              className="w-100"
              value={vals.nome}
              onChange={(e) => {
                handleInput("nome", e.target.value);
              }}
              id="nome"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Cognome</label>
            <input
              className="w-100"
              value={vals.cognome}
              onChange={(e) => {
                handleInput("cognome", e.target.value);
              }}
              id="cognome"
            />
          </div>
        </div>

        <div className="row mt-8">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Telefono</label>
            <input
              className="w-100"
              value={vals.telefono_principale}
              onChange={(e) => {
                handleInput("telefono_principale", e.target.value);
              }}
              id="telefono_principale"
            />
          </div>
        </div>
        <h2 className="bold lh-24 mt-24">Indirizzo</h2>

        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Via</label>
            <input
              className="w-100"
              value={vals.strada}
              onChange={(e) => {
                handleInput("strada", e.target.value);
              }}
              id="strada"
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

      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Interventi</h2>
        <div className="row mt-24">
          <TableCouponIds interventi={vals.interventi} />
        </div>
      </Card>

      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Manutenzione</h2>
        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Data Rapporto</label>
            <input
              className="w-100"
              value={vals.data_rapporto}
              onChange={(e) => {
                handleInput("street", e.target.value);
              }}
              id="street"
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
            <label className="font-18 lh-24 bold">
              Tipo piano manutenzione
            </label>
            <input
              className="w-100"
              value={vals.piano_manutenzione}
              onChange={(e) => {
                handleInput("piano_manutenzione", e.target.value);
              }}
              id="piano_manutenzione"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Scadenza</label>
            <input
              className="w-100"
              value={vals.scadenza}
              onChange={(e) => {
                handleInput("scadenza", e.target.value);
              }}
              id="scadenza"
            />
          </div>
        </div>

        <div className="row mt-8"></div>
      </Card>

      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Garanzia</h2>
        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16">
            <label className="font-18 lh-24 bold">Data Accensione</label>
            <input
              className="w-100"
              value={vals.data_rapporto}
              onChange={(e) => {
                handleInput("street", e.target.value);
              }}
              id="street"
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
            <label className="font-18 lh-24 bold">Scadenza Garanzia</label>
            <input
              className="w-100"
              value={vals.piano_manutenzione}
              onChange={(e) => {
                handleInput("piano_manutenzione", e.target.value);
              }}
              id="piano_manutenzione"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Nota Bene</label>
            <textarea
              className="w-100 note"
              value={vals.scadenza}
              onChange={(e) => {
                handleInput("scadenza", e.target.value);
              }}
              id="scadenza"
            />
          </div>
        </div>
      </Card>

      <LoadingIndicator />
    </div>
  );

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
    api.update_cliente(slug, createRequestVals(vals, keys)).then((value) => {
      if (value) {
        _get(value);
      }
    });
  }

  function _get(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
