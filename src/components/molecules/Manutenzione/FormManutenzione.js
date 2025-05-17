import Card from "../../atoms/Card";

const FormManutenzione = ({ className, onChange, vals, disabled = false }) => {
  return (
    <Card className={`p-24 ${className}`}>
      <h3>Dati Manutenzione</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Data Rapporto</label>
          <input
            type="date"
            onChange={(e) => {
              onChange("data_rapporto", e.target.value);
            }}
            disabled={disabled}
            value={vals.data_rapporto || ""}
            id="manutenzione_data_rapporto"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Matricola</label>
          <input
            onChange={(e) => {
              onChange("matricola", e.target.value);
            }}
            disabled={disabled}
            value={vals.matricola || ""}
            id="manutenzione_matricola"
          />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Scadenza</label>
          <input
            type="date"
            className="w-100"
            value={vals.data_scadenza || ""}
            onChange={(e) => {
              onChange("data_scadenza", e.target.value);
            }}
            id="data_scadenza"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Tipologia</label>
          <input
            className="w-100"
            value={vals.tipologia || ""}
            onChange={(e) => {
              onChange("tipologia", e.target.value);
            }}
            id="tipologia"
          />
        </div>
      </div>

      <div className="row mt-8"></div>
    </Card>
  );
};

export default FormManutenzione;
