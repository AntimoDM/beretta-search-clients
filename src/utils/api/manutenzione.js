import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams } from "../utility";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Accept-Language"] = "it";

const apiManutenzione = {
  ricerca_manutenzioni: async function (params) {
    try {
      const res = await axios.get(
        BASE_URL + "/manutenzione" + creaQueryParams(params)
      );
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_manutenzione: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/manutenzione", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  dettaglio_manutenzione: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/manutenzione/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_manutenzione: async function (id, vals) {
    try {
      const res = await axios.patch(BASE_URL + "/manutenzione/" + id, vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_manutenzione: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/manutenzione/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
};
export default apiManutenzione;
