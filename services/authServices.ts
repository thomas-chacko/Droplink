import axiosInstance from "@/axios/config"
import { API_ENDPOINTS } from "@/urls"

export const authServices = {
    login: async () => {
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN)
        return response.data
    }
}