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
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";
import Swal from "sweetalert2";

export default function EditCollection({ router = {}, user, permission }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [errori, setErrori] = useState({});
  const [modifying, setModifying] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [opzioniClienti, setOpzioniClienti] = useState([]);
  const m2oAttrs = ["cliente"];

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
        className="pt-10 mt-48"
        page
        right={
          <>
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
                        api.elimina_cliente(vals.id).then((value) => {
                          if (value) {
                            Swal.fire(
                              "Successo",
                              "L'eliminazione ha avuto successo",
                              "success"
                            ).then((value) => {
                              router.push("/garanzie");
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
            {vals.cliente &&
              (vals.cliente.cognome || "") + " " + vals.cliente.nome}{" "}
            - {formatDate(vals.data_accensione)}
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
                  style={{ display: "block" }}
                  target="_blank"
                  href={
                    "/ricerca/" +
                    (vals.cliente ? vals.cliente.telefono_principale : "")
                  }
                >
                  {vals.cliente &&
                    (vals.cliente.cognome || "") + " " + vals.cliente.nome}
                </a>
              </>
            ) : (
              <>
                <SearchBar
                  value={opzioniClienti.find(
                    (el) => el.value === (vals.cliente && vals.cliente.id)
                  )}
                  className="h-40 pl-0"
                  placeholder={"Cliente"}
                  onChange={(e) =>
                    handleInput("cliente", { id: e.value, nome: e.label })
                  }
                  options={opzioniClienti}
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
              value={vals.data_scadenza || ""}
              onChange={(e) => {
                handleInput("data_scadenza", e.target.value);
              }}
              id="data_scadenza"
            />
          </div>
          <div className="col-6 pl-16 pr-0">
            <label className="font-18 lh-24 bold">Nota Bene</label>
            <textarea
              className="w-100 note"
              value={vals.note}
              onChange={(e) => {
                handleInput("note", e.target.value);
              }}
              id="note"
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
    if (slug !== "nuovo") {
      api
        .aggiorna_garanzia(slug, createRequestVals(vals, keys, [], m2oAttrs))
        .then((value) => {
          if (value) {
            _get(value);
          }
        });
    } else {
      api
        .crea_garanzia(createRequestVals(vals, keys, [], m2oAttrs))
        .then((value) => {
          if (value) {
            router.push("/garanzie/" + value.id);
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
