import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ModifyHeader from "@/src/components/molecules/ModifyHeader";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Card from "@/src/components/atoms/Card";
import TableCouponIds from "@/src/components/organisms/TableIds/TableIds";
import Swal from "sweetalert2";
import apiCliente from "@/src/utils/api/cliente";
import { createRequestVals } from "@/src/utils/utility";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormAnagraficaCliente from "@/src/components/molecules/Cliente/FormAnagraficaCliente";
import FormManutenzione from "@/src/components/molecules/Manutenzione/FormManutenzione";

export default function DettaglioCliente({ router = {} }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiCliente.dettaglio_cliente(slug).then((value) => {
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

      <TitoloPagina
        titolo={
          slug !== "nuovo"
            ? (vals.nome || "") + " " + (vals.cognome || "")
            : "Nuovo Cliente"
        }
        urlIndietro="/clienti"
        ctaElimina={slug !== "nuovo" && elimina}
      />
      <FormAnagraficaCliente
        className="mb-32"
        onChange={(chiave, valore) => handleInput(chiave, valore)}
        vals={vals}
      />

      {slug !== "nuovo" && (
        <Card className="mb-32 p-24">
          <h2 className="bold lh-24">Interventi</h2>
          <div className="row mt-24">
            <TableCouponIds clienteID={vals.id} interventi={vals.interventi} />
          </div>
        </Card>
      )}

      {slug !== "nuovo" && vals.manutenzione && (
        <FormManutenzione disabled={true} vals={vals.manutenzione} />
      )}

      {slug !== "nuovo" && vals.garanzia && (
        <Card className="p-24">
          <h2 className="bold lh-24">Garanzia</h2>
          <div className="row mt-24">
            <div className="col-6 pl-0 pr-16">
              <label className="font-18 lh-24 bold">Data Accensione</label>
              <input
                disabled
                className="w-100"
                value={vals.garanzia && vals.garanzia.data_accensione}
                id="street"
              />
            </div>
            <div className="col-6 pl-16 pr-0">
              <label className="font-18 lh-24 bold">Matricola</label>
              <input
                disabled
                className="w-100"
                value={vals.garanzia && vals.garanzia.matricola}
                id="matricola"
              />
            </div>
          </div>

          <div className="row mt-8">
            <div className="col-6 pl-0 pr-16">
              <label className="font-18 lh-24 bold">Scadenza Garanzia</label>
              <input
                disabled
                className="w-100"
                value={vals.garanzia && vals.garanzia.matricola}
                id="piano_manutenzione"
              />
            </div>
            <div className="col-6 pl-16 pr-0">
              <label className="font-18 lh-24 bold">Nota Bene</label>
              <textarea
                disabled
                className="w-100 note"
                value={vals.garanzia && vals.garanzia.note}
                id="scadenza"
              />
            </div>
          </div>
        </Card>
      )}

      <LoadingIndicator />
    </div>
  );

  function elimina() {
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
          apiCliente.elimina_cliente(vals.telefono).then((value) => {
            if (value) {
              Swal.fire(
                "Successo",
                "L'eliminazione ha avuto successo",
                "success"
              ).then((value) => {
                router.push("/clienti");
              });
            }
          })
        );
      }
    });
  }

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
      apiCliente
        .aggiorna_cliente(slug, createRequestVals(vals, keys))
        .then((value) => {
          if (value) {
            _get(value);
          }
        });
    } else {
      if (vals.telefono) {
        apiCliente.crea_cliente(vals).then((value) => {
          if (value) {
            router.push("/clienti/" + value.telefono);
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
