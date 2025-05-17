import React, { use, useEffect, useState } from "react";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaInterventi from "@/src/components/molecules/Interventi/ListaInterventi";
import apiIntervento from "@/src/utils/api/intervento";
import { trackPromise } from "react-promise-tracker";

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
    <div className="page-container-new">
      <TitoloPagina titolo="Interventi" urlAggiungi="/interventi/nuovo" />
      <ListaInterventi
        interventi={interventi}
        onFilter={(chiave, valore) =>
          setFilters({ ...filters, [chiave]: valore })
        }
      />
      <LoadingIndicator />
    </div>
  );
}
