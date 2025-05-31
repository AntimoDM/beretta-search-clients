import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { createRequestVals, formatDate } from "@/src/utils/utility";
import Swal from "sweetalert2";
import apiIntervento from "@/src/utils/api/intervento";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormAssociaCliente from "@/src/components/molecules/Cliente/FormAssociaCliente";
import FormIntervento from "@/src/components/molecules/Interventi/FormIntervento";
import Pagina from "@/src/components/atoms/Pagina/Pagina";
import HeaderModifiche from "@/src/components/molecules/HeaderModifiche/HeaderModifiche";

export default function DettaglioIntervento({ router = {} }) {
  const STATO_INIZIALE_VALS = {
    data_chiamata: new Date().toISOString().split("T")[0],
    stato: 1,
  };
  const { slug } = router.query || {};
  const [vals, setVals] = useState(STATO_INIZIALE_VALS);
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [modifying, setModifying] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiIntervento.dettaglio_intervento(slug).then((value) => {
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
            ? "Intervento del " + formatDate(vals.data_chiamata)
            : "Nuovo Intervento"
        }
        urlIndietro="/interventi"
        ctaElimina={slug !== "nuovo" && elimina}
        ctaCompleta={vals.stato === 2 && completa}
      />
      <FormAssociaCliente
        className="mb-32"
        vals={vals}
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
      />
      <FormIntervento
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
        vals={vals}
      />
    </Pagina>
  );

  function annullaModifiche() {
    if (slug !== "nuovo") {
      setVals(dbVals);
    } else setVals(STATO_INIZIALE_VALS);
    setModifying(false);
  }

  function gestisciInput(key, value) {
    if (!modifying) setModifying(true);
    setVals({ ...vals, [key]: value });
    if (!keys.includes(key)) setKeys([...keys, key]);
  }

  function salvaModifiche() {
    if (slug !== "nuovo") {
      apiIntervento
        .aggiorna_intervento(slug, createRequestVals(vals, keys))
        .then((value) => {
          if (value) {
            aggiornaValori(value);
          }
        });
    } else {
      apiIntervento.crea_intervento(vals).then((value) => {
        if (value) {
          router.push("/interventi/" + value.id);
        }
      });
    }
  }

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
          apiIntervento.elimina_intervento(vals.id).then((value) => {
            if (value) {
              Swal.fire(
                "Successo",
                "L'eliminazione ha avuto successo",
                "success"
              ).then((value) => {
                router.push("/interventi");
              });
            }
          })
        );
      }
    });
  }

  function completa() {
    Swal.fire({
      customClass: "swal_support",
      title: "Attenzione",
      text: "L'intervento è stato completato. Procedere?",
      confirmButtonAriaLabel: "Conferma",
      confirmButtonText: "Conferma",
      confirmButtonColor: "#E22623",
      cancelButtonText: "Annulla",
      reverseButtons: true,
    }).then((value) => {
      if (value.isConfirmed) {
        trackPromise(
          apiIntervento
            .aggiorna_intervento(vals.id, { stato: 3 })
            .then((value) => {
              if (value) {
                Swal.fire("Successo", "", "success").then((value) => {
                  if (value) {
                    aggiornaValori(value);
                  }
                });
              }
            })
        );
      }
    });
  }

  function aggiornaValori(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }
}
