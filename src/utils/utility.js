import React from "react";
import Swal from "sweetalert2";
export const BASE_URL = process.env.BACKEND_URL;

export function creaQueryParams(oggetto) {
  if (!oggetto) return "";
  if (!oggetto instanceof Object) return "";
  if (Object.keys(oggetto).length === 0) return "";
  let queryParams = "";
  Object.keys(oggetto).forEach((chiave, indice) => {
    if (indice === 0) queryParams += "?" + chiave + "=" + oggetto[chiave];
    else queryParams += "&" + chiave + "=" + oggetto[chiave];
  });
  return queryParams;
}

export function gestisciErroreDjango(errore) {
  if (!errore instanceof Object) {
    Swal.fire("Errore", "Errore generico", "error");
  } else if (Object.keys(errore).length === 0) {
    Swal.fire("Errore", "Errore generico", "error");
  } else {
    let oggettoErrori = errore.response.data;
    let messaggioErrore = "<ul> Ci sono stati errori :";
    Object.keys(oggettoErrori).forEach((chiave) => {
      messaggioErrore +=
        "<li>" + chiave + " -> " + oggettoErrori[chiave] + "</li>";
    });
    messaggioErrore += "</ul>";
    Swal.fire("Errore", messaggioErrore, "error");
  }
}

export function visualizzaStatoIntervento(stato) {
  switch (stato) {
    case 1:
      return <span className="tag_stato nuovo">Nuovo</span>;
    case 2:
      return <span className="tag_stato assegnato">Assegnato</span>;
    case 3:
      return <span className="tag_stato pianificato">Pianificato</span>;
    case 4:
      return <span className="tag_stato completo">Completo</span>;
    default:
      return <span className="tag_stato nuovo">{stato}</span>;
  }
}

export function effettuaLogin(user) {
  switch (user.username) {
    case "cristina":
      return user.password === "ufficio";
    case "nunzia":
      return user.password === "ufficio";
    case "mimmo":
      return user.password === "tecnico";
    case "mimmo":
      return user.password === "tecnico";
    default:
      return false;
  }
}

export function formatDate(data) {
  if (data)
    return new Date(data).toLocaleString("it-IT", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  else return "//";
}

export function createRequestVals(vals = {}, keys = []) {
  let requestVals = {};
  for (let attr of keys) {
    requestVals[attr] = vals[attr];
  }
  return requestVals;
}
