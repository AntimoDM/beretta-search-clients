import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card";
import SelectTecnici from "../../atoms/SelectTecnici/SelectTecnici";

const FormIntervento = ({
  className,
  onChange,
  vals,
  disabled = false,
  modale = false,
  ctaElimina = null,
  ctaSalva = null,
  ctaAnnulla = null,
  ctaChiudi = null,
}) => {
  return (
    <Card className={`p-24 ${className}`}>
      <div className="row m-0 p-0">
        <div className="col-6 m-0 p-0">
          <h3>Dettaglio Intervento</h3>
        </div>
        {ctaChiudi && (
          <div className="col-6 m-0 p-0 text-end">
            <h3 onClick={() => ctaChiudi()} className="d-inline pointer">
              X
            </h3>
          </div>
        )}
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Tecnico</label>
          <SelectTecnici
            value={vals.tecnico && (vals.tecnico.id || vals.tecnico)}
            onFilter={onChange}
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Data Assegnamento</label>
          <input
            disabled
            type="date"
            className="w-100"
            value={vals.data_assegnamento}
            onChange={(e) => {
              onChange("data_assegnamento", e.target.value);
            }}
            id="data_assegnamento"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Data Chiamata</label>
          <input
            type="date"
            value={vals.data_chiamata}
            onChange={(e) => {
              onChange("data_chiamata", e.target.value);
            }}
            id="data_chiamata"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Data Completamento</label>
          <input
            type="date"
            disabled
            value={vals.data_completamento}
            onChange={(e) => {
              onChange("data_completamento", e.target.value);
            }}
            id="data_completamento"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Indirizzo Intervento</label>
          <input
            type="indirizzo"
            value={vals.indirizzo || ""}
            onChange={(e) => {
              onChange("indirizzo", e.target.value);
            }}
            id="indirizzo"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Motivazione</label>
          <textarea
            value={vals.motivazione || ""}
            onChange={(e) => {
              onChange("motivazione", e.target.value);
            }}
            id="motivazione"
          />
        </div>
      </div>

      <div className="row mt-24">
        <div className="col-6 pl-0 pr-16">
          <label className="font-18 lh-24 bold">Note del tecnico</label>
          <textarea
            value={vals.note_del_tecnico || ""}
            onChange={(e) => {
              onChange("note_del_tecnico", e.target.value);
            }}
            id="note_del_tecnico"
          />
        </div>
        <div className="col-6 pl-16 pr-0">
          <label className="font-18 lh-24 bold">Note per il tecnico</label>
          <textarea
            value={vals.note_per_tecnico || ""}
            onChange={(e) => {
              onChange("note_per_tecnico", e.target.value);
            }}
            id="note_per_tecnico"
          />
        </div>
      </div>

      {modale && (
        <div className="row mt-24">
          <div className="col-6 pl-0 pr-16"></div>
          <div className="col-6 p-0 m-0 d-flex justify-content-end align-items-center gap-16">
            {ctaElimina && (
              <Button color={"rosso"} onClick={() => ctaElimina()}>
                Elimina
              </Button>
            )}
            {ctaAnnulla && (
              <Button color={"grigio"} onClick={() => ctaAnnulla()}>
                Annulla
              </Button>
            )}
            {ctaSalva && <Button onClick={() => ctaSalva()}>Salva</Button>}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FormIntervento;
