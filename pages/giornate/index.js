import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import ListaGiornate from "@/src/components/molecules/Giornate/ListaGiornate";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import apiGiornata from "@/src/utils/api/giornata";

export default function Giornate({}) {
  const [giornate, setGiornate] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    trackPromise(
      apiGiornata.ricerca_giornate(filters).then((value) => {
        if (value) {
          setGiornate(value);
        }
      })
    );
  }, [filters]);

  return (
    <div className="page-container-new">
      <TitoloPagina titolo="Giornate" urlAggiungi="/giornate/nuovo" />
      <ListaGiornate
        giornate={giornate}
        onFilter={(chiave, valore) => {
          setFilters({ ...filters, [chiave]: valore });
        }}
      />
      <LoadingIndicator />
    </div>
  );
}
