import apiClient from "@/utils/axiosConfig";

const getOrders= async () => {
    const response = await apiClient.get(`user/all-orders`);
    return response.data;
}

const getRecentOrders= async () => {
    const response = await apiClient.get(`user/recent-orders`);
    return response.data;
}

export const OrdersService = {
    getOrders,
    getRecentOrders,
}