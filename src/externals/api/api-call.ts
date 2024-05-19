import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Effect as E } from 'effect'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem(import.meta.env.VITE_API_AUTH_TOKEN_KEY)
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export const apiCall = <T>(
    config: AxiosRequestConfig,
): E.Effect<unknown, AxiosError, AxiosResponse<T>> =>
    E.tryPromise<AxiosResponse<T>, AxiosError>({
        try: () => apiClient.request<T>(config),
        catch: (error) => error as AxiosError,
    }).pipe(
        E.tapError((error) => E.log(`API Call Error: ${error.message}`)),
        E.match({
            onSuccess: (value) => E.succeed(value),
            onFailure: (error) => E.fail(error),
        }),
    )
