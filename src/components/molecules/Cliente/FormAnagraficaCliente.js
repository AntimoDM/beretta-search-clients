import Carta from "../../atoms/Carta/Carta";

const FormAnagraficaCliente = ({ className, onChange, vals }) => {
  return (
    <Carta className={`p-24 ${className}`}>
      <h3>Anagrafica</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Nome</label>
          <input
            value={vals.nome || ""}
            onChange={(e) => {
              onChange("nome", e.target.value);
            }}
            id="nome"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Cognome</label>
          <input
            value={vals.cognome || ""}
            onChange={(e) => {
              onChange("cognome", e.target.value);
            }}
            id="cognome"
          />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Telefono</label>
          <input
            value={vals.telefono}
            onChange={(e) => {
              onChange("telefono", e.target.value);
            }}
            id="telefono"
          />
        </div>

        <div className="col-6 pr-0 pl-16">
          <label className="font-18 lh-24 bold">Email</label>
          <input
            value={vals.email || ""}
            onChange={(e) => {
              onChange("email", e.target.value);
            }}
            id="email"
          />
        </div>
      </div>
      <h3 className="mt-24">Indirizzo</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Via</label>
          <input
            value={vals.strada || ""}
            onChange={(e) => {
              onChange("strada", e.target.value);
            }}
            id="strada"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Civico</label>
          <input
            value={vals.numero_civico || ""}
            onChange={(e) => {
              onChange("numero_civico", e.target.value);
            }}
            id="numero_civico"
          />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Provincia</label>
          <input
            value={vals.provincia || ""}
            onChange={(e) => {
              onChange("provincia", e.target.value);
            }}
            id="provincia"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Comune</label>
          <input
            value={vals.comune || ""}
            onChange={(e) => {
              onChange("comune", e.target.value);
            }}
            id="comune"
          />
        </div>
      </div>

      <div className="row mt-8">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Codice Fiscale</label>
          <input
            value={vals.codicefiscale || ""}
            onChange={(e) => {
              onChange("codicefiscale", e.target.value);
            }}
            id="codicefiscale"
          />
        </div>
      </div>
    </Carta>
  );
};

export default FormAnagraficaCliente;
