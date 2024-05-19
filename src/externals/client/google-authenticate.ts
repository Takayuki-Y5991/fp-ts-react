import { EXHAUSTIVE_CASE_ERROR } from '@/constants'
import { auth } from '@/providers/authenticate/google-oauth'
import { Effect as E } from 'effect'
import { FirebaseError } from 'firebase/app'
import {
    AuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    UserCredential,
    signInWithEmailAndPassword as signIn,
    signInWithPopup,
} from 'firebase/auth'

interface SignWithEmailAndPasswordProps {
    email: string
    password: string
}

export type ProviderType = 'google' | 'github'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exhaustive = (_: never) => {
    throw new Error(EXHAUSTIVE_CASE_ERROR('Authenticate Provider type'))
}

const getProvider = (providerType: ProviderType): AuthProvider => {
    switch (providerType) {
        case 'google':
            return new GoogleAuthProvider()
        case 'github':
            return new GithubAuthProvider()
        default:
            return exhaustive(providerType)
    }
}

export const signWithProviderOauth2 = (
    providerType: ProviderType,
): E.Effect<UserCredential, FirebaseError, never> =>
    E.tryPromise({
        try: () => signInWithPopup(auth, getProvider(providerType)),
        catch: (error) => error as FirebaseError,
    })

export const signWithBasicAuthenticate = ({
    email,
    password,
}: SignWithEmailAndPasswordProps): E.Effect<UserCredential, FirebaseError, never> =>
    E.tryPromise({
        try: () => signIn(auth, email, password),
        catch: (error) => error as FirebaseError,
    })
