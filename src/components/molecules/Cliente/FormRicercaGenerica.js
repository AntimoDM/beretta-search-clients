import Carta from "../../atoms/Carta/Carta";

const FormRicercaGenerica = ({ className, onChange, ctaRicerca, vals }) => {
  return (
    <Carta className={`p-24 ${className}`}>
      <h3>Ricerca Generica</h3>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Nome</label>
          <input
            value={vals.nome || ""}
            onChange={(e) => {
              onChange("nome", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_nome"
          />
        </div>

        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Cognome</label>
          <input
            value={vals.cognome || ""}
            onChange={(e) => {
              onChange("cognome", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_cognome"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Codice Fiscale</label>
          <input
            value={vals.codicefiscale || ""}
            onChange={(e) => {
              onChange("codicefiscale", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_codicefiscale"
          />
        </div>

        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Email</label>
          <input
            value={vals.email || ""}
            onChange={(e) => {
              onChange("email", e.target.value);
            }}
            onKeyDown={(e) => e.key == "Enter" && ctaRicerca()}
            id="cliente_email"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Indirizzo</label>
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
    </Carta>
  );
};

export default FormRicercaGenerica;
