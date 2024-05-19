import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProviderType } from '@/externals/client/google-authenticate'
import { signWithBasic, signWithProvider } from '@/externals/saga/sign-in.saga'
import { SignInForm, SocialSignInButtons } from '@/features/sign-in/components'
import { SignInFormType } from '@/schemas/sign-in-form.schema'
import { useAuthStore } from '@/stores/auth.store'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignIn = () => {
    const navigate = useNavigate()
    const userSetter = useAuthStore.getState().set
    const signInBasicAuthenticate = useCallback(
        async ({ email, password }: SignInFormType) => {
            await signWithBasic({ email, password, navigate, userSetter })
        },
        [navigate, userSetter],
    )

    const signInProvider = useCallback(
        async (providerType: ProviderType) => {
            signWithProvider({ providerType, navigate, userSetter })
        },
        [navigate, userSetter],
    )

    return (
        <div className={'container flex h-screen w-screen flex-col items-center justify-center'}>
            <Card className={'w-full sm:w-[400px]'}>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold tracking-tight text-center'}>
                        Sign in Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={'text-sm text-muted-foreground mb-5 text-center'}>
                        Enter your email to sign in, your account
                    </p>
                    <SignInForm signIn={signInBasicAuthenticate} />
                    <div className={'relative flex items-center mt-6'}>
                        <div className={'flex-grow border-t border-gray-400'}></div>
                        <span
                            className={'flex-shrink mx-4 text-xs uppercase text-muted-foreground'}
                        >
                            or continue with
                        </span>
                        <div className={'flex-grow border-t border-gray-400'}></div>
                    </div>
                    {/* // TODO: Since Oauth2 is not possible, you need to fix that. */}
                    <SocialSignInButtons signIn={signInProvider} />
                </CardContent>
            </Card>
        </div>
    )
}
