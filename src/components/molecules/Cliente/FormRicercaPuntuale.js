import Card from "../../atoms/Card";

const FormRicercaPuntuale = ({ className, onChange, ctaRicerca, vals }) => {
  return (
    <Card className={`p-24 ${className}`}>
      <h3>Ricerca Puntuale</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Telefono</label>
          <input
            value={vals.telefono || ""}
            onChange={(e) => {
              onChange("telefono", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_telefono"
          />
        </div>
      </div>
    </Card>
  );
};

export default FormRicercaPuntuale;
