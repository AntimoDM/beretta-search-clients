import { generaOpzioniClienti } from "@/src/utils/utility";
import Card from "../../atoms/Card";
import apiCliente from "@/src/utils/api/cliente";
import { useEffect, useState } from "react";

const FormAssociaCliente = ({ className, onChange, vals }) => {
  const [opzioniClienti, setOpzioniClienti] = useState([]);

  useEffect(() => {
    apiCliente.ricerca_clienti_per_searchbar().then((value) => {
      if (value) {
        setOpzioniClienti(value);
      }
    });
  }, []);

  return (
    <Card className={`p-24 ${className}`}>
      <h3>Associa Cliente</h3>
      <div className="row mt-24">
        <div className="col-12 pl-0 pr-0">
          <label className="font-18 lh-24 bold">Cliente</label>
          <select
            value={vals.id}
            onChange={(e) => {
              onChange("cliente", e.target.value);
            }}
            className="h-40 pl-0"
          >
            {generaOpzioniClienti(opzioniClienti)}
          </select>
        </div>
      </div>
    </Card>
  );
};

export default FormAssociaCliente;
