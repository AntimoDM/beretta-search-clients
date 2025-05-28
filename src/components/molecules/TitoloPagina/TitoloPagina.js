import Link from "next/link";
import Button from "../../atoms/Button/Button";

const TitoloPagina = ({
  titolo,
  urlAggiungi,
  urlIndietro,
  ctaElimina,
  ctaCompleta,
  ctaAggiungiInterventi,
  ctaRimuoviInterventi,
}) => {
  return (
    <div className="row p-0 align-items-center mb-24">
      <div className="col-6 p-0 m-0 d-flex justify-content-start align-items-center gap-16">
        {urlIndietro && (
          <Link href={urlIndietro}>
            <Button color="trasparente">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </Button>
          </Link>
        )}
        <h2>{titolo}</h2>
      </div>
      <div className="col-6 p-0 m-0 d-flex justify-content-end align-items-center gap-16">
        {urlAggiungi && (
          <Link href={urlAggiungi}>
            <Button>Aggiungi</Button>
          </Link>
        )}
        {ctaCompleta && <Button onClick={() => ctaCompleta()}>Completa</Button>}
        {ctaAggiungiInterventi && (
          <Button onClick={() => ctaAggiungiInterventi()}>
            Aggiungi Interventi
          </Button>
        )}
        {ctaRimuoviInterventi && (
          <Button onClick={() => ctaRimuoviInterventi()}>
            Rimuovi Interventi
          </Button>
        )}
        {ctaElimina && (
          <Button onClick={() => ctaElimina()} color="rosso">
            Elimina
          </Button>
        )}
      </div>
    </div>
  );
};

export default TitoloPagina;
