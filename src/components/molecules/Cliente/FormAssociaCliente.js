import Card from "../../atoms/Card";
import SelectClienti from "../../atoms/SelectClienti/SelectClienti";

const FormAssociaCliente = ({ className, onChange, vals }) => {
  return (
    <Card className={`p-24 ${className}`}>
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
    </Card>
  );
};

export default FormAssociaCliente;
