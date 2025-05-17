import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import PageTitle from "@/src/components/molecules/PageTitle";
import ModifyHeader from "@/src/components/molecules/ModifyHeader";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import Card from "@/src/components/atoms/Card";
import { default as Link } from "next/link";
import TableCouponIds from "@/src/components/organisms/TableIds/TableIds";
import {
  createRequestVals,
  formatDate,
  generaOpzioniClienti,
} from "@/src/utils/utility";
import HeaderTab from "@/src/components/atoms/HeaderTab/HeaderTab";
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";
import Swal from "sweetalert2";
import apiGaranzia from "@/src/utils/api/garanzia";
import apiCliente from "@/src/utils/api/cliente";
import Button from "@/src/components/atoms/Button/Button";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormAssociaCliente from "@/src/components/molecules/Cliente/FormAssociaCliente";
import FormGaranzia from "@/src/components/molecules/Garanzia/FormGaranzia";

export default function DettaglioGaranzia({ router = {} }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiGaranzia.dettaglio_garanzia(slug).then((value) => {
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
            ? "Garanzia del " + formatDate(vals.data_accensione)
            : "Nuova Garanzia"
        }
        urlIndietro="/garanzie"
        ctaElimina={slug !== "nuovo" && elimina}
      />
      <FormAssociaCliente
        className="mb-32"
        vals={vals.cliente || {}}
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
      />
      <FormGaranzia
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
          apiGaranzia.elimina_garanzia(vals.id).then((value) => {
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
      apiGaranzia
        .aggiorna_garanzia(slug, createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            _get(value);
          }
        });
    } else {
      apiGaranzia
        .crea_garanzia(createRequestVals(vals, keys, []))
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
