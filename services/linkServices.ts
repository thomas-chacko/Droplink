import axiosInstance from "@/axios/config";
import { API_ENDPOINTS } from "@/urls";

interface Link {
    _id: string;
    title: string;
    url: string;
    isActive: boolean;
    icon?: string;
    order?: number;
    description?: string;
}

export const linkServices = {
    getAllLinks: async () => {
        const response = await axiosInstance.get<
            {
                success: boolean;
                message: string;
                data: Link[];
            }>(API_ENDPOINTS.LINKS.ALL);
        return response.data;
    },
    createLink: async (link: Omit<Link, "_id">) => {
        const response = await axiosInstance.post<
            {
                success: boolean;
                message: string;
                data: Link;
            }>(API_ENDPOINTS.LINKS.CREATE, link);
        return response.data;
    }
}