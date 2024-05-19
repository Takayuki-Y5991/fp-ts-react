export const regexToString = (regex: RegExp): string => {
    const pattern = regex.source
    const escapedPattern = pattern.replace("/\\/g", '\\\\')
    return `^${escapedPattern}$`
}