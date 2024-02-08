import axios, { AxiosInstance } from 'axios';

const { API_URL } = process.env;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://front-end-task.bmbzr.ir",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
