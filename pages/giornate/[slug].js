import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { createRequestVals, formatDate } from "@/src/utils/utility";
import apiGiornata from "@/src/utils/api/giornata";
import apiIntervento from "@/src/utils/api/intervento";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaInterventi from "@/src/components/molecules/Interventi/ListaInterventi";
import FormAssociaGiornata from "@/src/components/molecules/Giornate/FormAssociaGiornata";
import Pagina from "@/src/components/atoms/Pagina/Pagina";
import HeaderModifiche from "@/src/components/molecules/HeaderModifiche/HeaderModifiche";

export default function DettaglioGiornata({ router = {} }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [interventiAssociabili, setInterventiAssociabili] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [idInterventiDaAssociare, setIdInterventiDaAssociare] = useState([]);
  const [idInterventiDaDisassociare, setIdInterventiDaDisassociare] = useState(
    []
  );

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiGiornata.dettaglio_giornata(slug).then((value) => {
        if (value) {
          aggiornaValori(value);
        }
      })
    );
  }, [slug]);

  useEffect(() => {
    if (!vals.tecnico) return;
    trackPromise(
      apiIntervento
        .ricerca_interventi_da_associare(
          vals.tecnico && (vals.tecnico.id || vals.tecnico),
          vals.id
        )
        .then((value) => {
          if (value) {
            setInterventiAssociabili(value);
          }
        })
    );
  }, [vals.tecnico]);

  return (
    <Pagina>
      <HeaderModifiche
        ctaAnnulla={annullaModifiche}
        ctaSalva={salvaModifiche}
        mostra={modifying}
      />
      <TitoloPagina
        titolo={
          slug === "nuovo"
            ? "Nuova Giornata"
            : vals.tecnico && vals.tecnico.nome + " - " + formatDate(vals.data)
        }
        urlIndietro="/giornate"
        ctaAggiungiInterventi={
          idInterventiDaAssociare.length > 0 && aggiungiInterventi
        }
        ctaRimuoviInterventi={
          idInterventiDaDisassociare.length > 0 && rimuoviInterventi
        }
      />
      <FormAssociaGiornata
        className="mb-32"
        onChange={(chiave, valore) => gestisciInput(chiave, valore)}
        vals={vals}
      />
      {slug !== "nuovo" && (
        <ListaInterventi
          className="mb-32"
          internoPagina={true}
          interventi={vals.interventi}
          mostraFiltri={false}
          titolo="Interventi Associati"
          onSelectCheckbox={(id) =>
            setIdInterventiDaDisassociare([...idInterventiDaDisassociare, id])
          }
        />
      )}
      {slug !== "nuovo" && (
        <ListaInterventi
          internoPagina={true}
          interventi={interventiAssociabili}
          mostraFiltri={false}
          titolo="Interventi Associabili"
          onSelectCheckbox={(id) =>
            setIdInterventiDaAssociare([...idInterventiDaAssociare, id])
          }
        />
      )}
    </Pagina>
  );

  function aggiungiInterventi() {
    if (idInterventiDaAssociare.length > 0) {
      trackPromise(
        apiGiornata
          .aggiungi_intervento_a_giornata(vals.id, idInterventiDaAssociare)
          .then((value) => {
            if (value) {
              setIdInterventiDaAssociare([]);
              aggiornaValori(value);
            }
          })
      );
    }
  }

  function rimuoviInterventi() {
    if (idInterventiDaDisassociare.length > 0) {
      trackPromise(
        apiGiornata
          .rimuovi_intervento_da_giornata(vals.id, idInterventiDaDisassociare)
          .then((value) => {
            if (value) {
              setIdInterventiDaDisassociare([]);
              aggiornaValori(value);
            }
          })
      );
    }
  }

  function annullaModifiche() {
    if (slug !== "new") {
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
      apiGiornata
        .aggiorna_giornata(slug, createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            aggiornaValori(value);
          }
        });
    } else {
      apiGiornata
        .crea_giornata(createRequestVals(vals, keys, []))
        .then((value) => {
          if (value) {
            router.push("/giornate/" + value.id);
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
