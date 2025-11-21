import axiosInstance from "@/axios/config"
import { API_ENDPOINTS } from "@/urls"
import { getAuthToken, getAuthUser, clearAuth } from "@/lib/auth"

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
    user?: {
        id: string;
        username: string;
        email: string;
        isPremium: boolean;
    };
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
        clearAuth();
    },

    saveAuthData: (token: string, user: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
    },

    getToken: (): string | null => {
        return getAuthToken();
    },

    getUser: () => {
        return getAuthUser();
    }
}