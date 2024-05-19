import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EMPTY } from '@/constants'
import { useTypeBoxForm } from '@/schemas/schema-resolver'
import { SignInFormSchema, SignInFormType } from '@/schemas/sign-in-form.schema'
import React, { useCallback, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface SignInFormProps {
    signIn: (props: SignInFormType) => Promise<void>
}

export const SignInForm = React.memo(({ signIn }: SignInFormProps) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    const form = useTypeBoxForm<typeof SignInFormSchema, SignInFormType>(SignInFormSchema, {
        defaultValues: {
            email: EMPTY,
            password: EMPTY,
        },
    })

    const togglePasswordVisibility = useCallback((): void => {
        setPasswordVisible(!passwordVisible)
    }, [passwordVisible])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(signIn)} className={'grid gap-6'}>
                <FormField
                    control={form.control}
                    name={'email'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder={'anonymous@example.com'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'password'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className={'relative'}>
                                    <Input
                                        {...field}
                                        type={passwordVisible ? 'text' : 'password'}
                                    />
                                    <button
                                        type={'button'}
                                        onClick={togglePasswordVisibility}
                                        className={
                                            'absolute inset-y-0 right-0 pr-3 flex items-center'
                                        }
                                    >
                                        {passwordVisible ? (
                                            <AiOutlineEye size={20} />
                                        ) : (
                                            <AiOutlineEyeInvisible size={20} />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className={'whitespace-pre-line'} />
                        </FormItem>
                    )}
                />
                <div className={'flex justify-end gap-1 flex-col items-end'}>
                    <button
                        type={'button'}
                        className={'text-sm text-muted-foreground hover:text-primary'}
                        onClick={() => {}}
                    >
                        Forgot password?
                    </button>
                    <button
                        type={'button'}
                        className={'text-sm text-muted-foreground hover:text-primary'}
                        onClick={() => {}}
                    >
                        Don't have an account?
                    </button>
                </div>
                <Button type={'submit'} size={'lg'} className={'w-full'}>
                    Sign in
                </Button>
            </form>
        </Form>
    )
})
