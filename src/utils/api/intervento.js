import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams } from "../utility";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Accept-Language"] = "it";

const apiIntervento = {
  ricerca_interventi: async function (params) {
    try {
      const res = await axios.get(
        BASE_URL + "/intervento" + creaQueryParams(params)
      );
      let resArray = res.data;
      return resArray;
    } catch (error) {
      try {
        Swal.fire("Errore", await error.response.data.res, "error");
      } catch (err) {
        console.log(err);
      }
    }
  },
  ricerca_interventi_da_associare: async function (tecnico_id, giornata_id) {
    try {
      const res = await axios.get(BASE_URL + "/intervento");
      let temp = res.data;
      let resArray = [];
      temp.forEach((element) => {
        if (interventoAssociabile(element, tecnico_id, giornata_id)) {
          resArray.push(element);
        }
      });
      return resArray;
    } catch (error) {
      try {
        Swal.fire("Errore", await error.response.data.res, "error");
      } catch (err) {
        console.log(err);
      }
    }
  },
  crea_intervento: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/intervento/", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  dettaglio_intervento: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/intervento/" + id);
      return res.data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_intervento: async function (id, vals) {
    try {
      const res = await axios.patch(BASE_URL + "/intervento/" + id, vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_intervento: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/intervento/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
};

function interventoAssociabile(intervento, tecnico, giornata) {
  if (intervento.stato === 3) {
    //se l'intervento è completo
    return false;
  }
  if (
    intervento.stato === 2 &&
    intervento.tecnico &&
    intervento.tecnico.id !== tecnico
  ) {
    // se l'intervento è assegnato ma non al tecnico attuale
    return false;
  }

  if (intervento.giornata && intervento.giornata.id === giornata) {
    //se l'intervento è già associato alla giornata corrente
    return false;
  }
  return true;
}
export default apiIntervento;
