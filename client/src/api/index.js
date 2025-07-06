import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
        "Content-Type": "application/json",
    }
});

// axiosInstance.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     }, // below line is not mandatory
//     function (error) {
//         return Promise.reject(error);
//     }
// )