import apiClient from "@/utils/axiosConfig";

const getBrands= async () => {
    const response = await apiClient.get(`/brand/`);
    return response.data;
}
const createBrand= async (data) => {
    const response = await apiClient.post(`/brand/create/`,data);
    return response.data;
}

const deleteBrand= async (id) => {
    const response = await apiClient.delete(`/brand/${id}`);
    return response.data;
}

const updateBrand= async (brand) => {
    const response = await apiClient.put(`/brand/${brand.id}` ,
    { title: brand.brandData.title});
    return response.data;
}

export const brandService = {
    getBrands,
    createBrand,
    deleteBrand,
    updateBrand
}