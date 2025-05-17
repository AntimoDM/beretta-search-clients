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
import FormGaranzia from "@/src/components/molecules/Garanzia/FormGaranzia";

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
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
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
      {vals.manutenzione && (
        <FormManutenzione disabled={true} vals={vals.manutenzione} />
      )}
      {vals.garanzia && <FormGaranzia disabled={true} vals={vals.garanzia} />}
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

  function gestisciInput(key, value) {
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
