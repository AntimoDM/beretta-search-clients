import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams, gestisciErroreDjango } from "../utility";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Accept-Language"] = "it";

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
      const res = await axios.post(BASE_URL + "/giornata/", vals);
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
    console.log("arrivo qui", id, interventiIds);
    try {
      const res = await axios.post(
        BASE_URL + "/giornata/interventi/" + id + "/aggiungi",
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
  rimuovi_intervento_da_giornata: async function (id, interventiIds) {
    try {
      const res = await axios.post(
        BASE_URL + "/giornata/interventi/" + id + "/rimuovi",
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
  genera_pdf_giornata: async function (id) {
    try {
      const res = await axios.get(BASE_URL + "/giornata/pdf/" + id, {
        responseType: "blob", // importantissimo per ricevere un file binario
      });

      const blob = res.data;

      // Estrae filename dalla header 'Content-Disposition'
      const contentDisposition = res.headers["content-disposition"];
      let filename = "giornata.pdf";
      const match =
        contentDisposition && contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        filename = match[1];
      }

      // Crea URL temporaneo per il blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
};
export default apiGiornata;
