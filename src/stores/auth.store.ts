import { produce } from 'immer'
import { createStore } from 'zustand'

export interface User {
    id: string
    username: string
}

export interface AuthState {
    user: User | null
    set: (user: User) => Promise<void>
    clear: () => Promise<void>
}

export const useAuthStore = createStore<AuthState>()((set) => ({
    user: null,
    set: async (user: User) => {
        set(
            produce((state) => {
                state.user = user
            }),
        )
    },
    clear: async () => {
        set(
            produce((state) => {
                state.user = null
            }),
        )
    },
}))
