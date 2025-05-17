import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams } from "../utility";
axios.defaults.withCredentials = false;

const apiGiornata = {
  ricerca_giornate: async function (params) {
    try {
      const res = await axios.get(
        BASE_URL + "/giornata" + creaQueryParams(params)
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_giornata: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/giornata", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  dettaglio_giornata: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/giornata/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_giornata: async function (id, vals) {
    try {
      const res = await axios.patch(BASE_URL + "/giornata/" + id, vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiungi_intervento_a_giornata: async function (id, interventiIds) {
    try {
      const res = await axios.post(BASE_URL + "/giornata/interventi/" + id, {
        ids: interventiIds,
      });
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
};
export default apiGiornata;
