import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "@/src/components/atoms/Loader/Loader";
import Swal from "sweetalert2";
import apiCliente from "@/src/utils/api/cliente";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import FormRicercaPuntuale from "@/src/components/molecules/Cliente/FormRicercaPuntuale";
import FormRicercaGenerica from "@/src/components/molecules/Cliente/FormRicercaGenerica";
import ListaClienti from "@/src/components/molecules/Cliente/ListaClienti";
import Pagina from "@/src/components/atoms/Pagina/Pagina";

export default function Clienti({ router = {} }) {
  const [vals, setVals] = useState({});
  const [clienti, setClienti] = useState([]);
  return (
    <Pagina>
      <TitoloPagina titolo="Clienti" urlAggiungi="/clienti/nuovo" />
      <FormRicercaPuntuale
        className="mb-32"
        onChange={(chiave, valore) => getisciInput(chiave, valore)}
        ctaRicerca={ricercaPuntuale}
        vals={vals}
      />
      <FormRicercaGenerica
        className="mb-32"
        onChange={(chiave, valore) => getisciInput(chiave, valore)}
        ctaRicerca={ricercaGenerica}
        vals={vals}
      />
      {clienti && clienti.length > 0 && <ListaClienti clienti={clienti} />}
    </Pagina>
  );
  function ricercaGenerica() {
    trackPromise(
      apiCliente.ricerca_clienti(vals).then((value) => {
        if (value) {
          setClienti(value);
          if (value.length === 0) {
            Swal.fire(
              "",
              "Non sono stati trovati clienti, prova a modificare i parametri di ricerca",
              "warning"
            );
          }
        }
      })
    );
  }
  function ricercaPuntuale() {
    trackPromise(
      apiCliente.dettaglio_cliente(vals.telefono).then((value) => {
        if (value) {
          router.push("/clienti/" + vals.telefono);
        }
      })
    );
  }
  function getisciInput(chiave, valore) {
    setVals({ ...vals, [chiave]: valore });
  }
}
