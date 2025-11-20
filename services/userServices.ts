import axiosInstance from "@/axios/config"
import { API_ENDPOINTS } from "@/urls"

export const userServices ={
    getProfile: async () => {
        const response = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE)
        return response.data
    }
}