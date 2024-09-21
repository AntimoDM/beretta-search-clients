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
import Swal from "sweetalert2";

export default function DettaglioCliente({ router = {}, user, permission }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (slug !== "nuovo") {
      trackPromise(
        api.get_cliente(slug).then((value) => {
          if (value) {
            _get(value);
          }
        })
      );
    } else {
      setVals({});
    }
  }, [slug]);

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
            {slug !== "nuovo" && vals.creato_da_importazione && (
              <>
                <input
                  onChange={() => {
                    handleInput(
                      "mostra_dati_importati",
                      !vals.mostra_dati_importati
                    );
                  }}
                  checked={vals.mostra_dati_importati}
                  type="checkbox"
                />
                Mostra importati
              </>
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
                        api.elimina_cliente(vals.id).then((value) => {
                          if (value) {
                            Swal.fire(
                              "Successo",
                              "L'eliminazione ha avuto successo",
                              "success"
                            ).then((value) => {
                              router.push("/ricerca");
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
          <Link className="mt-0 mr-16" href="/ricerca">
            <div className="btn btn-outline-secondary button_header_inner">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </div>
          </Link>

          <h4 className="d-inline font-24 lh-24 bolder">
            {vals.nome_cognome_import ||
              (vals.nome || "") + " " + (vals.cognome || "")}
          </h4>
        </div>
      </PageTitle>

      <Card className="mb-32 p-24">
        <h2 className="bold lh-24">Anagrafica</h2>

        {vals.mostra_dati_importati ? (
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
              value={vals.nome || ""}
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

          <div className="col-6 pr-0 pl-16">
            <label className="font-18 lh-24 bold">Email</label>
            <input
              className="w-100"
              value={vals.email}
              onChange={(e) => {
                handleInput("email", e.target.value);
              }}
              id="email"
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

      {slug !== "nuovo" && (
        <Card className="mb-32 p-24">
          <h2 className="bold lh-24">Interventi</h2>
          <div className="row mt-24">
            <TableCouponIds clienteID={vals.id} interventi={vals.interventi} />
          </div>
        </Card>
      )}

      <Card style={{ pointerEvents: "none" }} className="mb-32 p-24">
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

      <Card style={{ pointerEvents: "none" }} className="mb-32 p-24">
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
    if (slug !== "nuovo") {
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
      api.update_cliente(slug, createRequestVals(vals, keys)).then((value) => {
        if (value) {
          _get(value);
        }
      });
    } else {
      if (vals.telefono_principale) {
        api
          .crea_cliente({
            ...vals,
            mostra_dati_importati: false,
            creato_da_importazione: false,
            creato_da_webapp: true,
          })
          .then((value) => {
            if (value) {
              router.push("/ricerca/" + value.telefono_principale);
            }
          });
      } else {
        Swal.fire(
          "Attenzione",
          "Per creare un nuovo cliente è necessario specificare un numero di telefono",
          "warning"
        );
      }
    }
  }

  function _get(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
