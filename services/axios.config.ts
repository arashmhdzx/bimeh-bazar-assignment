import axios, { AxiosInstance } from 'axios';

const { API_URL } = process.env;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
