import apiClient from "@/utils/axiosConfig";

const getEnquiries= async () => {
    const response = await apiClient.get(`/enquiry/`);
    return response.data;
}

const updateEnquiries = async (data) => {
    const response = await apiClient.put(`/enquiry/${data._id}`, {status: data.status});
    return response.data;
}

export const enquirieService = {
    getEnquiries,
    updateEnquiries,
}