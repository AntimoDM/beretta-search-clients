import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;
const BACKEND_URL = "https://u6-p6-br1128-b388.c1.stage.odoostack.dev";
const url_api = BACKEND_URL + "/pim_ecommerce";

const api = {
  _: require("lodash"),
  get_cliente: async function (phone_number) {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/customer/cliente/" + phone_number
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  update_cliente: async function (phone_number, vals) {
    try {
      const res = await axios.patch(
        "http://127.0.0.1:8000/customer/cliente/" + phone_number,
        vals
      );
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  search_interventi: async function (listaStati, idsDaEscludere, tecnico) {
    try {
      const res = await axios.get("/api/SearchInterventi");
      const data = res.data;
      let resArray = data;

      if (listaStati) {
        resArray = resArray.filter((el) => listaStati.includes(el.stato));
      }

      if (idsDaEscludere) {
        resArray = resArray.filter((el) => !idsDaEscludere.includes(el.id));
      }
      console.log(resArray);
      if (tecnico) {
        resArray = resArray.filter((el) => el.tecnico === tecnico);
      }

      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  search_garanzie: async function () {
    try {
      const res = await axios.get("/api/SearchGaranzie");
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  search_giornate: async function () {
    try {
      const res = await axios.get("/api/SearchGiornate");
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  get_giornata: async function (id) {
    try {
      const res = await axios.get("/api/getGiornata/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  get_garanzia: async function (id) {
    try {
      const res = await axios.get("/api/getGaranzia/" + id);
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
    }
  },
  aggiungi_intervento_a_giornata: async function (giornata, intervento) {
    try {
      const res = await axios.get("/api/Hello", {
        giornata: giornata,
        intervento: intervento,
      });
      const data = res.data;
      return data;
    } catch (error) {
      Swal.fire("Errore", await error.response.data.description, "error");
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
