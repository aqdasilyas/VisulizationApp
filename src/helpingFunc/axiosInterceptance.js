// axiosConfig.ts

import axios from 'axios';
import { API_BASE_URL } from "@env"


// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`,// Set your API base URL here
    timeout: 5000, // Set the request timeout (in milliseconds)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor for request
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add custom request headers or do other pre-request logic here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add an interceptor for response
axiosInstance.interceptors.response.use(
    (response) => {
        // You can perform common response handling here
        return response;
    },
    (error) => {
        // You can handle and log errors here
        return Promise.reject(error);
    }
);

export default axiosInstance;
