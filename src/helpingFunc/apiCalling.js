// api.ts
import axiosInstance from './axiosInterceptance';

// Example GET request
async function getData(endpoint) {
    try {
        const response = await axiosInstance.get(endpoint);
        return response;
    } catch (error) {
        throw error;
    }
}

export { getData };
