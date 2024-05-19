import { TSchema } from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { FieldValues, ResolverResult, UseFormProps, useForm } from 'react-hook-form'

const ajv = new Ajv({ allErrors: true, useDefaults: true })
addFormats(ajv)
ajv.addKeyword('errorMessage')

const createValidator = <S extends TSchema>(schema: S) => {
    const validate = ajv.compile(schema)

    return (data: unknown) => {
        const valid = validate(data)

        if (!valid) {
            const errors = validate.errors?.reduce(
                (acc, error) => {
                    const field = error.instancePath.slice(1)
                    const keyword = error.keyword
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const errorMessage = (schema.properties?.[field] as any)?.errorMessage?.[
                        keyword
                    ]

                    acc[field] = {
                        type: keyword,
                        message: errorMessage || error.message,
                    }

                    return acc
                },
                {} as Record<string, { type: string; message: string }>,
            )

            return {
                values: {},
                errors,
            }
        }

        return {
            values: data,
            errors: {},
        }
    }
}

export const typeboxResolver = <T extends TSchema>(schema: T) => {
    const validateSchema = createValidator(schema)

    return async <TFieldValues extends FieldValues>(
        values: TFieldValues,
    ): Promise<ResolverResult<TFieldValues>> => {
        const { values: validatedValues, errors } = validateSchema(values)

        return {
            values: validatedValues as TFieldValues,
            errors: errors ? (errors as Record<string, { type: string; message: string }>) : {},
        }
    }
}

export const useTypeBoxForm = <S extends TSchema, TFieldValues extends FieldValues = FieldValues>(
    schema: S,
    formOptions: UseFormProps<TFieldValues> = {} as UseFormProps<TFieldValues>,
) => {
    const resolver = typeboxResolver(schema)

    return useForm<TFieldValues>({
        ...formOptions,
        resolver,
    })
}
