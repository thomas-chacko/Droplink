import axiosInstance from "@/axios/config"
import { API_ENDPOINTS } from "@/urls"
import { useAuthStore, User } from "@/store/useAuthStore"

interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupCredentials {
    username: string;
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
}

export const authServices = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, credentials);
        return response.data;
    },

    logout: () => {
        useAuthStore.getState().clearAuth();
    },

    saveAuthData: (token: string, user: User) => {
        useAuthStore.getState().setAuth(token, user);
    },

    getToken: (): string | null => {
        return useAuthStore.getState().token;
    },

    getUser: (): User | null => {
        return useAuthStore.getState().user;
    },

    isAuthenticated: (): boolean => {
        return useAuthStore.getState().isAuthenticated;
    }
}