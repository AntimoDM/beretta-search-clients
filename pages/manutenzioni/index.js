import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import apiManutenzione from "@/src/utils/api/manutenzione";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaManutenzioni from "@/src/components/molecules/Manutenzione/ListaManutenzioni";

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
    <div className="page-container-new">
      <TitoloPagina titolo="Manutenzioni" urlAggiungi="/manutenzioni/nuovo" />
      <ListaManutenzioni
        onFilter={(chiave, valore) =>
          setFilters({ ...filters, [chiave]: valore })
        }
        manutenzioni={manutenzioni}
      />
      <LoadingIndicator />
    </div>
  );
}
