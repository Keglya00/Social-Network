export const required = (value: string) => {
    return value ? undefined : 'This field is required' 
}