import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import apiManutenzione from "@/src/utils/api/manutenzione";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaManutenzioni from "@/src/components/molecules/Manutenzione/ListaManutenzioni";
import Pagina from "@/src/components/atoms/Pagina/Pagina";

export default function Manutenzioni({}) {
  const [manutenzioni, setManutenzioni] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    trackPromise(
      apiManutenzione.ricerca_manutenzioni(filters).then((value) => {
        if (value) {
          setManutenzioni(value);
        }
      })
    );
  }, [filters]);

  return (
    <Pagina>
      <TitoloPagina titolo="Manutenzioni" urlAggiungi="/manutenzioni/nuovo" />
      <ListaManutenzioni
        onFilter={(chiave, valore) =>
          setFilters({ ...filters, [chiave]: valore })
        }
        manutenzioni={manutenzioni}
      />
    </Pagina>
  );
}
