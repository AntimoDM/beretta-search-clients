import Carta from "../../atoms/Carta/Carta";
import SelectTecnici from "../../atoms/SelectTecnici/SelectTecnici";

const FormAssociaGiornata = ({ className, onChange, vals }) => {
  return (
    <Carta className={`p-24 ${className}`}>
      <h3>Associa Giornata</h3>
      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Tecnico</label>
          <SelectTecnici
            onFilter={onChange}
            value={vals.tecnico && (vals.tecnico.id || vals.tecnico)}
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Giorno</label>
          <input
            id="data_chiamata"
            type="date"
            placeholder="Data Chiamata"
            value={vals.data || ""}
            onChange={(e) => {
              onChange("data", e.target.value);
            }}
          />
        </div>
      </div>
    </Carta>
  );
};

export default FormAssociaGiornata;
