export const required = (value: any) => {
    return value ? undefined : 'This field is required' 
}