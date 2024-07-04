import apiClient from "@/utils/axiosConfig";


const login = async (userData) => {
    try {
        const response = await apiClient.post(`/user/admin-login`, userData);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Error logging in";
        throw new Error(message);
    }
};

const logout = async () => {
    const response = await apiClient.get(`/user/logout`);
    if (response.status === 204) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
    return response;
};

const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await apiClient.post(`/user/refresh-token`, { token: refreshToken });
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

const forgetPassword = async (data) => {
    const response = await apiClient.post(`/user/forget-password-token`, data);
    return response.data;
};

const resetPassword = async (data) => {
    const response = await apiClient.put(`/user/reset-password/${data.token}`, { password: data.password });
    return response.data;
};

const updateUser = async ({id, data}) => {
    const response = await apiClient.put(`/user/edit-user/${id}`,data)
    return response.data;
}

const isBlocked = async (data) => {
    const response = await apiClient.put(`/user/block-user/${data.id}`);
    return response;
}

const unBlocked = async (data) => {
    const response = await apiClient.put(`/user/block-user/${data.id}`);
    return response;
}


export const authService = {
    login,
    logout,
    refreshAccessToken,
    forgetPassword,
    resetPassword,
    updateUser,
    isBlocked,
    unBlocked,
};
