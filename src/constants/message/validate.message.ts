export const EMAIL_INVALID_MESSAGE = 'invalid email.'
export const REQUIRED_MESSAGE = (field: string) => `${field} is required.`
export const PASSWORD_LENGTH_INVALID = (count: number) =>
    `Password must be at least ${count} characters`
export const PASSWORD_REGEX_INVALID =
    'Password contains invalid characters \n ・Contains lowercase and uppercase letters of the alphabet \n ・Contains numbers \n ・Contains special characters'
