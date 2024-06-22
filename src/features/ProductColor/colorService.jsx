import apiClient from "@/utils/axiosConfig";



const getColors = async () => {
    const response = await apiClient.get(`/color/`);
    return response.data;
}

const createColors= async (data) => {
    const response = await apiClient.post(`/color/create/`,data);
    return response.data;
}

const deleteColors= async (id) => {
    const response = await apiClient.delete(`/color/${id}`);
    return response.data;
}

const updateColors= async (color) => {
    const response = await apiClient.put(`/color/${color.id}` ,
    { title: color.colorData.title});
    return response.data;
}

export const colorService = {
    getColors,
    createColors,
    deleteColors,
    updateColors,

}