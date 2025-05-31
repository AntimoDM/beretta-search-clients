import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { createRequestVals, formatDate } from "@/src/utils/utility";
import Swal from "sweetalert2";
import apiGaranzia from "@/src/utils/api/garanzia";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormAssociaCliente from "@/src/components/molecules/Cliente/FormAssociaCliente";
import FormGaranzia from "@/src/components/molecules/Garanzia/FormGaranzia";
import Pagina from "@/src/components/atoms/Pagina/Pagina";
import HeaderModifiche from "@/src/components/molecules/HeaderModifiche/HeaderModifiche";

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
          aggiornaValori(value);
        }
      })
    );
  }, [slug]);

  return (
    <Pagina>
      <HeaderModifiche
        ctaAnnulla={annullaModifiche}
        ctaSalva={salvaModifiche}
        mostra={modifying}
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
        vals={vals}
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
      />
      <FormGaranzia
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
        vals={vals}
      />
    </Pagina>
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

  function annullaModifiche() {
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

  function salvaModifiche() {
    if (slug !== "nuovo") {
      apiGaranzia
        .aggiorna_garanzia(slug, createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            aggiornaValori(value);
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

  function aggiornaValori(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
