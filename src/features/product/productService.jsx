import apiClient from "@/utils/axiosConfig";

const getProducts = async () => {
    const response = await apiClient.get(`/product/`);
    return response.data;
}

const getProductById = async (id) => {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
}

const createProduct = async (product) => {
    const response = await apiClient.post(`/product/`, product);
    return response.data;
}

const deleteProduct = async (id) => {
    const response = await apiClient.delete(`/product/delete/${id}`);
    return response.data;
}

const updateProduct = async ({id, data}) => {
    const response = await apiClient.put(`product/${id}`, data);
    return response.data;
}


export const productService = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById
}