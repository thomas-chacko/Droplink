"use client";

import { create } from "zustand";

type User = {
    username: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    isPremium: boolean;
};

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
};

export const useUsersStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
}));
