import Link from "next/link";
import Bottone from "../../atoms/Bottone/Bottone";

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
            <Bottone color="trasparente">
              <img src="/media/icon/freccia_header_sinistra.svg"></img>
            </Bottone>
          </Link>
        )}
        <h2>{titolo}</h2>
      </div>
      <div className="col-6 p-0 m-0 d-flex justify-content-end align-items-center gap-16">
        {urlAggiungi && (
          <Link href={urlAggiungi}>
            <Bottone>Aggiungi</Bottone>
          </Link>
        )}
        {ctaCompleta && (
          <Bottone onClick={() => ctaCompleta()}>Completa</Bottone>
        )}
        {ctaAggiungiInterventi && (
          <Bottone onClick={() => ctaAggiungiInterventi()}>
            Aggiungi Interventi
          </Bottone>
        )}
        {ctaRimuoviInterventi && (
          <Bottone onClick={() => ctaRimuoviInterventi()}>
            Rimuovi Interventi
          </Bottone>
        )}
        {ctaElimina && (
          <Bottone onClick={() => ctaElimina()} color="rosso">
            Elimina
          </Bottone>
        )}
      </div>
    </div>
  );
};

export default TitoloPagina;
