import config from "@configs/env";
import axios from "axios";

export default axios.create({
  baseURL: config.base_api_url,
});
