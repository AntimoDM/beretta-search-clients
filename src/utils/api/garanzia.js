import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams } from "../utility";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Accept-Language"] = "it";

const apiGaranzia = {
  ricerca_garanzie: async function (params) {
    try {
      const res = await axios.get(
        BASE_URL + "/garanzia" + creaQueryParams(params)
      );
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_garanzia: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/garanzia/", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  dettaglio_garanzia: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/garanzia/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_garanzia: async function (id, vals) {
    try {
      const res = await axios.patch(BASE_URL + "/garanzia/" + id, vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_garanzia: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/garanzia/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
};
export default apiGaranzia;
