import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import ListaGiornate from "@/src/components/molecules/Giornate/ListaGiornate";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import apiGiornata from "@/src/utils/api/giornata";
import Pagina from "@/src/components/atoms/Pagina/Pagina";

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
    <Pagina>
      <TitoloPagina titolo="Giornate" urlAggiungi="/giornate/nuovo" />
      <ListaGiornate
        giornate={giornate}
        onFilter={(chiave, valore) => {
          setFilters({ ...filters, [chiave]: valore });
        }}
      />
    </Pagina>
  );
}
