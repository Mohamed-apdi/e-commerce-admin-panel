import apiClient from "@/utils/axiosConfig";


const uploadImg = async (data) => {
    const response = await apiClient.post(`/upload/image`,data);

    return response.data;
}

const deleteImg = async (id) => {
    const response = await apiClient.delete(`/upload/delete-img/${id}`);

    return response.data;
}

const uploadService = {
    uploadImg,
    deleteImg
}

export default uploadService;