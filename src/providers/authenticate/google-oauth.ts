import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config: FirebaseOptions = {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    authDomain: import.meta.env.VITE_GOOGLE_AUTH_DOMAIN
} as const

const initialize = initializeApp(config)
export const auth = getAuth(initialize)