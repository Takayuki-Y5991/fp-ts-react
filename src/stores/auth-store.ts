import { produce } from 'immer'
import { createStore } from 'zustand'

export interface User {
    id: string
    username: string
}

export interface AuthState {
    user: User | null
    signIn: (user: User) => Promise<void>
    signOut: () => Promise<void>
}

export const useAuthStore = createStore<AuthState>()((set) => ({
    user: null,
    signIn: async (user: User) => {
        set(
            produce((state) => {
                state.user = user
            }),
        )
    },
    signOut: async () => {
        set(
            produce((state) => {
                state.user = null
            }),
        )
    },
}))
