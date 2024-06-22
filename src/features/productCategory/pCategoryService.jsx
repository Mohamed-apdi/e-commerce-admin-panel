import apiClient from "@/utils/axiosConfig";



const getProductCategorys = async () => {
    const response = await apiClient.get(`/productcategory/`);
    return response.data;
}

const createCategory= async (data) => {
    const response = await apiClient.post(`/productcategory/create/`,data);
    return response.data;
}

const deleteCategory= async (id) => {
    const response = await apiClient.delete(`/productcategory/${id}`);
    return response.data;
}

const updateCategory= async (category) => {
    const response = await apiClient.put(`/productcategory/${category.id}` ,
    { title: category.categoryData.title});
    return response.data;
}
export const productCategoryService = {
    getProductCategorys,
    createCategory,
    deleteCategory,
    updateCategory,
}