import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, creaQueryParams } from "../utility";
axios.defaults.withCredentials = false;

const apiTecnico = {
  ricerca_tecnici: async function (params) {
    try {
      const res = await axios.get(
        BASE_URL + "/tecnico" + creaQueryParams(params)
      );
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      try {
        Swal.fire("Errore", await error.response.data.res, "error");
      } catch (err) {
        console.log(err);
      }
    }
  },
};
export default apiTecnico;
