// axios => used for call of https requests..
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api" || "http://localhost:5002/api",
    withCredentials: true,
});











