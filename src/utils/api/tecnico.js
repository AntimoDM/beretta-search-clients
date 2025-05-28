import axios from "axios";
import { BASE_URL, creaQueryParams, gestisciErroreDjango } from "../utility";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Accept-Language"] = "it";

const apiTecnico = {
  ricerca_tecnici: async function (params = {}) {
    try {
      const res = await axios.get(
        BASE_URL + "/tecnico" + creaQueryParams(params)
      );
      const data = res.data;
      let resArray = data;
      return resArray;
    } catch (error) {
      gestisciErroreDjango(error);
    }
  },
};
export default apiTecnico;
