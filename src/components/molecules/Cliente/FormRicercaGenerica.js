import Card from "../../atoms/Card";
import FormRicercaPuntuale from "./FormRicercaPuntuale";

const FormRicercaGenerica = ({ className, onChange, ctaRicerca, vals }) => {
  return (
    <Card className={`p-24 ${className}`}>
      <h3>Ricerca Generica</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Via</label>
          <input
            value={vals.strada || ""}
            onChange={(e) => {
              onChange("strada", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_strada"
          />
        </div>

        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Comune</label>
          <input
            value={vals.comune || ""}
            onChange={(e) => {
              onChange("comune", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_comune"
          />
        </div>
      </div>
    </Card>
  );
};

export default FormRicercaGenerica;
