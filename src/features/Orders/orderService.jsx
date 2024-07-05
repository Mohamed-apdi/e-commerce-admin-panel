import apiClient from "@/utils/axiosConfig";

const getOrders= async () => {
    const response = await apiClient.get(`user/orders`);
    return response.data;
}

const getOrderById = async (id) => {
    const response = await apiClient.get(`user/my-orders/${id}`);
    return response.data;
}

const getRecentOrders= async () => {
    const response = await apiClient.get(`user/recent-orders`);
    return response.data;
}

const updateOrder = async ({id, data}) => {
    const response = await apiClient.put(`user/update-order/${id}`, data);
    return response.data;
}
const getOrderStatusEnum = async () => {
    const response = await apiClient.get('user/order-status-enum');
    return response.data;
  };
  

export const OrdersService = {
    getOrders,
    getRecentOrders,
    updateOrder,
    getOrderById,
    getOrderStatusEnum
}