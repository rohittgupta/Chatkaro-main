// axios => used for call of https requests..

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:5002/api",
    withCredentials: true,
});












