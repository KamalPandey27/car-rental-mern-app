import axios from "axios";

const locationApi = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",
  headers: {
    "X-CSCAPI-KEY": import.meta.env.VITE_CSC_API_KEY,
  },
});

export default locationApi;
