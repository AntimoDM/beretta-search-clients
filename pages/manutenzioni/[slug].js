import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ModifyHeader from "@/src/components/molecules/ModifyHeader";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Swal from "sweetalert2";
import apiManutenzione from "@/src/utils/api/manutenzione";
import { createRequestVals, formatDate } from "@/src/utils/utility";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormManutenzione from "@/src/components/molecules/Manutenzione/FormManutenzione";
import FormAssociaCliente from "@/src/components/molecules/Cliente/FormAssociaCliente";

export default function DettaglioManutenzione({ router = {} }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiManutenzione.dettaglio_manutenzione(slug).then((value) => {
        if (value) {
          setVals(value);
          setDbVals(value);
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
            ? "Manutenzione del" + formatDate(vals.data_rapporto)
            : "Nuova Manutenzione"
        }
        urlIndietro="/manutenzioni"
        ctaElimina={slug !== "nuovo" && elimina}
      />
      <FormAssociaCliente
        className="mb-32"
        vals={vals.cliente || {}}
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
      />
      <FormManutenzione
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
        vals={vals}
      />
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
          apiManutenzione.elimina_manutenzione(vals.id).then((value) => {
            if (value) {
              Swal.fire(
                "Successo",
                "L'eliminazione ha avuto successo",
                "success"
              ).then((value) => {
                router.push("/manutenzioni");
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

  function gestisciInput(key, value) {
    if (!modifying) setModifying(true);
    setVals({ ...vals, [key]: value });
    if (!keys.includes(key)) setKeys([...keys, key]);
  }

  function handleSubmit() {
    if (slug !== "nuovo") {
      apiManutenzione
        .aggiorna_manutenzione(slug, createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            _get(value);
          }
        });
    } else {
      apiManutenzione
        .crea_manutenzione(createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            router.push("/manutenzioni/" + value.id);
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
