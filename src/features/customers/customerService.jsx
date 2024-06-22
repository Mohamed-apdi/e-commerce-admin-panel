import apiClient from "@/utils/axiosConfig";


const getUsers = async () => {
    const response = await apiClient.get(`/user/all-users`);
   
    return response.data;
}

export const customerService = {
    getUsers,
}