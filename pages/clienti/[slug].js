import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import Swal from "sweetalert2";
import apiCliente from "@/src/utils/api/cliente";
import { createRequestVals } from "@/src/utils/utility";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormAnagraficaCliente from "@/src/components/molecules/Cliente/FormAnagraficaCliente";
import FormManutenzione from "@/src/components/molecules/Manutenzione/FormManutenzione";
import FormGaranzia from "@/src/components/molecules/Garanzia/FormGaranzia";
import Pagina from "@/src/components/atoms/Pagina/Pagina";
import FormIntervento from "@/src/components/molecules/Interventi/FormIntervento";
import ListaInterventi from "@/src/components/molecules/Interventi/ListaInterventi";
import Modal from "@/src/components/atoms/Modal/Modal";
import apiIntervento from "@/src/utils/api/intervento";
import HeaderModifiche from "@/src/components/molecules/HeaderModifiche/HeaderModifiche";

export default function DettaglioCliente({ router = {} }) {
  const { slug } = router.query || {};
  const [vals, setVals] = useState({});
  const [dbVals, setDbVals] = useState({});
  const [keys, setKeys] = useState([]);
  const [keysIntervento, setKeysIntervento] = useState([]);
  const [modifying, setModifying] = useState(false);
  const [interventoSelezionato, setInterventoSelezionato] = useState({});
  const [interventoSelezionatoDB, setInterventoSelezionatoDB] = useState({});
  const [apriModaleIntervento, setApriModaleIntervento] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (slug === "nuovo") return;
    trackPromise(
      apiCliente.dettaglio_cliente(slug).then((value) => {
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
        <ListaInterventi
          ctaSeleziona={selezionaIntervento}
          rendirizzamento={false}
          ctaAggiungi={aggiungiIntervento}
          titolo="Interventi"
          mostraFiltri={false}
          className="mb-32"
          interventi={vals.interventi}
        />
      )}
      {vals.manutenzione && (
        <FormManutenzione
          className="mb-32"
          disabled={true}
          vals={vals.manutenzione}
        />
      )}
      {vals.garanzia && <FormGaranzia disabled={true} vals={vals.garanzia} />}
      <Modal id={"modale_gestisci_intervento_" + interventoSelezionato.id}>
        {apriModaleIntervento && (
          <FormIntervento
            onChange={(chiave, valore) =>
              gestisciInputIntervento(chiave, valore)
            }
            ctaSalva={aggiornaIntervento}
            ctaAnnulla={annullaAggiornamentoIntervento}
            ctaElimina={eliminaIntervento}
            ctaChiudi={chiudiModale}
            modale={true}
            vals={interventoSelezionato}
          />
        )}
      </Modal>
    </Pagina>
  );

  function elimina() {
    Swal.fire({
      showCancelButton: true,
      title: "Attenzione",
      text: "L'eliminazione è irreversibile. Procedere?",
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

  function annullaModifiche() {
    if (slug !== "nuovo") {
      setVals(dbVals);
    } else setVals({});
    setKeys([]);
    setModifying(false);
  }

  function gestisciInput(key, value) {
    if (!modifying) setModifying(true);
    setVals({ ...vals, [key]: value });
    if (!keys.includes(key)) setKeys([...keys, key]);
  }

  function gestisciInputIntervento(key, value) {
    setInterventoSelezionato({ ...interventoSelezionato, [key]: value });
    if (!keysIntervento.includes(key))
      setKeysIntervento([...keysIntervento, key]);
  }

  function salvaModifiche() {
    if (slug !== "nuovo") {
      apiCliente
        .aggiorna_cliente(slug, createRequestVals(vals, keys))
        .then((value) => {
          if (value) {
            aggiornaValori(value);
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

  function aggiornaValori(value) {
    setVals(value);
    setDbVals(value);
    setModifying(false);
  }

  function aggiungiIntervento() {
    setApriModaleIntervento(true);
    setInterventoSelezionato({
      id: 0,
      indirizzo: vals.strada,
      cliente: vals.id,
      data_chiamata: new Date().toISOString().split("T")[0],
    });
    setInterventoSelezionatoDB({
      id: 0,
      indirizzo: vals.strada,
      cliente: vals.id,
      data_chiamata: new Date().toISOString().split("T")[0],
    });
    toggleModale();
  }

  function chiudiModale() {
    setApriModaleIntervento(false);
    toggleModale();
    setInterventoSelezionato({});
    setInterventoSelezionatoDB({});
  }

  function selezionaIntervento(intervento) {
    setApriModaleIntervento(true);
    setInterventoSelezionato(intervento);
    setInterventoSelezionatoDB(intervento);
    toggleModale();
  }

  function toggleModale() {
    $("#modale_gestisci_intervento_" + interventoSelezionato.id).modal(
      "toggle"
    );
  }

  function annullaAggiornamentoIntervento() {
    setInterventoSelezionato(interventoSelezionatoDB);
    setKeysIntervento([]);
  }

  function aggiornaIntervento() {
    if (interventoSelezionato.id === 0) {
      trackPromise(
        apiIntervento.crea_intervento(interventoSelezionato).then((value) => {
          if (value) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        })
      );
    } else {
      trackPromise(
        apiIntervento
          .aggiorna_intervento(
            interventoSelezionato.id,
            createRequestVals(interventoSelezionato, keysIntervento)
          )
          .then((value) => {
            if (value) {
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          })
      );
    }
  }

  function eliminaIntervento() {
    Swal.fire({
      title: "Attenzione",
      text: "L'eliminazione è irreversibile. Procedere?",
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
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              });
            }
          })
        );
      }
    });
  }
}
