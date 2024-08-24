import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/"
    : "https://ahao-social-app.pages.dev/api/";

export const makeRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 确保发送凭证（如 Cookies 或 JWT）
});
