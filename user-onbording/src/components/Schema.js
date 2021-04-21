import * as yup from 'yup'

export default yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(1, 'Name must be at least 1 character'),
    email: yup
        .string()
        .email('must be a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(3, 'Password must contain at least 5 characters'),
    terms: yup
        .boolean()
        .oneOf([true], 'Please accept terms to submit')
})