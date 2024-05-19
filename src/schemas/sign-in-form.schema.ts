import { PASSWORD_REGEX } from "@/constants"
import { EMAIL_INVALID_MESSAGE, PASSWORD_LENGTH_INVALID, PASSWORD_REGEX_INVALID, REQUIRED_MESSAGE } from "@/constants/string-validate.message"
import { regexToString } from "@/lib/converter"
import { Static as S, Type as T } from "@sinclair/typebox"

export const SignInFormSchema = T.Object({
    email: T.String({
        format: "email",
        errorMessage: {
            require: REQUIRED_MESSAGE("email"),
            format: EMAIL_INVALID_MESSAGE
        }
    }),
    password: T.String({
        pattern: regexToString(PASSWORD_REGEX),
        minLength: 8,
        errorMessage: {
            require: REQUIRED_MESSAGE("password"),
            pattern: PASSWORD_REGEX_INVALID,
            minLength: PASSWORD_LENGTH_INVALID(8)
        }
    })
})
export type SignInFormType = S<typeof SignInFormSchema>