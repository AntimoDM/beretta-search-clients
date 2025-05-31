import Carta from "../../atoms/Carta/Carta";
import SelectClienti from "../../atoms/SelectClienti/SelectClienti";

const FormAssociaCliente = ({ className, onChange, vals }) => {
  return (
    <Carta className={`p-24 ${className}`}>
      <h3>Associa Cliente</h3>
      <div className="row mt-24">
        <div className="col-12 pl-0 pr-0">
          <label className="font-18 lh-24 bold">Cliente</label>
          <SelectClienti
            onFilter={onChange}
            value={vals.cliente && (vals.cliente.id || vals.cliente)}
          />
        </div>
      </div>
    </Carta>
  );
};

export default FormAssociaCliente;
