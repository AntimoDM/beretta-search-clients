import Card from "../../atoms/Card";

const FormGaranzia = ({ className, onChange, vals, disabled = false }) => {
  return (
    <Card className={`p-24 ${className}`}>
      <h3>Dati Garanzia</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Data Accensione</label>
          <input
            disabled={disabled}
            type="date"
            value={vals.data_accensione || ""}
            onChange={(e) => {
              onChange("data_accensione", e.target.value);
            }}
            id="data_accensione"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Matricola</label>
          <input
            disabled={disabled}
            value={vals.matricola}
            onChange={(e) => {
              onChange("matricola", e.target.value);
            }}
            id="matricola"
          />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Scadenza</label>
          <input
            disabled={disabled}
            type="date"
            value={vals.data_scadenza || ""}
            onChange={(e) => {
              onChange("data_scadenza", e.target.value);
            }}
            id="data_scadenza"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Note</label>
          <textarea
            disabled={disabled}
            value={vals.note}
            onChange={(e) => {
              onChange("note", e.target.value);
            }}
            id="note"
          />
        </div>
      </div>

      <div className="row mt-8"></div>
    </Card>
  );
};

export default FormGaranzia;
