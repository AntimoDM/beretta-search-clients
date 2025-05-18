import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams, gestisciErroreDjango } from "../utility";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Accept-Language"] = "it";

const apiCliente = {
  ricerca_clienti: async function (params) {
    try {
      const res = await axios.get(
        BASE_URL + "/cliente" + creaQueryParams(params)
      );
      let resArray = res.data;
      return resArray;
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
  ricerca_clienti_per_searchbar: async function () {
    try {
      const res = await axios.get(BASE_URL + "/cliente");
      let resArray = res.data.map((el) => {
        return {
          value: el.id,
          label:
            (el.nome || "") +
            (el.cognome ? " " + el.cognome : "") +
            (el.telefono_principale ? " - " + el.telefono_principale : "") +
            (el.strada ? " - " + el.strada : "") +
            (el.numero_civico ? " " + el.numero_civico : "") +
            (el.comune ? " " + el.comune : "") +
            (el.provincia ? " (" + el.provincia + ")" : ""),
        };
      });
      return resArray;
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
  crea_cliente: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/cliente/", vals);
      const data = res.data;
      return data;
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
  dettaglio_cliente: async function (telefono) {
    try {
      const res = await axios.get(BASE_URL + "/cliente/" + telefono);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire(
        "Errore",
        "Cliente non trovato, prova con la ricerca generica",
        "error"
      );
    }
  },
  aggiorna_cliente: async function (telefono, vals) {
    try {
      const res = await axios.patch(BASE_URL + "/cliente/" + telefono, vals);
      const data = res.data;
      return data;
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
  elimina_cliente: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/cliente/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
};
export default apiCliente;
