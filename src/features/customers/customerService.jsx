import apiClient from "@/utils/axiosConfig";

const getUsers = async () => {
    const response = await apiClient.get(`/user/all-users`);
    return response.data;
}

const getUserId = async (id) => {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
}

const deleteUser = async (id) => {
    const response = await apiClient.delete(`/user/${id}`);
    return response;
}

export const customerService = {
    getUsers,
    getUserId,
    deleteUser,
}


// import apiClient from "@/utils/axiosConfig";

// const getUsers = async (filters) => {
//     const response = await apiClient.get(`/user/all-users`, { params: filters });
//     console.log('API Response:', response.data); // Add this line
//     return response.data;
// }

// export const customerService = {
//     getUsers,
// }
