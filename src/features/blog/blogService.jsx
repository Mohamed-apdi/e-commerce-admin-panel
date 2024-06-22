import apiClient from "@/utils/axiosConfig";


const getBlogs = async () => {
    const response = await apiClient.get(`/blog/all-blog`);

    return response.data;
}
export const blogService  = {
    getBlogs,
}