import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;
const BASE_URL = "http://127.0.0.1:8000";

const api = {
  _: require("lodash"),

  // CLIENTE CRUD

  ricerca_clienti: async function () {
    try {
      const res = await axios.get(BASE_URL + "/customer/cliente");
      let resArray = res.data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  ricerca_clienti_per_searchbar: async function () {
    try {
      const res = await axios.get(BASE_URL + "/customer/cliente");
      let resArray = res.data.map((el) => {
        return { value: el.id, label: el.nome + " " + el.cognome };
      });
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_cliente: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/customer/cliente", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  get_cliente: async function (phone_number) {
    try {
      const res = await axios.get(
        BASE_URL + "/customer/cliente/" + phone_number
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  update_cliente: async function (phone_number, vals) {
    try {
      const res = await axios.patch(
        BASE_URL + "/customer/cliente/" + phone_number,
        vals
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_cliente: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/customer/cliente/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },

  // INTERVENTO CRUD

  ricerca_interventi: async function (stato, tecnico) {
    try {
      const res = await axios.get(
        BASE_URL + "/customer/intervento?stato=" + stato + "&tecnico=" + tecnico
      );
      let resArray = res.data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_intervento: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/customer/intervento", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  dettaglio_intervento: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/customer/intervento/" + id);
      return res.data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_intervento: async function (id, vals) {
    try {
      const res = await axios.patch(
        BASE_URL + "/customer/intervento/" + id,
        vals
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_intervento: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/customer/intervento/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },

  search_garanzie: async function () {
    try {
      const res = await axios.get(BASE_URL + "/customer/garanzia");
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_garanzia: async function (id, vals) {
    try {
      const res = await axios.patch(
        BASE_URL + "/customer/garanzia/" + id,
        vals
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_garanzia: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/customer/garanzia", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_garanzia: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/customer/garanzia/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  search_giornate: async function () {
    try {
      const res = await axios.get(BASE_URL + "/customer/giornata");
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  search_manutenzioni: async function () {
    try {
      const res = await axios.get(BASE_URL + "/customer/manutenzione");
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  get_manutenzione: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/customer/manutenzione/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_manutenzione: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/customer/manutenzione", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_manutenzione: async function (id, vals) {
    try {
      const res = await axios.patch(
        BASE_URL + "/customer/manutenzione/" + id,
        vals
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  elimina_manutenzione: async function (id) {
    try {
      const res = await axios.delete(BASE_URL + "/customer/manutenzione/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  get_giornata: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/customer/giornata/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiorna_giornata: async function (id, vals) {
    try {
      const res = await axios.patch(
        BASE_URL + "/customer/giornata/" + id,
        vals
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  crea_giornata: async function (vals) {
    try {
      const res = await axios.post(BASE_URL + "/customer/giornata", vals);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  get_garanzia: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/customer/garanzia/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
  aggiungi_intervento_a_giornata: async function (id, interventiIds) {
    try {
      const res = await axios.post(
        BASE_URL + "/customer/giornata/interventi/" + id,
        {
          ids: interventiIds,
        }
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.res, "error");
    }
  },
};
export default api;

/* 

let query_params = "";
  for (let attr in filters) {
    query_params = query_params +=
      (query_params == "" ? "?" : "&") + attr + "=" + filters[attr];
} 

*/
