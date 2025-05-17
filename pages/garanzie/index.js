import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from "@/src/components/atoms/Load/LoadPromise";
import apiGaranzia from "@/src/utils/api/garanzia";
import TitoloPagina from "@/src/components/molecules/TitoloPagina/TitoloPagina";
import ListaGaranzie from "@/src/components/molecules/Garanzia/ListaGaranzie";

export default function Garanzie({}) {
  const [garanzie, setGaranzie] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    trackPromise(
      apiGaranzia.ricerca_garanzie(filters).then((value) => {
        if (value) {
          setGaranzie(value);
        }
      })
    );
  }, [filters]);

  return (
    <div className="page-container-new">
      <TitoloPagina titolo="Garanzie" urlAggiungi="/garanzie/nuovo" />
      <ListaGaranzie
        garanzie={garanzie}
        onFilter={(chiave, valore) =>
          setFilters({ ...filters, [chiave]: valore })
        }
      />
      <LoadingIndicator />
    </div>
  );
}
