import { ROUTES } from "@/constants/routes";
import axios from "axios";

const api = axios.create({
    baseURL: ROUTES.BASE_URL,
  });

export default api;