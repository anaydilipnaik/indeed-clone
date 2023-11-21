import { semiEndpoint } from "../utils/ApiEndpoint";
import axios from "axios";

export function commonLogin(dataJson) {
  return axios.post(semiEndpoint + "/commonLogin", dataJson);
}
