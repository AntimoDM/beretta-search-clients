import React, { useEffect, useState } from "react";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaInterventi from "@/src/components/molecules/Interventi/ListaInterventi";
import apiIntervento from "@/src/utils/api/intervento";
import { trackPromise } from "react-promise-tracker";
import Pagina from "@/src/components/atoms/Pagina/Pagina";

export default function Interventi({}) {
  const [interventi, setInterventi] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    trackPromise(
      apiIntervento.ricerca_interventi(filters).then((value) => {
        if (value) {
          setInterventi(value);
        }
      })
    );
  }, [filters]);

  return (
    <Pagina>
      <TitoloPagina titolo="Interventi" urlAggiungi="/interventi/nuovo" />
      <ListaInterventi
        interventi={interventi}
        onFilter={(chiave, valore) =>
          setFilters({ ...filters, [chiave]: valore })
        }
      />
    </Pagina>
  );
}
