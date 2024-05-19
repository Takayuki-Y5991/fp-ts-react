import { Button } from '@/components/ui/button'
import { ProviderType } from '@/externals/client/google-authenticate'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { VscGithub } from 'react-icons/vsc'

interface SocialSignInButtonsProps {
    signIn: (providerType: ProviderType) => Promise<void>
}

export const SocialSignInButtons = React.memo(({ signIn }: SocialSignInButtonsProps) => {
    return (
        <div className={'mt-6'}>
            <Button
                type={'button'}
                size={'lg'}
                variant={'outline'}
                className={'w-full justify-center'}
                onClick={() => signIn('google')}
            >
                <FcGoogle size={20} className={'mr-2'} />
                Google
            </Button>
            <Button
                type={'button'}
                size={'lg'}
                variant={'outline'}
                className={'w-full justify-center mt-2'}
                onClick={() => signIn('github')}
            >
                <VscGithub size={20} className={'mr-2'} />
                Github
            </Button>
        </div>
    )
})
