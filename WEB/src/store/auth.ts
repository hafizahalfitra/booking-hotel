// src/store/auth.ts
"use client";

import { create } from "zustand";

interface User {
    name: string;
    email: string;
    picture: string;
    verified: boolean;
}

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
    user:
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "null")
            : null,
    setUser: (user) => {
        set({ user });

        if (typeof window !== "undefined") {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    },
}));
