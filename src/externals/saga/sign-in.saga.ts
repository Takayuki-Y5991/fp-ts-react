import {
    ProviderType,
    signWithBasicAuthenticate,
    signWithProviderOauth2,
} from '@/externals/client/google-authenticate'
import { User } from '@/stores/auth.store'
import { Effect as E, pipe } from 'effect'
import { sync } from 'effect/Effect'
import { FirebaseError } from 'firebase/app'
import { UserCredential } from 'firebase/auth'
import { NavigateFunction } from 'react-router-dom'

interface SignWithBasicProp {
    email: string
    password: string
    navigate: NavigateFunction
    userSetter: (user: User) => Promise<void>
}

// const errorToastProps = {
// variant: 'destructive',
// title: 'Authentication error',
// description: 'An authentication error has occurred. Please review the information',
// } as const

// TODO: It is necessary to access the backend after redirect processing and authentication to obtain data.
export const signWithBasic = ({ email, password, navigate, userSetter }: SignWithBasicProp) =>
    E.runPromise(
        pipe(
            signWithBasicAuthenticate({ email, password }),
            E.matchEffect({
                onFailure: (error: FirebaseError) =>
                    sync(() => {
                        console.log(error)
                    }),
                onSuccess: (userCredential: UserCredential) =>
                    sync(async () => {
                        const user: User = {
                            id: userCredential.user.uid,
                            username: userCredential.user.email || '',
                        }
                        userSetter(user)
                        const token = await userCredential.user.getIdToken()
                        sessionStorage.setItem(import.meta.env.VITE_API_AUTH_TOKEN_KEY, token)
                        navigate('/test')
                        return userCredential
                    }),
            }),
        ),
    )

interface SignWithProviderProp {
    providerType: ProviderType
    navigate: NavigateFunction
    userSetter: (user: User) => Promise<void>
}

export const signWithProvider = ({ providerType, navigate, userSetter }: SignWithProviderProp) =>
    E.runPromise(
        pipe(
            signWithProviderOauth2(providerType),
            E.matchEffect({
                onFailure: (error: FirebaseError) =>
                    sync(() => {
                        console.log(error) // TODO: 修正予定
                    }),
                onSuccess: (userCredential: UserCredential) =>
                    sync(async () => {
                        const user: User = {
                            id: userCredential.user.uid,
                            username: userCredential.user.email || '',
                        }
                        userSetter(user)
                        const token = await userCredential.user.getIdToken()
                        sessionStorage.setItem(import.meta.env.VITE_API_AUTH_TOKEN_KEY, token)
                        navigate('/test')
                        return userCredential
                    }),
            }),
        ),
    )
