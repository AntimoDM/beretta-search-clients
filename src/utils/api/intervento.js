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
export default apiIntervento;
