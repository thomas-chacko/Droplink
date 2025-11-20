import axiosInstance from "@/axios/config"
import { API_ENDPOINTS } from "@/urls"

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
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    saveAuthData: (token: string, user: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
    },

    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },

    getUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    }
}