import axios from "axios";
export const makeRequest = axios.create({
  baseURL: "https://ahao-social-app.pages.dev/api/",
  withCredentials: true,
});
