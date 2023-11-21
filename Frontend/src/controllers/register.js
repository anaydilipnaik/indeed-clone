import { semiEndpoint } from "../utils/ApiEndpoint";
import axios from "axios";

export function commonRegister(dataJson) {
  return axios.post(semiEndpoint + "/commonRegister", dataJson);
}
