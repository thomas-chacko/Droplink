import axiosInstance from "@/axios/config"
import { API_ENDPOINTS } from "@/urls"
import { User } from '@/types/user';

export interface UpdateUserData {
  name?: string;
  bio?: string;
  location?: string;
  avatar?: string;
  coverImage?: string;
  socialLinks?: { [key: string]: string };
}

export const userServices = {
    getUserById: async (id: string) => {
        const response = await axiosInstance.get<{
            success: boolean;
            message: string;
            data: User;
        }>(API_ENDPOINTS.USER.BY_ID(id));
        return response.data;
    },

    updateUser: async (id: string, data: UpdateUserData) => {
        const response = await axiosInstance.put<{
            success: boolean;
            message: string;
            data: User;
        }>(API_ENDPOINTS.USER.BY_ID(id), data);
        return response.data;
    },
}