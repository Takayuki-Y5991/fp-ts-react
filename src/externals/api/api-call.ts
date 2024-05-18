import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Effect as E } from "effect"

export const apiCall = <T>(config: AxiosRequestConfig): E.Effect<unknown, AxiosError, AxiosResponse<T>> =>
    E.tryPromise<AxiosResponse<T>, AxiosError>({
        try: () => axios.request<T>(config),
        catch: (error) => error as AxiosError
    }).pipe(
        E.tapError((error) => E.log(`API Call Error: ${error.message}`)),
        E.match(
            {
                onSuccess: (value) => E.succeed(value),
                onFailure: (error) => E.fail(error)
            }
        )
    )
