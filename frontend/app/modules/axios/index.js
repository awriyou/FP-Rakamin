import axios from "axios";
import { configDotenv } from "dotenv";

const baseUrl = process.env.REACT_APP_BASE_URL;
const instance = axios.create({
    baseURL: baseUrl
})

instance.interceptors.request.use(
    (config) => {
        const  token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config
    }
)


export {instance}