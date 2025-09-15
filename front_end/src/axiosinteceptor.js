
//inteceptor alla, interceptor aanu
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "/api", 

});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.token = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default axiosInstance;
