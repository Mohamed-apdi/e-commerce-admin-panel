import apiClient from "@/utils/axiosConfig";


const getBlogCategorys = async () => {
    const response = await apiClient.get(`/blogcategory/`,);
    return response.data;
}

const createCategory = async (data) => {
    const response = await apiClient.post(`/blogcategory/create/`,data);
    return response.data;
}

const deleteCategory= async (id) => {
    const response = await apiClient.delete(`/blogcategory/${id}`);
    return response.data;
}

const updateCategory = async (data) => {
    const response = await apiClient.put(`/blogcategory/${data.id}`,{title: data.categoryData.title});

    return response.data;
}

export const blogCategoryService = {
    getBlogCategorys,
    createCategory,
    deleteCategory,
    updateCategory,
}