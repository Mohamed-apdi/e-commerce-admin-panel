import axios from 'axios';
import { authService } from '../features/auth/authService';
import { base_url } from './base_url';

const apiClient = axios.create({
    baseURL: base_url,
});

apiClient.interceptors.request.use(async (config) => {
    const getTokenFromLocalstorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const token = getTokenFromLocalstorage ? getTokenFromLocalstorage.token : "";

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await authService.refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                console.error("Error refreshing access token:", err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
