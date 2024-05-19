import {
    EMAIL_INVALID_MESSAGE,
    PASSWORD_LENGTH_INVALID,
    PASSWORD_REGEX_INVALID,
    PASSWORD_REGEX_STRING,
    REQUIRED_MESSAGE,
} from '@/constants'
import { Static as S, Type as T } from '@sinclair/typebox'

export const SignInFormSchema = T.Object({
    email: T.String({
        format: 'email',
        errorMessage: {
            format: EMAIL_INVALID_MESSAGE,
        },
    }),
    password: T.String({
        pattern: PASSWORD_REGEX_STRING,
        minLength: 8,
        errorMessage: {
            require: REQUIRED_MESSAGE('password'),
            pattern: PASSWORD_REGEX_INVALID,
            minLength: PASSWORD_LENGTH_INVALID(8),
        },
    }),
})
export type SignInFormType = S<typeof SignInFormSchema>
